interface MarqueeProps {
  items: string[]
  className?: string
}

function Row({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center font-mono text-sm py-3">
          <span className="px-5">{item}</span>
          <span className="text-sun" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

/**
 * Infinite ticker strip. Pure CSS transform loop; under reduced motion the
 * animation stops and the first row simply sits still.
 */
export function Marquee({ items, className = '' }: MarqueeProps) {
  return (
    <div className={`border-y-[3px] border-ink bg-ink text-paper overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee anim-ambient">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  )
}
