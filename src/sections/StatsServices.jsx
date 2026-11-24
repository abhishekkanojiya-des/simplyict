import { Check, ArrowRight } from 'lucide-react'
import { STATS, SERVICES } from '../data/content'
import { Counter, GlowCard, IconTile, Reveal, SectionHead } from '../components/ui'

export function Stats() {
  return (
    <section aria-label="Key figures" className="relative border-y border-white/[0.07] py-10">
      <div className="container-site grid grid-cols-2 gap-y-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="border-l border-white/10 px-5 py-4 md:px-7">
              <Counter
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals}
                className="block font-display text-[40px] font-medium leading-none tracking-[-0.03em] text-white md:text-[54px]"
              />
              <p className="mt-3 text-[14.5px] text-white/50">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-site">
        <SectionHead
          eyebrow="What we do"
          title="Everything your business runs on — under one roof"
          highlight={[6, 7, 8]}
          sub="No more juggling five providers. We design, deliver and support the full technology stack your business depends on."
        />
        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:gap-5">
          {SERVICES.map((s, i) => (
            <GlowCard key={s.title} delay={i * 0.1} className="flex flex-col p-7 md:p-8">
              <div className="flex items-start justify-between">
                <IconTile icon={s.icon} />
                {s.badge && (
                  <span className="rounded-full border border-brand-cyan/40 px-2.5 py-0.5 text-[12px] text-brand-cyan">{s.badge}</span>
                )}
              </div>
              <h3 className="mt-7 text-[24px] font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-white/60">{s.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-white/80">
                    <Check size={15} className="shrink-0 text-brand-cyan" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="group/l mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-medium text-white"
              >
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-300 group-hover/l:-translate-y-full">{s.cta}</span>
                  <span className="absolute left-0 top-full block text-brand-cyan transition-transform duration-300 group-hover/l:-translate-y-full">
                    {s.cta}
                  </span>
                </span>
                <ArrowRight size={16} className="text-brand-cyan transition-transform duration-300 group-hover/l:translate-x-1" />
              </a>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
