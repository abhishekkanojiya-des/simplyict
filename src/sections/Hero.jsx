import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { EASE } from '../components/ui'

const HeroOrb = lazy(() => import('../components/HeroOrb'))
import HeroDots from '../components/HeroDots'

/* Orbit geometry (matches the 3D camera framing — 800×440 stage) */
const CX = 400, CY = 337, R = 282
const pt = (deg, r = R) => [CX + r * Math.cos((deg * Math.PI) / 180), CY - r * Math.sin((deg * Math.PI) / 180)]
const ARC = (() => {
  const [x1, y1] = pt(158), [x2, y2] = pt(22)
  return `M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}`
})()

/* Four points on the arc; each cycles through a list of services */
const POINTS = [
  { a: 146, anchor: 'end' },
  { a: 112, anchor: 'end' },
  { a: 68, anchor: 'start' },
  { a: 34, anchor: 'start' },
]
const SETS = [
  ['Managed IT', 'Web', 'Infrastructure', 'AI'],
  ['Cybersecurity', 'Web Design', 'Networking', 'Copilot'],
  ['Cloud', 'Hosting', 'Servers & Storage', 'Chatbots'],
  ['Helpdesk', 'SEO', 'Business Wi-Fi', 'Automation'],
  ['On-site Support', 'E-Commerce', 'Workstations', 'AI Strategy'],
]

function useCycle(length, ms, enabled) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(id)
  }, [length, ms, enabled])
  return i
}

function Orbit({ reduce }) {
  const set = useCycle(SETS.length, 3600, !reduce)
  return (
    <svg viewBox="0 0 800 440" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="arcfade" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#fff" stopOpacity=".55" />
          <stop offset=".75" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={ARC}
        fill="none"
        stroke="url(#arcfade)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
      />
      {/* a small light travelling the arc */}
      <circle r="2.5" fill="#22d3ee">
        <animateMotion dur="9s" repeatCount="indefinite" path={ARC} />
      </circle>
      {POINTS.map(({ a, anchor }, i) => {
        const [x, y] = pt(a)
        const [lx, ly] = pt(a, R + 28)
        const label = SETS[set][i]
        return (
          <motion.g
            key={a}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.9 + i * 0.15, duration: 0.8 }}
          >
            <circle cx={x} cy={y} r="3.5" fill="#fff" />
            <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(255,255,255,.25)" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.text
                key={label}
                x={lx}
                y={ly + 5}
                textAnchor={anchor}
                className="fill-white/70 font-sans"
                style={{ fontSize: 15, letterSpacing: '-0.01em' }}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, delay: i * 0.12, ease: EASE } }}
                exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.45, delay: i * 0.12 } }}
              >
                {label}
              </motion.text>
            </AnimatePresence>
          </motion.g>
        )
      })}
    </svg>
  )
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: EASE, delay },
})

export default function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-32">
      {/* soft side light, no grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(60% 70% at 100% 15%, rgba(59,130,246,.16), transparent 60%), radial-gradient(50% 60% at 0% 70%, rgba(34,211,238,.07), transparent 60%)',
        }}
      />

      <HeroDots reduce={!!reduce} />

      <div className="container-site relative flex flex-col items-center text-center">
        <motion.div {...fade(0)} className="relative -ml-[11%] aspect-[800/440] w-[122%] max-w-[800px] shrink-0 self-start sm:mx-auto sm:w-full sm:self-center">
          <div
            className="absolute inset-0"
            style={{ WebkitMaskImage: 'linear-gradient(#000 36%, transparent 66%)', maskImage: 'linear-gradient(#000 36%, transparent 66%)' }}
          >
            <Suspense fallback={null}>
              <HeroOrb reduce={!!reduce} />
            </Suspense>
          </div>
          <Orbit reduce={!!reduce} />
        </motion.div>

        <motion.p {...fade(0.2)} className="relative z-10 -mt-32 text-[15px] text-white/55 sm:-mt-40 md:-mt-48 md:text-[18px]">
          Managed IT. Websites. Infrastructure. AI.
        </motion.p>
        <motion.h1
          {...fade(0.3)}
          className="relative z-10 mt-4 max-w-[14ch] font-display text-[44px] font-medium leading-[1.02] tracking-[-0.035em] text-[#eef1f6] sm:text-[64px] md:text-[78px]"
        >
          Technology that works for you
        </motion.h1>
        <motion.p {...fade(0.4)} className="mt-6 max-w-[34rem] text-[16.5px] leading-relaxed text-white/60 md:text-[18px]">
          One Australian-owned partner looking after your IT, websites and infrastructure — so you can focus on your business.
        </motion.p>
        <motion.div {...fade(0.5)} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a
            href="#contact"
            className="relative inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-medium text-white shadow-none transition-[box-shadow,filter] duration-300 hover:shadow-[0_12px_40px_-8px_rgba(34,211,238,.7)] hover:brightness-110"
            style={{ background: 'linear-gradient(120deg, #3b82f6 0%, #22d3ee 100%)' }}
          >
            Book a free consultation
          </a>
          <a href="#services" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-white/85 hover:text-white">
            Explore services
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
