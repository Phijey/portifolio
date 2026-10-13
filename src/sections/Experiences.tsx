import type { IconType } from 'react-icons'
import { HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineCode } from 'react-icons/hi'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { experiences, type ExperienceType } from '../data/experiences'
import type { TranslationKey } from '../i18n/translations'
import { useLanguage } from '../i18n/useLanguage'

const typeInfo: Record<ExperienceType, { icon: IconType; label: TranslationKey }> = {
  education: { icon: HiOutlineAcademicCap, label: 'experience.type.education' },
  project: { icon: HiOutlineCode, label: 'experience.type.project' },
  course: { icon: HiOutlineBadgeCheck, label: 'experience.type.course' },
}

export function Experiences() {
  const { t, l } = useLanguage()

  return (
    <section id="experiencias" aria-labelledby="experiencias-titulo" className="border-b border-line py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="experiencias-titulo"
            index={3}
            kicker={t('experience.kicker')}
            title={t('experience.title')}
          />
        </Reveal>

        <ul className="mt-12 grid gap-4">
          {experiences.map((item, i) => {
            const { icon: Icon, label } = typeInfo[item.type]
            const period =
              item.end === undefined
                ? `${item.start} — ${t('experience.present')}`
                : item.start === item.end
                  ? item.start
                  : `${item.start} — ${item.end}`

            return (
              <li key={item.id}>
                <Reveal delay={i * 0.06}>
                  <article className="card grid gap-4 p-5 transition-colors hover:border-accent/50 md:grid-cols-[56px_1fr_auto] md:gap-6 md:p-7">
                    <div className="flex items-center justify-between md:block">
                      <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent md:size-14">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <span className="chip md:hidden">{period}</span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold tracking-wider text-faint uppercase">{t(label)}</p>
                      <h3 className="mt-1 font-display text-xl font-bold">{item.institution}</h3>
                      <p className="mt-1 text-sm font-medium text-accent">{l(item.role)}</p>
                      <p className="mt-3 text-sm leading-relaxed text-dim">{l(item.description)}</p>
                      {item.tags && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <li key={tag} className="chip">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <span className="chip hidden self-start font-semibold text-ink md:inline-flex">{period}</span>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
