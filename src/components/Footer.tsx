import { HiArrowUp } from 'react-icons/hi'
import { contacts, profile } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

const year = new Date().getFullYear()

export function Footer() {
  const { t, l } = useLanguage()

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-5 py-8 text-sm text-dim md:flex-row">
        <p>
          © {year} {profile.name}. {t('footer.rights')}
        </p>

        <div className="flex items-center gap-2">
          {contacts.map(({ id, href, icon: Icon, label }) => (
            <a
              key={id}
              href={href}
              target={id === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={l(label)}
              className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="size-4" aria-hidden />
            </a>
          ))}
          <a
            href="#sobre"
            aria-label={t('footer.top')}
            className="ml-2 grid size-9 place-items-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-accent hover:text-accent-ink"
          >
            <HiArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
