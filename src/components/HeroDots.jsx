import { useEffect, useRef } from 'react'

/*
  Quiet halftone dot field for the hero sides.
  - A slow diagonal wave brightens dots as it passes.
  - Dots near the cursor glow softly.
  - Masked so the centre (globe + headline) stays clean.
*/
export default function HeroDots({ reduce, mask: maskProp, gap = 22 }) {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const GAP = gap
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, last = 0, visible = true
    const mouse = { x: -9999, y: -9999 }

    const size = () => {
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (!visible || now - last < 33) return // ~30fps is plenty
      last = now
      const t = reduce ? 0 : now / 1000
      ctx.clearRect(0, 0, w, h)
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const wave = Math.sin((x + y) * 0.012 - t * 0.9) * 0.5 + 0.5
          const md = Math.hypot(x - mouse.x, y - mouse.y)
          const hover = Math.max(0, 1 - md / 160)
          const a = 0.09 + Math.pow(wave, 6) * 0.3 + hover * 0.45
          const r = 1 + hover * 0.8
          ctx.fillStyle = hover > 0.05 ? `rgba(125,211,252,${a})` : `rgba(170,190,220,${a})`
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const onMove = (e) => {
      const r = c.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = mouse.y = -9999 }

    size()
    raf = requestAnimationFrame(draw)
    const ro = new ResizeObserver(size)
    ro.observe(c)
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(c)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, gap])

  const mask = maskProp ||
    'radial-gradient(ellipse 34% 75% at 50% 45%, transparent 55%, #000 100%), linear-gradient(#000 70%, transparent)'
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ WebkitMaskImage: mask, maskImage: mask, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }}
    />
  )
}
