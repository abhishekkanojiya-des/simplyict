import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export const EASE = [0.22, 1, 0.36, 1]

/* ───────────── Logo (exact Simply ICT mark) ───────────── */
export function Logo({ size = 36, className = '' }) {
  return (
    <a
      href="/"
      onClick={(e) => {
        // Already on the homepage: smooth-scroll to top instead of reloading
        if (document.getElementById('top')) {
          e.preventDefault()
          window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Simply ICT — home"
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logo-g1)" />
        <path d="M13 27l10-13 4 6 6-8" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="logo-g1" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-[21px] font-semibold tracking-tight">
        Simply<span className="gradient-text">ICT</span>
      </span>
    </a>
  )
}

/* ───────────── Word-by-word blur reveal ───────────── */
export function BlurText({ text, as: Tag = 'h2', className = '', highlight = [], delay = 0 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const MotionTag = motion[Tag]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ willChange: 'transform, filter, opacity' }}
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)', y: 20 },
            show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          {w}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </MotionTag>
  )
}

/* ───────────── Generic blur-in reveal ───────────── */
export function Reveal({ children, className = '', delay = 0, y = 30, as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', y }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

/* ───────────── Eyebrow pill ───────────── */
export function Eyebrow({ children, className = '' }) {
  return (
    <Reveal className={className}>
      <span className="inline-flex items-center gap-3 text-[14px] text-white/50">
        <span className="h-px w-6 bg-brand-cyan/70" />
        {children}
      </span>
    </Reveal>
  )
}

/* ───────────── Text-roll button ───────────── */
export function Button({ children, href = '#contact', variant = 'primary', className = '', icon = true }) {
  const base =
    'group relative inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full py-3 pl-6 pr-3 text-[15px] font-medium transition-transform duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
  const styles =
    variant === 'primary'
      ? 'border border-white/15 bg-[#0b111c] text-white hover:border-white/30'
      : variant === 'brand'
      ? 'text-white transition-[box-shadow,filter] hover:shadow-[0_12px_40px_-8px_rgba(34,211,238,.7)] hover:brightness-110'
      : 'border border-white/10 bg-transparent text-white/85 hover:border-white/25 hover:text-white'
  return (
    <a
      href={href}
      className={`${base} ${styles} ${!icon ? 'pr-6' : ''} ${className}`}
      style={variant === 'brand' ? { background: 'linear-gradient(120deg, #3b82f6 0%, #22d3ee 100%)' } : undefined}
    >
      {variant === 'primary' && (
        <span
          className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2"
          style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }}
        />
      )}
      <span className="relative block h-[1.4em] overflow-hidden leading-[1.4em]">
        <span className="block transition-transform duration-300 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span aria-hidden="true" className="absolute left-0 top-full block transition-transform duration-300 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      {icon && (
        <span className={`grid h-8 w-8 place-items-center rounded-full ${variant === 'primary' ? 'bg-white text-bg' : variant === 'brand' ? 'bg-white text-brand-blue' : 'bg-white/10 text-white'}`}>
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      )}
    </a>
  )
}

/* ───────────── Count-up number ───────────── */
export function Counter({ value, suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(v) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className={className}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ───────────── Card with cursor spotlight + gradient border ───────────── */
export function GlowCard({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Reveal delay={delay} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: EASE }}
        className={`glow-card glass h-full overflow-hidden rounded-3xl ${className}`}
      >
        <span className="spot" />
        {children}
      </motion.div>
    </Reveal>
  )
}

export function IconTile({ icon: Icon, size = 22, className = '' }) {
  return (
    <span className={`grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-cyan ${className}`}>
      <Icon size={size} strokeWidth={2} />
    </span>
  )
}

export function SectionHead({ eyebrow, title, highlight = [], sub, center = true, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <BlurText text={title} highlight={highlight} className="h-display mt-5 text-[34px] text-[#eef1f6] sm:text-[44px] md:text-[52px]" />
      {sub && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-[17px] leading-relaxed text-white/65 ${center ? 'mx-auto' : ''} max-w-2xl`}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
