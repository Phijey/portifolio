import { useEffect, useState } from 'react'

/**
 * Retorna o id da seção que ocupa a faixa central da tela,
 * usado para destacar o link correspondente no menu.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      // considera "ativa" a seção que cruza a faixa entre 35% e 45% da altura da tela
      { rootMargin: '-35% 0px -55% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
