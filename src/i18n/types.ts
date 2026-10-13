export type Language = 'pt' | 'en'

/** Texto disponível nos dois idiomas do site. */
export type Localized<T = string> = Record<Language, T>
