import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext } from './context'
import { translations, type TranslationKey } from './translations'
import type { Language, Localized } from './types'

const STORAGE_KEY = 'portfolio-lang'

function readStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // localStorage indisponível (modo privado, cookies bloqueados): segue com o padrão
  }
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // sem persistência, o idioma volta ao padrão no próximo acesso
    }
  }, [lang])

  const setLang = useCallback((next: Language) => setLangState(next), [])
  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang])
  const l = useCallback(<T,>(value: Localized<T>) => value[lang], [lang])

  const value = useMemo(() => ({ lang, setLang, t, l }), [lang, setLang, t, l])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
