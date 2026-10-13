import type { Language } from '../i18n/types'

/** Converte "2026-06" em "Junho de 2026" / "June 2026". */
export function formatMonth(value: string, lang: Language) {
  const [year, month] = value.split('-').map(Number)
  const text = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, 1))
  return text.charAt(0).toUpperCase() + text.slice(1)
}
