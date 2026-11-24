import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { NAV, CONTACT } from '../data/content'
import { Logo, Button, EASE } from './ui'

function NewBadge() {
  return (
    <span className="ml-1.5 rounded-full border border-brand-cyan/40 px-1.5 py-[1px] text-[10.5px] font-medium text-brand-cyan">
      New
    </span>
  )
}

function Dropdown({ item }) {
  const wide = item.items.length > 4
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
      transition={{ duration: 0.3, ease: EASE }}
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4"
    >
      <div
        className={`grid gap-1 rounded-3xl border border-white/10 bg-[#0a1322]/90 p-2.5 shadow-2xl shadow-black/50 backdrop-blur-xl ${
          wide ? 'w-[560px] grid-cols-2' : 'w-[300px] grid-cols-1'
        }`}
      >
        {item.items.map(({ label, desc, icon: Icon }) => (
          <a
            key={label}
            href={item.href}
            className="group/i flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-white/[0.06]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-cyan transition-colors group-hover/i:border-brand-cyan/40">
              <Icon size={17} />
            </span>
            <span>
              <span className="block text-[14px] font-medium text-white">{label}</span>
              <span className="block text-[12.5px] leading-snug text-white/50">{desc}</span>
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mAcc, setMAcc] = useState(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 400 && y > prev && !open && !mobile)
  })

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: hidden ? -110 : 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5"
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[1340px] items-center justify-between rounded-full border border-white/10 backdrop-blur-[15px] backdrop-saturate-150 transition-all duration-500 ${
            scrolled ? 'bg-[#0a1322]/80 py-2 pl-5 pr-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)]' : 'bg-[#0a1322]/50 py-2.5 pl-5 pr-2.5'
          }`}
        >
          <Logo size={34} className="shrink-0" />

          <ul className="hidden items-center pl-4 xl:flex" onMouseLeave={() => setOpen(null)}>
            {NAV.map((item) => (
              <li key={item.label} className="relative" onMouseEnter={() => setOpen(item.items ? item.label : null)}>
                <a
                  href={item.href}
                  onFocus={() => setOpen(item.items ? item.label : null)}
                  aria-haspopup={item.items ? 'true' : undefined}
                  aria-expanded={item.items ? open === item.label : undefined}
                  className={`group relative flex items-center whitespace-nowrap rounded-full px-2.5 py-2 text-[14.5px] 2xl:px-3.5 transition-colors ${
                    open === item.label ? 'text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.badge && <NewBadge />}
                  {item.items && (
                    <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${open === item.label ? 'rotate-180' : ''}`} />
                  )}
                  
                </a>
                <AnimatePresence>{open === item.label && item.items && <Dropdown item={item} />}</AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button href={CONTACT.phoneHref} variant="secondary" className="hidden !py-2 md:inline-flex">
              {CONTACT.phone}
            </Button>
            <Button href="#contact" className="hidden !py-2 sm:inline-flex">
              Free quote
            </Button>
            <button
              onClick={() => setMobile(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex flex-col bg-[#05080f]/90 px-5 pb-8 pt-5 xl:hidden"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <Logo size={34} />
              <button
                onClick={() => setMobile(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05]"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <motion.ul
              className="mt-8 flex-1 overflow-y-auto"
              initial="h"
              animate="s"
              transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
            >
              {NAV.map((item) => (
                <motion.li
                  key={item.label}
                  variants={{ h: { opacity: 0, y: 16, filter: 'blur(8px)' }, s: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="border-b border-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      onClick={() => setMobile(false)}
                      className="flex items-center py-4 font-display text-[22px] font-medium"
                    >
                      {item.label}
                      {item.badge && <NewBadge />}
                    </a>
                    {item.items && (
                      <button
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => setMAcc(mAcc === item.label ? null : item.label)}
                        aria-label={`Toggle ${item.label}`}
                        aria-expanded={mAcc === item.label}
                      >
                        <ChevronDown size={18} className={`transition-transform ${mAcc === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {mAcc === item.label && item.items && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-1 pb-4">
                          {item.items.map(({ label, icon: Icon }) => (
                            <a
                              key={label}
                              href={item.href}
                              onClick={() => setMobile(false)}
                              className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-[15px] text-white/70"
                            >
                              <Icon size={16} className="text-brand-cyan" /> {label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-6 grid gap-3" onClick={() => setMobile(false)}>
              <Button href="#contact" className="justify-between">Get a free quote</Button>
              <Button href={CONTACT.phoneHref} variant="secondary" className="justify-between">
                Call {CONTACT.phone}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
