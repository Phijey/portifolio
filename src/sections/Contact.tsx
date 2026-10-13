import { HiArrowUpRight } from 'react-icons/hi2'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { contacts } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export function Contact() {
  const { t, l } = useLanguage()

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="contato-titulo"
            index={4}
            kicker={t('contact.kicker')}
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contacts.map(({ id, href, icon: Icon, label, value }) => (
                <li key={id}>
                  <a
                    href={href}
                    target={id === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="card group flex h-full items-center gap-4 p-4 transition-colors hover:border-accent md:p-5"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{l(label)}</span>
                      <span className="block truncate text-xs text-dim">{value}</span>
                    </span>
                    <HiArrowUpRight
                      className="size-4 shrink-0 text-faint transition-colors group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
