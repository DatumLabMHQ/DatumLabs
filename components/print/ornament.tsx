"use client"

import { useEffect, useRef } from "react"

/* Engraved geometry, generated in code. One rosette per page at most
   (docs/DESIGN.md); lathe waves carry the navy bands. */

type Layer = { R: number; r: number; d: number; turns: number; phase: number; color: string }

function drawHypotrochoids(c: CanvasRenderingContext2D, w: number, h: number, layers: Layer[], lw: number) {
  c.clearRect(0, 0, w, h)
  c.lineWidth = lw
  const cx = w / 2
  const cy = h / 2
  const s = Math.min(w, h) / 1800
  for (const L of layers) {
    c.strokeStyle = L.color
    c.beginPath()
    const k = (L.R - L.r) / L.r
    for (let t = 0; t <= Math.PI * 2 * L.turns; t += 0.0025) {
      const x = (L.R - L.r) * Math.cos(t) + L.d * Math.cos(k * t + L.phase)
      const y = (L.R - L.r) * Math.sin(t) - L.d * Math.sin(k * t + L.phase)
      if (t === 0) c.moveTo(cx + x * s, cy + y * s)
      else c.lineTo(cx + x * s, cy + y * s)
    }
    c.stroke()
  }
}

function useCanvas(draw: (c: CanvasRenderingContext2D, w: number, h: number, t: number) => void, animate: boolean) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const c = cv.getContext("2d")
    if (!c) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0
    let h = 0
    let raf = 0
    let t = 0
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width * dpr))
      h = Math.max(1, Math.round(r.height * dpr))
      cv.width = w
      cv.height = h
      draw(c, w, h, t)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)
    if (animate && !reduce) {
      const loop = () => {
        if (visible && !document.hidden) {
          t += 0.0016
          draw(c, w, h, t)
        }
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [draw, animate])
  return ref
}

const drawRosette = (c: CanvasRenderingContext2D, w: number, h: number, t: number) =>
  drawHypotrochoids(
    c,
    w,
    h,
    [
      { R: 640, r: 96, d: 300, turns: 12, phase: t, color: "rgba(46,79,224,.22)" },
      { R: 560, r: 80, d: 250, turns: 10, phase: -t * 1.3, color: "rgba(46,79,224,.16)" },
      { R: 430, r: 62, d: 190, turns: 31, phase: t * 0.7, color: "rgba(6,11,51,.10)" },
    ],
    Math.max(1, w / 1500),
  )

export function Rosette({ className = "sp-rosette", animate = true }: { className?: string; animate?: boolean }) {
  const ref = useCanvas(drawRosette, animate)
  return <canvas ref={ref} className={className} aria-hidden="true" />
}

const drawLathe = (c: CanvasRenderingContext2D, w: number, h: number) => {
  c.clearRect(0, 0, w, h)
  c.lineWidth = Math.max(1, w / 2200)
  const rows = 26
  for (let k = 0; k < rows; k++) {
    c.strokeStyle = `rgba(126,151,249,${0.18 + (k % 4) * 0.05})`
    c.beginPath()
    const base = (h / (rows - 1)) * k
    for (let x = 0; x <= w; x += 4) {
      const y = base + Math.sin(x / (w / 9) + k * 0.42) * (h / 22) * Math.cos(x / (w / 2.2) + k * 0.18)
      if (x === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    }
    c.stroke()
  }
}

export function Lathe({ className = "sp-lathe" }: { className?: string }) {
  const ref = useCanvas(drawLathe, false)
  return <canvas ref={ref} className={className} aria-hidden="true" />
}
