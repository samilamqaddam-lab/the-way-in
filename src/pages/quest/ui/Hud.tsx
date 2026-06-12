import { useEffect, useState } from 'react'
import type { Dir } from '../engine/Game'
import { SHARDS } from '../data/script'
import { SHARDS_FR } from '../data/script.fr'
import { pick, useLocale } from '../../../i18n/locale'

interface HudProps {
  collected: Set<string>
  /** tap an empty slot → the game points you there */
  onGuide: (shardId: string) => void
}

/** Shard slots, in-screen — tap an empty one and an arrow shows the way. */
export function ShardBar({ collected, onGuide }: HudProps) {
  const locale = useLocale()
  const shards = pick(locale, SHARDS, SHARDS_FR)
  const fr = locale === 'fr'
  return (
    <div
      className="flex items-center gap-1 rounded-xl border-2 border-ink/60 bg-plum-deep/80 p-1"
      role="status"
      aria-label={
        fr
          ? `Éclats de savoir : ${collected.size} sur ${shards.length}. Tape une case vide pour avoir le chemin.`
          : `Knowledge shards: ${collected.size} of ${shards.length}. Tap an empty slot to get directions.`
      }
    >
      {shards.map((s) => {
        const has = collected.has(s.id)
        return (
          <button
            key={s.id}
            type="button"
            title={has ? `✓ ${s.title}` : fr ? `Où trouver « ${s.title} » ?` : `Where do I get “${s.title}”?`}
            aria-label={has ? (fr ? `Récupéré : ${s.title}` : `Collected: ${s.title}`) : fr ? `Montrer le chemin vers : ${s.title}` : `Show the way to: ${s.title}`}
            onClick={() => !has && onGuide(s.id)}
            className={`grid h-7 w-7 place-items-center rounded-md border-2 text-sm ${
              has ? 'border-ink bg-sun' : 'cursor-pointer border-on-plum-dim/50 bg-plum text-on-plum-dim hover:border-sun'
            }`}
          >
            <span aria-hidden="true">{has ? s.emoji : '?'}</span>
          </button>
        )
      })}
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
  const fr = useLocale() === 'fr'
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
    'pointer-events-auto grid h-12 w-12 place-items-center rounded-xl border-[2.5px] border-ink bg-paper/90 text-lg font-bold shadow-pop-sm select-none touch-none active:translate-y-0.5'
  if (!touchy) return null
  return (
    <div className="pointer-events-none absolute inset-x-2 bottom-2 z-10 flex items-end justify-between">
      <div className="grid grid-cols-3 gap-1.5">
        <span />
        <button type="button" className={btn} aria-label={fr ? 'Aller en haut' : 'Walk up'} {...hold('up')}>
          ▲
        </button>
        <span />
        <button type="button" className={btn} aria-label={fr ? 'Aller à gauche' : 'Walk left'} {...hold('left')}>
          ◀
        </button>
        <button type="button" className={btn} aria-label={fr ? 'Aller en bas' : 'Walk down'} {...hold('down')}>
          ▼
        </button>
        <button type="button" className={btn} aria-label={fr ? 'Aller à droite' : 'Walk right'} {...hold('right')}>
          ▶
        </button>
      </div>
      <button
        type="button"
        onClick={onAction}
        aria-label={fr ? 'Parler / interagir' : 'Talk / interact'}
        className="pointer-events-auto grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink bg-tangerine/95 font-display text-xl font-extrabold text-ink shadow-pop select-none active:translate-y-0.5"
      >
        A
      </button>
    </div>
  )
}
