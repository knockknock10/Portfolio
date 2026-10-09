const listeners = new Map<Element, (active: boolean) => void>()
const visible = new Set<Element>()
const active = new Set<Element>()
let observer: IntersectionObserver | null = null

function getActiveLimit(): number {
  const raw = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--glass-max-active-layers")
  const limit = Number.parseInt(raw, 10)
  return Number.isFinite(limit) && limit > 0 ? limit : 1
}

function syncActiveLayers() {
  const next = new Set([...visible].slice(0, getActiveLimit()))
  for (const [element, notify] of listeners) {
    const wasActive = active.has(element)
    const isActive = next.has(element)
    if (wasActive !== isActive) notify(isActive)
  }
  active.clear()
  for (const element of next) active.add(element)
}

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        syncActiveLayers()
      },
      { rootMargin: "80px 0px", threshold: 0 },
    )
  }
  return observer
}

export function registerGlassLayer(element: Element, notify: (active: boolean) => void) {
  listeners.set(element, notify)
  getObserver().observe(element)
  return () => {
    observer?.unobserve(element)
    listeners.delete(element)
    visible.delete(element)
    active.delete(element)
    syncActiveLayers()
  }
}
