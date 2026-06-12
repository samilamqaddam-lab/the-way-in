import type { ReactNode } from 'react'

type StickerColor = 'sun' | 'tangerine' | 'grape' | 'leaf' | 'sky' | 'blush' | 'paper'

const COLORS: Record<StickerColor, string> = {
  sun: 'bg-sun text-ink',
  tangerine: 'bg-tangerine text-ink',
  grape: 'bg-grape text-paper',
  leaf: 'bg-leaf text-ink',
  sky: 'bg-sky text-ink',
  blush: 'bg-blush text-ink',
  paper: 'bg-paper text-ink',
}

interface StickerProps {
  color?: StickerColor
  rotate?: number
  className?: string
  children: ReactNode
}

/** A little rotated badge, like a sticker slapped on the page. */
export function Sticker({ color = 'sun', rotate = 0, className = '', children }: StickerProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-mono text-[0.72rem] font-bold uppercase tracking-[0.13em] border-[3px] border-ink rounded-full px-3 py-1 shadow-pop-sm ${COLORS[color]} ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {children}
    </span>
  )
}
