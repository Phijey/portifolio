import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useLanguage } from './i18n/useLanguage'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experiences } from './sections/Experiences'
import { Projects } from './sections/Projects'

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
      <main id="conteudo">
        <About />
        <Projects />
        <Experiences />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
