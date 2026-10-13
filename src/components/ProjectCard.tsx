import { useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { HiOutlineArrowsExpand, HiOutlineUserGroup } from 'react-icons/hi'
import type { Project } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage'
import { Gallery } from './Gallery'

const VISIBLE_THUMBS = 4

export function ProjectCard({ project }: { project: Project }) {
  const { t, l } = useLanguage()
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [cover, ...rest] = project.images
  const thumbs = rest.slice(0, VISIBLE_THUMBS)
  const hidden = rest.length - thumbs.length

  return (
    <article className="card group overflow-hidden transition-colors hover:border-accent/50">
      <button
        type="button"
        onClick={() => setGalleryIndex(0)}
        aria-label={`${t('projects.openGallery')}: ${project.name}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-2"
      >
        <img
          src={cover.src}
          alt={l(cover.caption)}
          loading="lazy"
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-bg/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
          <HiOutlineArrowsExpand aria-hidden />
          {project.images.length} {t('projects.screens')}
        </span>
      </button>

      {thumbs.length > 0 && (
        <div className="flex gap-2 px-5 pt-4">
          {thumbs.map((image, i) => {
            const isLast = i === thumbs.length - 1 && hidden > 0
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setGalleryIndex(i + 1)}
                aria-label={l(image.caption)}
                className="relative h-12 flex-1 overflow-hidden rounded-md border border-line bg-surface-2 transition-colors hover:border-accent"
              >
                <img src={image.src} alt="" loading="lazy" className="size-full object-cover object-top" />
                {isLast && (
                  <span className="absolute inset-0 grid place-items-center bg-bg/75 text-sm font-semibold">
                    +{hidden}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-2xl font-bold tracking-tight">{project.name}</h3>
          {project.team && (
            <span className="chip border-accent/30 bg-accent-soft text-accent">
              <HiOutlineUserGroup className="mr-1.5" aria-hidden />
              {t('projects.team')}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-dim">{l(project.description)}</p>

        {project.team && (
          <p className="mt-4 rounded-lg border-l-2 border-accent bg-surface-2 px-4 py-3 text-sm">
            <span className="font-semibold text-ink">{t('projects.myRole')}: </span>
            <span className="text-dim">{l(project.team.myRole)}</span>
          </p>
        )}

        <ul className="mt-4 space-y-1.5 text-sm text-dim">
          {l(project.highlights).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <a
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost mt-6 w-full sm:w-auto"
        >
          <FaGithub aria-hidden />
          {t('projects.repo')}
          <span aria-hidden>↗</span>
        </a>
      </div>

      <Gallery title={project.name} images={project.images} index={galleryIndex} onChange={setGalleryIndex} />
    </article>
  )
}
