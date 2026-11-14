"use client"

import { useEffect, useRef } from "react"

/**
 * A real-time 3D scene behind the glass.
 * Glossy objects in two colours (blue, coral) plus pearl white. They fall, bounce off the edges of the screen
 * and off each other, get shoved by the cursor, burst apart on a click and hop when you scroll.
 * Three.js is loaded after the page is idle so it never delays first paint. Plain 2D physics in a 3D render.
 */
type Body = { x: number; y: number; vx: number; vy: number; r: number; spin: [number, number, number]; mesh: import("three").Mesh }

export function Scene3D() {
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
        return // no WebGL: the page simply has no 3D layer
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
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      const key = new THREE.DirectionalLight(0xffffff, 1.6)
      key.position.set(4, 8, 10)
      scene.add(key)

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
      camera.position.z = 26

      const mat = (color: number, rough: number) =>
        new THREE.MeshPhysicalMaterial({ color, roughness: rough, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.15 })
      const mats = [mat(0x4a86ff, 0.28), mat(0xff8c72, 0.28), mat(0xf4f6fb, 0.22)]
      const geos = [
        new THREE.SphereGeometry(1, 48, 32),
        new RoundedBoxGeometry(1.5, 1.5, 1.5, 6, 0.38),
        new THREE.TorusGeometry(0.8, 0.38, 32, 64),
        new THREE.CapsuleGeometry(0.55, 0.9, 8, 24),
      ]

      let W = 1, H = 1, halfW = 1, halfH = 1, unit = 1
      const bodies: Body[] = []
      const count = lite ? 7 : small ? 11 : 20
      const rand = (a: number, b: number) => a + Math.random() * (b - a)

      const measure = () => {
        W = el.clientWidth || window.innerWidth
        H = el.clientHeight || window.innerHeight
        renderer.setSize(W, H, false)
        camera.aspect = W / H
        camera.updateProjectionMatrix()
        halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
        halfW = halfH * camera.aspect
        unit = halfH / 10 // 1 unit = a tenth of the half-height, so objects scale with the screen
      }
      measure()

      for (let i = 0; i < count; i++) {
        const g = geos[i % geos.length]
        const m = mats[i % mats.length]
        const mesh = new THREE.Mesh(g, m)
        const size = rand(0.9, 1.7) * (small ? 0.8 : 1)
        mesh.scale.setScalar(size * unit * 1.6)
        mesh.rotation.set(rand(0, 6), rand(0, 6), rand(0, 6))
        scene.add(mesh)
        bodies.push({
          x: rand(-halfW * 0.9, halfW * 0.9), y: rand(halfH * 0.2, halfH * 1.6),
          vx: rand(-0.04, 0.04), vy: 0, r: size * unit * 1.45,
          spin: [rand(-0.012, 0.012), rand(-0.012, 0.012), rand(-0.012, 0.012)], mesh,
        })
      }

      // --- pointer, click, scroll ---
      const ptr = { x: 9999, y: 9999, on: false }
      const toWorld = (cx: number, cy: number) => ({ x: (cx / window.innerWidth - 0.5) * 2 * halfW, y: -(cy / window.innerHeight - 0.5) * 2 * halfH })
      const onMove = (e: PointerEvent) => { const p = toWorld(e.clientX, e.clientY); ptr.x = p.x; ptr.y = p.y; ptr.on = e.pointerType === "mouse" }
      const onLeave = () => { ptr.on = false }
      const burst = (e: PointerEvent) => {
        const p = toWorld(e.clientX, e.clientY)
        for (const b of bodies) {
          const dx = b.x - p.x, dy = b.y - p.y
          const d = Math.hypot(dx, dy) + 0.001
          const f = Math.max(0, 1 - d / (halfH * 0.9)) * 0.5
          b.vx += (dx / d) * f
          b.vy += (dy / d) * f + f * 0.4
        }
      }
      let lastScroll = window.scrollY
      const onResize = () => measure()
      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerdown", burst)
      document.documentElement.addEventListener("pointerleave", onLeave)
      window.addEventListener("resize", onResize)

      const G = 0.0065 * halfH // gravity per step
      const step = () => {
        // scroll hop: objects ride the page a little
        const sy = window.scrollY
        const ds = sy - lastScroll
        lastScroll = sy
        const hop = Math.max(-1, Math.min(1, ds / 90)) * 0.05 * halfH * 0.1
        for (const b of bodies) {
          b.vy -= G
          b.vy += hop * 4
          if (ptr.on) {
            const dx = b.x - ptr.x, dy = b.y - ptr.y
            const d = Math.hypot(dx, dy) + 0.001
            const reach = b.r + halfH * 0.16
            if (d < reach) {
              const f = (1 - d / reach) * 0.075 * halfH * 0.1 * 10
              b.vx += (dx / d) * f
              b.vy += (dy / d) * f
            }
          }
          b.vx *= 0.995
          b.vy *= 0.995
          b.x += b.vx
          b.y += b.vy
          // walls and floor
          if (b.x < -halfW + b.r) { b.x = -halfW + b.r; b.vx = Math.abs(b.vx) * 0.78 }
          if (b.x > halfW - b.r) { b.x = halfW - b.r; b.vx = -Math.abs(b.vx) * 0.78 }
          if (b.y < -halfH + b.r) { b.y = -halfH + b.r; b.vy = Math.abs(b.vy) * 0.62; b.vx *= 0.985 }
          if (b.y > halfH * 2.2) { b.y = halfH * 2.2; b.vy = -Math.abs(b.vy) * 0.5 }
        }
        // collisions
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i], c = bodies[j]
            const dx = c.x - a.x, dy = c.y - a.y
            const min = (a.r + c.r) * 0.92
            const d2 = dx * dx + dy * dy
            if (d2 < min * min && d2 > 1e-6) {
              const d = Math.sqrt(d2)
              const nx = dx / d, ny = dy / d
              const push = (min - d) / 2
              a.x -= nx * push; a.y -= ny * push
              c.x += nx * push; c.y += ny * push
              const rel = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny
              if (rel < 0) {
                const imp = -rel * 0.85
                a.vx -= nx * imp; a.vy -= ny * imp
                c.vx += nx * imp; c.vy += ny * imp
              }
            }
          }
        }
      }

      const draw = () => {
        for (const b of bodies) {
          b.mesh.position.set(b.x, b.y, 0)
          b.mesh.rotation.x += b.spin[0] + b.vy * 0.02
          b.mesh.rotation.y += b.spin[1] + b.vx * 0.02
          b.mesh.rotation.z += b.spin[2]
        }
        renderer.render(scene, camera)
      }

      let raf = 0
      let running = true
      // Adaptive quality: on a slow device drop to 1x resolution first, then remove half the objects.
      let last = performance.now(), slow = 0, stage = 0
      const loop = () => {
        if (!running) return
        const now = performance.now()
        const dt = now - last
        last = now
        slow = dt > 42 ? slow + 1 : Math.max(0, slow - 1)
        if (slow > 40 && stage < 2) {
          slow = 0
          stage++
          if (stage === 1) { renderer.setPixelRatio(1); measure() }
          else {
            for (let i = bodies.length - 1; i >= bodies.length / 2; i--) { scene.remove(bodies[i].mesh); bodies.pop() }
          }
        }
        step()
        draw()
        raf = requestAnimationFrame(loop)
      }
      const onVis = () => {
        running = !document.hidden
        if (running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop) }
      }
      document.addEventListener("visibilitychange", onVis)

      if (reduce) {
        for (let i = 0; i < 400; i++) step() // settle, then show one still frame
        draw()
      } else {
        raf = requestAnimationFrame(loop)
      }
      el.dataset.ready = "1"

      cleanup = () => {
        running = false
        cancelAnimationFrame(raf)
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerdown", burst)
        document.documentElement.removeEventListener("pointerleave", onLeave)
        window.removeEventListener("resize", onResize)
        document.removeEventListener("visibilitychange", onVis)
        geos.forEach((g) => g.dispose())
        mats.forEach((m) => m.dispose())
        pmrem.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
    const handle = idle ? idle(() => { void start() }, { timeout: 1200 }) : window.setTimeout(() => { void start() }, 400)
    return () => {
      disposed = true
      if (idle) (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle)
      else window.clearTimeout(handle)
      cleanup()
    }
  }, [])

  return <div ref={host} className="sc-host" aria-hidden="true" />
}
