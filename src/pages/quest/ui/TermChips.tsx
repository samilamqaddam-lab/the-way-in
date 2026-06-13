import { useState } from 'react'
import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'
import { pick, useLocale } from '../../../i18n/locale'
import { glossary } from '../../../data/glossary'
import { glossaryFr } from '../../../data/fr/glossary'
import type { GlossaryKey } from '../../../data/glossary'

/**
 * Tap-to-explain chips for the technical words on the current screen.
 * Used by both the dialogue box and the boss quiz. Lives outside any
 * click-to-advance control, and the definition opens inline (no popup)
 * so it never clips the game frame. Locale-aware via the shared glossary.
 * The `data-terms` hook lets the dialogue's keyboard handler skip advancing
 * while a chip is focused.
 */
export function TermChips({ terms }: { terms: GlossaryKey[] }) {
  const locale = useLocale()
  const dict = pick(locale, glossary, glossaryFr)
  const [open, setOpen] = useState<GlossaryKey | null>(null)

  return (
    <div className="mt-2" data-terms>
      {open && (
        <motion.div
          key={open}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          role="note"
          className="mb-2 rounded-lg border-2 border-ink bg-paper-deep p-2.5 text-left"
        >
          <span className="block font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-tangerine-deep">
            {dict[open].term}
          </span>
          <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink">{dict[open].def}</span>
        </motion.div>
      )}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
          {locale === 'fr' ? 'nouveaux mots' : 'new words'}
        </span>
        {terms.map((k) => (
          <button
            key={k}
            type="button"
            aria-expanded={open === k}
            onClick={() => setOpen((o) => (o === k ? null : k))}
            className={`rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[0.62rem] font-bold transition-colors ${
              open === k ? 'bg-sun' : 'bg-paper hover:bg-paper-deep'
            }`}
          >
            <span aria-hidden="true">ⓘ </span>
            {dict[k].term}
          </button>
        ))}
      </div>
    </div>
  )
}
