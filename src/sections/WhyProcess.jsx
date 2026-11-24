import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { WHY, PROCESS } from '../data/content'
import { GlowCard, IconTile, Reveal, SectionHead } from '../components/ui'

function MapVisual() {
  return (
    <div className="relative mt-8 h-[190px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#071022]">
      <div className="grid-bg absolute inset-0 opacity-80" />
      <svg viewBox="0 0 400 190" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M40 150 C90 120 120 160 170 130 S260 70 300 90 S370 60 400 40" fill="none" stroke="rgba(59,130,246,.35)" strokeDasharray="4 6" />
        <path d="M0 60 C60 80 110 40 170 60 S250 120 320 110 S380 140 400 150" fill="none" stroke="rgba(34,211,238,.25)" strokeDasharray="4 6" />
      </svg>
      <div className="absolute left-[58%] top-[46%] -translate-x-1/2 -translate-y-1/2">
        <span className="ping-soft absolute -inset-3 rounded-full bg-brand-cyan/40" />
        <span className="ping-soft absolute -inset-6 rounded-full bg-brand-blue/25" style={{ animationDelay: '.6s' }} />
        <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-brand-blue" />
      </div>
      <div className="absolute bottom-3 left-3 rounded-xl border border-white/10 bg-[#0a1322]/85 px-3 py-2 text-[12.5px] backdrop-blur">
        <span className="block font-medium">North Lakes, QLD</span>
        <span className="text-white/50">Local response, Australia-wide</span>
      </div>
    </div>
  )
}

export function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="container-site relative">
        <SectionHead
          eyebrow="The Simply ICT difference"
          title="IT that feels simple, because it’s done properly"
          highlight={[3]}
          sub="For over 30 years we’ve made technology human. That means clear advice, plain language and support you can actually reach."
        />
        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {WHY.map((w, i) => {
            const feature = i === 2
            return (
              <div key={w.title} className={feature ? 'lg:col-start-3 lg:row-span-2 lg:row-start-1' : i === 0 ? 'lg:col-span-2' : ''}>
                <GlowCard delay={i * 0.08} className="flex flex-col p-7 md:p-8">
                  <IconTile icon={w.icon} />
                  <h3 className="mt-6 text-[22px] font-medium tracking-tight">{w.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-white/60">{w.desc}</p>
                  {feature && <MapVisual />}
                </GlowCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Step({ s, i, progress }) {
  const start = i / PROCESS.length
  const lit = useTransform(progress, [start, start + 0.12], [0, 1])
  const glow = useTransform(lit, (v) => `0 0 ${18 * v}px rgba(59,130,246,${0.45 * v})`)
  const left = i % 2 === 0
  return (
    <div className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-5 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-8">
      <div className="relative col-start-1 row-start-1 flex justify-center md:col-start-2">
        <motion.div
          style={{ boxShadow: glow }}
          className="relative z-10 grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white/15 bg-[#0a1322] font-display text-[17px] font-semibold"
        >
          <motion.span style={{ opacity: lit }} className="absolute inset-0 bg-brand-blue" />
          <span className="relative">{s.n}</span>
        </motion.div>
      </div>
      <Reveal className={`col-start-2 row-start-1 pb-10 md:pb-14 ${left ? 'md:col-start-1 md:text-right' : 'md:col-start-3'}`}>
        <div className="glass rounded-3xl p-6 md:p-7">
          <h3 className="text-[22px] font-medium tracking-tight">{s.title}</h3>
          <p className="mt-2.5 text-[15.5px] leading-relaxed text-white/60">{s.desc}</p>
        </div>
      </Reveal>
    </div>
  )
}

export function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })
  return (
    <section id="process" className="section">
      <div className="container-site">
        <SectionHead eyebrow="How we start" title="From first call to full support in four steps" highlight={[4, 5]} />
        <div ref={ref} className="relative mt-16 md:mt-20">
          <div className="absolute bottom-16 left-[28px] top-7 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: progress, background: 'linear-gradient(#3b82f6, #22d3ee)' }}
            className="absolute bottom-16 left-[28px] top-7 w-[2px] origin-top md:left-1/2 md:-translate-x-1/2"
          />
          {PROCESS.map((s, i) => (
            <Step key={s.n} s={s} i={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  )
}
