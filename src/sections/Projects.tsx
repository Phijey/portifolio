import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { projectsTimeline } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage'
import { formatMonth } from '../utils/format'

export function Projects() {
  const { t, lang } = useLanguage()

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="border-b border-line py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="projetos-titulo"
            index={2}
            kicker={t('projects.kicker')}
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
          />
        </Reveal>

        <ol className="relative mt-14 md:mt-20">
          {/* linha vertical: à esquerda no mobile, centralizada no desktop */}
          <span
            className="absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-accent via-line to-transparent md:left-1/2"
            aria-hidden
          />

          {projectsTimeline.map((project, i) => {
            const onLeft = i % 2 === 0
            const date = formatMonth(project.date, lang)

            return (
              <li
                key={project.id}
                className="relative mb-14 grid grid-cols-[40px_1fr] gap-x-5 last:mb-0 md:grid-cols-[1fr_80px_1fr] md:gap-x-0"
              >
                <div className="col-start-1 row-start-1 md:col-start-2">
                  <span className="relative z-10 mx-auto grid size-10 place-items-center rounded-full border-2 border-accent bg-bg font-display text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                </div>

                <p
                  className={`col-start-2 row-start-1 self-center font-display text-sm font-semibold text-dim md:self-start md:pt-2.5 ${
                    onLeft ? 'md:col-start-3 md:pl-2' : 'md:col-start-1 md:pr-2 md:text-right'
                  }`}
                >
                  <time dateTime={project.date}>{date}</time>
                </p>

                <Reveal
                  x={onLeft ? -32 : 32}
                  className={`col-start-2 row-start-2 mt-4 md:row-start-1 md:mt-0 ${
                    onLeft ? 'md:col-start-1' : 'md:col-start-3'
                  }`}
                >
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
