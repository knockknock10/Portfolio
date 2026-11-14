"use client"

import { useEffect, useRef } from "react"

/**
 * One continuous 3D world behind the page.
 *  - The camera flies forward as you scroll, and keeps drifting when you stop: the tunnel never ends, because
 *    shapes that pass the camera are moved to the far end.
 *  - An astronaut floats ahead of the camera, follows the pointer, tilts with scroll speed and spins on click.
 *  - Scroll speed stretches the field of view; the pointer shifts the camera for parallax.
 * Light fog fades distant shapes into the page colour, so depth reads without a dark background.
 * Three.js loads when the browser is idle. No WebGL means no 3D layer; the page still works.
 */
const PAPER = 0xf6f7fc
const BLUE = 0x4a86ff
const CORAL = 0xff8c72

export function Cosmos3D() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    let disposed = false
    let cleanup = () => {}

    const start = async () => {
      const THREE = await import("three")
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js")
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js")
      if (disposed) return

      let renderer: import("three").WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" })
      } catch {
        return
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const lite = new URLSearchParams(window.location.search).has("lite")
      const small = window.innerWidth < 760 || lite
      renderer.setPixelRatio(lite ? 1 : Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      el.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      scene.fog = new THREE.Fog(PAPER, 16, 84)
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      const sun = new THREE.DirectionalLight(0xffffff, 1.7)
      sun.position.set(5, 9, 8)
      scene.add(sun)

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 140)

      const gloss = (color: number, rough = 0.26, extra: Record<string, number> = {}) =>
        new THREE.MeshPhysicalMaterial({ color, roughness: rough, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.2, ...extra })
      const blue = gloss(BLUE)
      const coral = gloss(CORAL)
      const pearl = gloss(0xf2f4fa, 0.2)
      const visorMat = new THREE.MeshPhysicalMaterial({ color: 0x1d3a9e, roughness: 0.06, metalness: 0.85, clearcoat: 1, envMapIntensity: 1.6 })
      const mats = [blue, coral, pearl]

      const geos = [
        new THREE.SphereGeometry(1, 40, 28),
        new RoundedBoxGeometry(1.5, 1.5, 1.5, 6, 0.4),
        new THREE.TorusGeometry(0.85, 0.36, 28, 56),
        new THREE.CapsuleGeometry(0.55, 1, 8, 20),
        new THREE.IcosahedronGeometry(1, 2),
        new THREE.TorusKnotGeometry(0.7, 0.26, 90, 14),
      ]

      // ---------- astronaut, built from simple glossy parts ----------
      const astro = new THREE.Group()
      const part = (g: import("three").BufferGeometry, m: import("three").Material, x: number, y: number, z: number) => {
        const mesh = new THREE.Mesh(g, m)
        mesh.position.set(x, y, z)
        astro.add(mesh)
        return mesh
      }
      const own: import("three").BufferGeometry[] = []
      const mk = <T extends import("three").BufferGeometry>(g: T) => { own.push(g); return g }
      part(mk(new THREE.SphereGeometry(0.64, 40, 28)), pearl, 0, 1.28, 0).scale.set(1, 1.04, 1)
      part(mk(new THREE.SphereGeometry(0.47, 36, 24)), visorMat, 0, 1.26, 0.42).scale.set(1.05, 0.92, 0.72)
      part(mk(new THREE.TorusGeometry(0.5, 0.07, 16, 40)), blue, 0, 0.82, 0).rotation.x = Math.PI / 2
      part(mk(new RoundedBoxGeometry(1.05, 1.15, 0.72, 5, 0.26)), pearl, 0, 0.3, 0)
      part(mk(new RoundedBoxGeometry(0.86, 1.0, 0.42, 5, 0.16)), pearl, 0, 0.36, -0.55)
      part(mk(new RoundedBoxGeometry(0.42, 0.26, 0.06, 3, 0.05)), coral, 0, 0.5, 0.38)
      const armL = new THREE.Group(), armR = new THREE.Group()
      for (const [g, s] of [[armL, -1], [armR, 1]] as const) {
        g.position.set(0.72 * s, 0.68, 0)
        const upper = new THREE.Mesh(mk(new THREE.CapsuleGeometry(0.19, 0.55, 6, 16)), pearl)
        upper.position.y = -0.34
        const cuff = new THREE.Mesh(mk(new THREE.TorusGeometry(0.18, 0.05, 12, 24)), coral)
        cuff.position.y = -0.72
        cuff.rotation.x = Math.PI / 2
        g.add(upper, cuff)
        g.rotation.z = 0.5 * s
        astro.add(g)
      }
      const legL = new THREE.Group(), legR = new THREE.Group()
      for (const [g, s] of [[legL, -1], [legR, 1]] as const) {
        g.position.set(0.3 * s, -0.22, 0)
        const leg = new THREE.Mesh(mk(new THREE.CapsuleGeometry(0.23, 0.55, 6, 16)), pearl)
        leg.position.y = -0.4
        const boot = new THREE.Mesh(mk(new RoundedBoxGeometry(0.46, 0.3, 0.62, 4, 0.12)), blue)
        boot.position.set(0, -0.88, 0.08)
        g.add(leg, boot)
        astro.add(g)
      }
      scene.add(astro)

      // ---------- the endless field ----------
      type Drift = { mesh: import("three").Mesh; spin: [number, number, number] }
      const drifts: Drift[] = []
      const count = lite ? 22 : small ? 36 : 64
      const rand = (a: number, b: number) => a + Math.random() * (b - a)
      const place = (d: Drift, camZ: number, initial: boolean) => {
        const theta = rand(0, Math.PI * 2)
        const rho = rand(3.2, 15)
        d.mesh.position.set(Math.cos(theta) * rho * 1.35, Math.sin(theta) * rho * 0.8, initial ? camZ - rand(6, 104) : camZ - rand(96, 112))
      }
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geos[i % geos.length], mats[Math.floor(rand(0, 3))])
        mesh.scale.setScalar(rand(0.55, 1.5))
        mesh.rotation.set(rand(0, 6), rand(0, 6), rand(0, 6))
        scene.add(mesh)
        const d: Drift = { mesh, spin: [rand(-0.01, 0.01), rand(-0.01, 0.01), rand(-0.006, 0.006)] }
        place(d, 0, true)
        drifts.push(d)
      }

      // ---------- input ----------
      const ptr = { x: 0, y: 0, sx: 0, sy: 0 }
      const onMove = (e: PointerEvent) => { ptr.x = (e.clientX / window.innerWidth - 0.5) * 2; ptr.y = -(e.clientY / window.innerHeight - 0.5) * 2 }
      let spinKick = 0
      const onDown = () => { spinKick = 0.5 }
      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerdown", onDown)

      const measure = () => {
        const W = el.clientWidth || window.innerWidth
        const H = el.clientHeight || window.innerHeight
        renderer.setSize(W, H, false)
        camera.aspect = W / H
        camera.updateProjectionMatrix()
      }
      measure()
      window.addEventListener("resize", measure)

      // ---------- frame loop ----------
      let t = 0, scrollSm = window.scrollY, lastCamZ = 0, speed = 0, fov = 32, spin = 0
      let raf = 0, running = true
      let last = performance.now(), slow = 0, stage = 0
      const frame = (still = false) => {
        const now = performance.now()
        const dt = Math.min(now - last, 100)
        last = now
        if (!still) {
          slow = dt > 42 ? slow + 1 : Math.max(0, slow - 1)
          if (slow > 40 && stage < 2) {
            slow = 0; stage++
            if (stage === 1) { renderer.setPixelRatio(1); measure() }
            else for (let i = drifts.length - 1; i >= drifts.length / 2; i--) { scene.remove(drifts[i].mesh); drifts.pop() }
          }
        }
        t += still ? 0 : dt / 1000
        scrollSm += (window.scrollY - scrollSm) * 0.08
        const camZ = -(scrollSm * 0.022 + t * 1.4)
        const dz = lastCamZ - camZ
        lastCamZ = camZ
        speed += (dz - speed) * 0.1

        ptr.sx += (ptr.x - ptr.sx) * 0.05
        ptr.sy += (ptr.y - ptr.sy) * 0.05

        fov += (32 + Math.min(16, speed * 22) - fov) * 0.1
        camera.fov = fov
        camera.updateProjectionMatrix()
        camera.position.set(ptr.sx * 1.4, ptr.sy * 0.9, camZ)
        camera.lookAt(ptr.sx * 0.4, ptr.sy * 0.25, camZ - 20)

        for (const d of drifts) {
          d.mesh.rotation.x += d.spin[0]
          d.mesh.rotation.y += d.spin[1]
          d.mesh.rotation.z += d.spin[2]
          if (d.mesh.position.z > camZ + 4) place(d, camZ, false)
        }

        // the astronaut keeps ahead of the camera and wanders with the pointer
        spinKick *= 0.94
        spin += spinKick
        astro.position.set(2.6 + ptr.sx * 1.8 + Math.sin(t * 0.7) * 0.4, -0.3 + ptr.sy * 1.2 + Math.sin(t * 1.1) * 0.35, camZ - 11)
        astro.rotation.y = -0.5 + ptr.sx * 0.5 + spin
        astro.rotation.x = 0.18 + Math.sin(t * 0.8) * 0.1 - Math.min(0.5, speed * 0.8)
        astro.rotation.z = Math.sin(t * 0.6) * 0.15 - ptr.sx * 0.12
        const sw = Math.sin(t * 1.6)
        armL.rotation.z = -0.55 - sw * 0.25; armR.rotation.z = 0.55 + sw * 0.25
        legL.rotation.x = sw * 0.3; legR.rotation.x = -sw * 0.3
        astro.scale.setScalar(1.15)

        renderer.render(scene, camera)
      }
      const loop = () => { if (!running) return; frame(); raf = requestAnimationFrame(loop) }
      const onVis = () => { running = !document.hidden; if (running) { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(loop) } }
      document.addEventListener("visibilitychange", onVis)
      if (reduce) frame(true); else raf = requestAnimationFrame(loop)
      el.dataset.ready = "1"

      cleanup = () => {
        running = false
        cancelAnimationFrame(raf)
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerdown", onDown)
        window.removeEventListener("resize", measure)
        document.removeEventListener("visibilitychange", onVis)
        geos.forEach((g) => g.dispose())
        own.forEach((g) => g.dispose())
        mats.forEach((m) => m.dispose())
        visorMat.dispose()
        pmrem.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (h: number) => void }
    const handle = w.requestIdleCallback ? w.requestIdleCallback(() => { void start() }, { timeout: 1200 }) : window.setTimeout(() => { void start() }, 400)
    return () => {
      disposed = true
      if (w.requestIdleCallback) w.cancelIdleCallback?.(handle)
      else window.clearTimeout(handle)
      cleanup()
    }
  }, [])

  return <div ref={host} className="sc-host" aria-hidden="true" />
}
