import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SubpageShell } from '../../components/SubpageShell'
import { CopyButton } from '../../components/CopyButton'
import { Pip } from '../../components/Pip'
import { fadeUp, popSpring, staggerKids, viewportOnce } from '../../lib/motion'
import { pick, useLocale } from '../../i18n/locale'
import { glossary } from '../../data/glossary'
import { glossaryFr } from '../../data/fr/glossary'
import { HELP_COPY } from './Page.copy'

function Accordion({ emoji, q, children }: { emoji: string; q: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <motion.div variants={fadeUp} className="card-pop overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3.5 p-5 text-left"
      >
        <span className="text-2xl" aria-hidden="true">
          {emoji}
        </span>
        <span className="flex-1 font-display text-lg font-bold leading-snug">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-bold transition-transform ${
            open ? 'rotate-45 bg-sun' : 'bg-paper'
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={popSpring}
            className="space-y-3 border-t-[2.5px] border-line px-5 pb-5 pt-4 leading-relaxed text-ink-soft [&_strong]:text-ink"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function HelpPage() {
  const locale = useLocale()
  const t = HELP_COPY[locale]
  const dict = pick(locale, glossary, glossaryFr)
  return (
    <SubpageShell page="help" eyebrow={t.eyebrow} title={t.title} kicker={t.kicker} pip={<Pip size={60} look="ahead" bob />}>
      <section className="px-5">
        <motion.div
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-12 grid w-full max-w-3xl gap-4"
        >
          {t.accordions.map((a) => (
            <Accordion key={a.emoji} emoji={a.emoji} q={a.q}>
              {a.body}
            </Accordion>
          ))}
        </motion.div>

        {/* the secret thesis */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="card-pop mx-auto mt-16 max-w-3xl bg-paper-deep p-6 text-center md:p-8"
        >
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">{t.thesisTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t.thesisBody}</p>
          <pre className="prompt-scroll mx-auto mt-5 max-w-xl whitespace-pre-wrap rounded-xl border-[2.5px] border-ink bg-paper p-3.5 text-left font-mono text-[0.78rem] leading-relaxed">
            {t.helpDeskPrompt}
          </pre>
          <CopyButton text={t.helpDeskPrompt} label={t.copyLabel} className="mx-auto mt-4 max-w-xl" />
        </motion.div>

        {/* the little dictionary */}
        <div className="mx-auto mt-20 w-full max-w-5xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center font-display text-2xl font-extrabold md:text-3xl"
          >
            {t.dictTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-2 text-center text-ink-soft"
          >
            {t.dictSub}
          </motion.p>
          <motion.div
            variants={staggerKids}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Object.entries(dict).map(([key, entry]) => (
              <motion.div key={key} variants={fadeUp} className="card-pop p-4">
                <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-tangerine-deep">
                  {entry.term}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{entry.def}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </SubpageShell>
  )
}
