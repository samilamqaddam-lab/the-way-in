import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { glossary } from '../data/glossary'
import type { GlossaryKey } from '../data/glossary'
import { popSpring } from '../lib/motion'

interface GlossaryTipProps {
  k: GlossaryKey
  children: ReactNode
}

type Align = 'left' | 'center' | 'right'

const CARD_W = 272

/**
 * A dotted-underline word that opens a one-sentence plain definition on
 * tap/click. Toggletip pattern: real button, Escape and outside-tap close,
 * definition announced politely to screen readers.
 */
export function GlossaryTip({ k, children }: GlossaryTipProps) {
  const entry = glossary[k]
  const [open, setOpen] = useState(false)
  const [align, setAlign] = useState<Align>('center')
  const wrapRef = useRef<HTMLSpanElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const toggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const mid = rect.left + rect.width / 2
      if (mid < CARD_W / 2 + 14) setAlign('left')
      else if (window.innerWidth - mid < CARD_W / 2 + 14) setAlign('right')
      else setAlign('center')
    }
    setOpen((o) => !o)
  }

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const alignClass = align === 'left' ? 'left-[-0.5rem]' : align === 'right' ? 'right-[-0.5rem]' : 'left-1/2'
  const slide = align === 'center' ? '-50%' : '0%'

  return (
    <span ref={wrapRef} className="relative inline-block">
      <button ref={btnRef} type="button" className="tip-word" aria-expanded={open} onClick={toggle}>
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            role="note"
            initial={{ opacity: 0, y: 8, scale: 0.94, x: slide }}
            animate={{ opacity: 1, y: 0, scale: 1, x: slide }}
            exit={{ opacity: 0, y: 6, scale: 0.96, x: slide }}
            transition={popSpring}
            className={`absolute z-30 bottom-full mb-2.5 block w-[17rem] max-w-[calc(100vw-2.5rem)] card-pop p-3.5 text-left text-[0.95rem] leading-snug font-normal normal-case tracking-normal ${alignClass}`}
          >
            <span className="block font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-tangerine-deep mb-1">
              {entry.term}
            </span>
            {entry.def}
          </motion.span>
        )}
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {open ? `${entry.term}: ${entry.def}` : ''}
      </span>
    </span>
  )
}
