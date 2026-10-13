import { createContext } from 'react'
import type { TranslationKey } from './translations'
import type { Language, Localized } from './types'

export interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
  /** Escolhe a versão de um conteúdo bilíngue no idioma atual. */
  l: <T>(value: Localized<T>) => T
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
