import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import HeroDots from '../components/HeroDots'
import { useRef } from 'react'
import { ArrowUp, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { CONTACT } from '../data/content'
import { BlurText, Button, Logo, Reveal } from '../components/ui'

export function CTA() {
  const reduce = useReducedMotion()
  return (
    <section id="contact" className="section">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] p-[1px]" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,.16), rgba(255,255,255,.04) 50%, rgba(34,211,238,.25))' }}>
            <div className="relative overflow-hidden rounded-[31px] bg-[#070e1b] px-6 py-16 text-center sm:px-12 md:py-24">
              <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgba(59,130,246,.18), transparent 70%)' }} />
              <HeroDots
                reduce={!!reduce}
                gap={20}
                mask="radial-gradient(ellipse 42% 55% at 50% 50%, transparent 35%, #000 100%)"
              />
              <div className="relative">
                <BlurText
                  text="Ready to simplify your technology?"
                  highlight={[2]}
                  className="h-display mx-auto max-w-3xl text-[36px] sm:text-[50px] md:text-[60px]"
                />
                <Reveal delay={0.2}>
                  <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/65">
                    Book a free consultation today. No obligation — just honest advice from people who genuinely care about your business.
                  </p>
                </Reveal>
                <Reveal delay={0.3} className="mt-9 flex flex-wrap justify-center gap-3">
                  <Button href={`mailto:${CONTACT.email}`} variant="brand">Get in touch</Button>
                  <Button href={CONTACT.phoneHref} variant="secondary">Call {CONTACT.phone}</Button>
                </Reveal>
                <Reveal delay={0.4}>
                  <p className="mt-6 text-[13px] text-white/40">{CONTACT.email} · {CONTACT.hours}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const COLS = [
  { h: 'Services', links: ['Managed IT Services', 'Web Services', 'Hardware & Infrastructure', 'AI Services'] },
  { h: 'Company', links: ['About Us', 'Our Team', 'Contact Us'] },
]

export function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])
  const op = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.07] pt-16">
      <div className="container-site grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/55">
            Making technology human for over 30 years. We simplify ICT so you can focus on what matters most — your business.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <h4 className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">{c.h}</h4>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-[15px] text-white/70 transition-colors hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">Get in touch</h4>
          <ul className="mt-5 space-y-3 text-[15px] text-white/70">
            <li><a href={CONTACT.phoneHref} className="flex items-center gap-3 hover:text-white"><Phone size={15} className="text-brand-cyan" />{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-white"><Mail size={15} className="text-brand-cyan" />{CONTACT.email}</a></li>
            <li className="flex items-center gap-3"><MapPin size={15} className="text-brand-cyan" />{CONTACT.location}</li>
            <li className="flex items-center gap-3"><Clock size={15} className="text-brand-cyan" />{CONTACT.hours}</li>
          </ul>
        </div>
      </div>

      <motion.div style={{ y, opacity: op }} className="pointer-events-none mt-14 select-none text-center" aria-hidden="true">
        <span
          className="block font-display text-[19vw] font-semibold leading-[0.8] tracking-[-0.05em]"
          style={{ color: 'rgba(255,255,255,.04)' }}
        >
          SimplyICT
        </span>
      </motion.div>

      <div className="container-site relative flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-6 text-[13.5px] text-white/45 sm:flex-row">
        <p>© 2026 Simply ICT. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#top" className="hover:text-white">Privacy Policy</a>
          <a href="#top" className="hover:text-white">Terms of Service</a>
          <a href="#top" aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:-translate-y-0.5 hover:border-white/25">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
