import { motion, useReducedMotion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import avatar from '../assets/avatar.webp'
import { contacts, profile } from '../data/profile'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage'

export function About() {
  const { t, l, lang } = useLanguage()
  const reduce = useReducedMotion()

  const stats = [
    { value: projects.length, label: t('about.stats.projects') },
    { value: `${profile.skills.length}`, label: t('about.stats.tech') },
    { value: profile.certificates, label: t('about.stats.certs') },
  ]

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            <motion.p
              {...fade(0)}
              className="font-display text-sm font-semibold tracking-[0.18em] text-accent uppercase"
            >
              01 — {t('about.kicker')}
            </motion.p>

            <motion.h1
              {...fade(0.05)}
              id="sobre-titulo"
              className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p {...fade(0.1)} className="mt-4 text-lg text-dim md:text-xl">
              {l(profile.role)}
            </motion.p>

            {/* key força a animação de troca quando o idioma muda */}
            <motion.div
              key={lang}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="mt-6 max-w-2xl space-y-4 leading-relaxed text-dim"
            >
              {l(profile.about).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div {...fade(0.2)} className="mt-8 flex flex-wrap gap-3">
              <a href="#projetos" className="btn btn-primary">
                {t('about.cta.projects')}
                <HiArrowDown aria-hidden />
              </a>
              <a href="#contato" className="btn btn-ghost">
                {t('about.cta.contact')}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-first mx-auto md:order-none"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent/50 to-transparent blur-xl" aria-hidden />
              <img
                src={avatar}
                alt={t('about.photo')}
                width={236}
                height={306}
                className="relative size-40 rounded-full border-2 border-accent/60 object-cover object-top shadow-2xl sm:size-52 md:size-64"
              />
            </div>
            <ul className="mt-6 flex justify-center gap-2">
              {contacts.map(({ id, href, icon: Icon, label }) => (
                <li key={id}>
                  <a
                    href={href}
                    target={id === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={l(label)}
                    className="grid size-10 place-items-center rounded-full border border-line bg-surface text-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card px-3 py-5 text-center md:py-6">
              <p className="font-display text-2xl font-bold md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-dim md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-sm font-semibold text-faint uppercase tracking-wider">{t('about.skills')}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-faint uppercase tracking-wider">{t('about.languages')}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.languages.map((language) => (
                <li key={language.name.pt} className="chip">
                  <span className="text-ink">{l(language.name)}</span>
                  <span className="mx-1.5 text-faint">·</span>
                  {l(language.level)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
