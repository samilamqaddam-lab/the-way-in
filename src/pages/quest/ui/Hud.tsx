import { useEffect, useState } from 'react'
import type { Dir } from '../engine/Game'
import { SHARDS } from '../data/script'

interface HudProps {
  collected: Set<string>
}

/** Shard slots — the knowledge you're carrying. */
export function ShardBar({ collected }: HudProps) {
  return (
    <div className="flex items-center gap-1.5" role="status" aria-label={`Knowledge shards: ${collected.size} of ${SHARDS.length}`}>
      {SHARDS.map((s) => (
        <span
          key={s.id}
          title={s.title}
          className={`grid h-8 w-8 place-items-center rounded-lg border-[2.5px] border-ink text-base ${
            collected.has(s.id) ? 'bg-sun' : 'bg-paper-deep opacity-50'
          }`}
        >
          <span aria-hidden="true">{collected.has(s.id) ? s.emoji : '·'}</span>
        </span>
      ))}
    </div>
  )
}

interface PadProps {
  onDir: (dir: Dir, down: boolean) => void
  onAction: () => void
}

/** Touch controls — shown when the device can touch. */
export function TouchPad({ onDir, onAction }: PadProps) {
  const [touchy, setTouchy] = useState(false)
  useEffect(() => {
    setTouchy(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  const hold = (dir: Dir) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      onDir(dir, true)
    },
    onPointerUp: () => onDir(dir, false),
    onPointerCancel: () => onDir(dir, false),
    onPointerLeave: () => onDir(dir, false),
  })
  const btn =
    'grid h-12 w-12 place-items-center rounded-xl border-[2.5px] border-ink bg-paper text-lg font-bold shadow-pop-sm select-none touch-none active:translate-y-0.5'
  if (!touchy) return null
  return (
    <div className="mt-3 flex items-end justify-between">
      <div className="grid grid-cols-3 gap-1.5">
        <span />
        <button type="button" className={btn} aria-label="Walk up" {...hold('up')}>
          ▲
        </button>
        <span />
        <button type="button" className={btn} aria-label="Walk left" {...hold('left')}>
          ◀
        </button>
        <button type="button" className={btn} aria-label="Walk down" {...hold('down')}>
          ▼
        </button>
        <button type="button" className={btn} aria-label="Walk right" {...hold('right')}>
          ▶
        </button>
      </div>
      <button
        type="button"
        onClick={onAction}
        aria-label="Talk / interact"
        className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink bg-tangerine font-display text-xl font-extrabold text-ink shadow-pop select-none active:translate-y-0.5"
      >
        A
      </button>
    </div>
  )
}
