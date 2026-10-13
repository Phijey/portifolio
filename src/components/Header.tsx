import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import { profile } from '../data/profile'
import { sections } from '../data/sections'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLanguage } from '../i18n/useLanguage'
import { LanguageToggle } from './LanguageToggle'

const sectionIds = sections.map((s) => s.id)

export function Header() {
  const { t } = useLanguage()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // fecha o menu mobile com Esc e quando a tela passa para o layout desktop
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const media = window.matchMedia('(min-width: 768px)')
    const onMedia = () => media.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    media.addEventListener('change', onMedia)
    return () => {
      window.removeEventListener('keydown', onKey)
      media.removeEventListener('change', onMedia)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#sobre" className="font-display text-lg font-bold tracking-tight">
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => {
              const isActive = active === section.id
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-ink' : 'text-dim hover:text-ink'
                    }`}
                  >
                    {t(section.label)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-line text-ink md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t('nav.close') : t('nav.menu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX className="size-5" /> : <HiOutlineMenuAlt3 className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === section.id ? 'true' : undefined}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active === section.id ? 'bg-surface text-accent' : 'text-dim'
                    }`}
                  >
                    {t(section.label)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
