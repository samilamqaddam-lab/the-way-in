import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useTypewriter } from '../../../lib/useTypewriter'
import { popSpring } from '../../../lib/motion'
import type { DialogRun } from '../data/script'

const TONE_BG: Record<string, string> = {
  ink: 'bg-ink text-paper',
  tangerine: 'bg-tangerine text-ink',
  sun: 'bg-sun text-ink',
  leaf: 'bg-leaf text-ink',
  sky: 'bg-sky text-ink',
  grape: 'bg-grape text-paper',
  blush: 'bg-blush text-ink',
  plum: 'bg-plum text-paper',
}

interface DialogueProps {
  run: DialogRun
  onClose: () => void
}

/** Pokémon-style bottom box: nameplate, typewriter text, A to advance. */
export function Dialogue({ run, onClose }: DialogueProps) {
  const [page, setPage] = useState(0)
  const pg = run.pages[page]
  const last = page === run.pages.length - 1
  const { shown, done, skip } = useTypewriter(pg.text, { cps: 65 })

  const advance = () => {
    if (!done) skip()
    else if (!last) setPage((p) => p + 1)
    else onClose()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyE') {
        e.preventDefault()
        advance()
      }
      if (e.code === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, last, page])

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={popSpring}
      className="absolute inset-x-2 bottom-2 z-20 sm:inset-x-4 sm:bottom-3"
    >
      <button
        type="button"
        onClick={advance}
        className="block w-full cursor-pointer rounded-xl border-[3px] border-ink bg-paper p-3.5 text-left shadow-pop sm:p-4"
        aria-label="Advance dialogue"
      >
        <span
          className={`inline-block rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] ${
            TONE_BG[pg.tone ?? 'ink']
          }`}
        >
          {pg.speaker}
        </span>
        <span className="mt-2 block min-h-[3.4rem] whitespace-pre-line text-[0.95rem] leading-snug">
          <span aria-hidden="true">{shown}</span>
          <span className="sr-only">{pg.text}</span>
        </span>
        <span className="flex items-center justify-between">
          <span className="font-mono text-[0.62rem] text-ink-soft">
            {page + 1}/{run.pages.length}
          </span>
          {done && (
            <span className="anim-ambient font-mono text-sm text-tangerine-deep" style={{ animation: 'bob 1.2s ease-in-out infinite' }} aria-hidden="true">
              {last ? '✓' : '▼'}
            </span>
          )}
        </span>
      </button>
      {done && last && run.links && (
        <div className="mt-2 flex flex-wrap gap-2">
          {run.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target={l.url.startsWith('http') ? '_blank' : undefined}
              rel={l.url.startsWith('http') ? 'noreferrer' : undefined}
              className="rounded-full border-[2.5px] border-ink bg-sun px-3 py-1 text-xs font-bold shadow-pop-sm"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
