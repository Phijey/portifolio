interface SectionHeadingProps {
  index: number
  kicker: string
  title: string
  subtitle?: string
  id?: string
}

export function SectionHeading({ index, kicker, title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="font-display text-sm font-semibold tracking-[0.18em] text-accent uppercase">
        {String(index).padStart(2, '0')} — {kicker}
      </p>
      <h2 id={id} className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-dim">{subtitle}</p>}
    </div>
  )
}
