import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { SectionHeading } from './components/SectionHeading'
import { sections } from './data/sections'
import { useLanguage } from './i18n/useLanguage'

export function App() {
  const { t } = useLanguage()

  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-accent px-4 py-2 font-semibold text-accent-ink focus:translate-y-0"
      >
        {t('skip')}
      </a>
      <Header />
      <main id="conteudo" className="pt-16">
        {sections.map((section, i) => (
          <section key={section.id} id={section.id} className="border-b border-line py-24">
            <div className="container-page">
              <SectionHeading index={i + 1} kicker={t(section.label)} title={t(section.label)} />
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
