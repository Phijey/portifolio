import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi'
import type { ProjectImage } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage'

interface GalleryProps {
  title: string
  images: ProjectImage[]
  index: number | null
  onChange: (index: number | null) => void
}

export function Gallery({ title, images, index, onChange }: GalleryProps) {
  const { t, l } = useLanguage()
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null

  const go = useCallback(
    (step: number) => {
      if (index === null) return
      onChange((index + step + images.length) % images.length)
    },
    [index, images.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [open, go, onChange])

  const current = index !== null ? images[index] : null

  // portal: o modal fica fora dos cartões animados, cujo transform quebraria o position: fixed
  return createPortal(
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — ${l(current.caption)}`}
          className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container-page flex h-16 shrink-0 items-center justify-between gap-4">
            <p className="truncate text-sm">
              <span className="font-semibold">{title}</span>
              <span className="text-dim">
                {' '}
                · {l(current.caption)} · {index + 1} {t('gallery.of')} {images.length}
              </span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onChange(null)}
              aria-label={t('gallery.close')}
              className="grid size-10 shrink-0 place-items-center rounded-lg border border-line hover:border-accent hover:text-accent"
            >
              <HiX className="size-5" />
            </button>
          </div>

          {/* área rolável: prints de página inteira podem ser bem mais altos que a tela */}
          <div className="relative min-h-0 flex-1 overflow-y-auto" onClick={() => onChange(null)}>
            <motion.img
              key={current.src}
              src={current.src}
              alt={l(current.caption)}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mx-auto block w-auto max-w-[min(100%,72rem)] px-4 pb-6"
            />
          </div>

          {images.length > 1 && (
            <div className="container-page flex shrink-0 items-center justify-center gap-3 border-t border-line py-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t('gallery.prev')}
                className="grid size-10 place-items-center rounded-lg border border-line hover:border-accent hover:text-accent"
              >
                <HiChevronLeft className="size-5" />
              </button>
              <div className="flex max-w-full gap-1.5 overflow-x-auto py-1">
                {images.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => onChange(i)}
                    aria-label={l(image.caption)}
                    aria-current={i === index ? 'true' : undefined}
                    className={`h-10 w-14 shrink-0 overflow-hidden rounded-md border-2 transition-opacity ${
                      i === index ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={image.src} alt="" className="size-full object-cover object-top" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t('gallery.next')}
                className="grid size-10 place-items-center rounded-lg border border-line hover:border-accent hover:text-accent"
              >
                <HiChevronRight className="size-5" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
