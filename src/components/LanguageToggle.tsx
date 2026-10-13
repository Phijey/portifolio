import { useLanguage } from '../i18n/useLanguage'
import type { Language } from '../i18n/types'

const options: { value: Language; label: string; name: string }[] = [
  { value: 'pt', label: 'PT', name: 'Português' },
  { value: 'en', label: 'EN', name: 'English' },
]

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className="flex rounded-lg border border-line bg-surface p-0.5 text-xs font-semibold"
    >
      {options.map((option) => {
        const selected = option.value === lang
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={selected}
            aria-label={option.name}
            className={`rounded-md px-2.5 py-1.5 transition-colors ${
              selected ? 'bg-accent text-accent-ink' : 'text-dim hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
