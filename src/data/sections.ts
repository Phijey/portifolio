import type { TranslationKey } from '../i18n/translations'

export const sections = [
  { id: 'sobre', label: 'nav.about' },
  { id: 'projetos', label: 'nav.projects' },
  { id: 'experiencias', label: 'nav.experience' },
  { id: 'contato', label: 'nav.contact' },
] as const satisfies readonly { id: string; label: TranslationKey }[]

export type SectionId = (typeof sections)[number]['id']
