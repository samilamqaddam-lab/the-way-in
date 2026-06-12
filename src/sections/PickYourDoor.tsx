import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { Sticker } from '../components/Sticker'
import { fadeUp, popSpring, staggerKids, viewportOnce } from '../lib/motion'
import { pick, useLocale } from '../i18n/locale'
import { tools } from '../data/tools'
import { toolsFr } from '../data/fr/tools'
import type { Tool } from '../data/tools'
import { PICK_YOUR_DOOR_COPY } from './PickYourDoor.copy'

type Step = 'q1' | 'q2' | 'result'
type ResultKey = 'claude' | 'plus' | 'easiest' | 'free'

/** which tool cards each quiz outcome highlights — language-independent */
const RESULT_IDS: Record<ResultKey, Tool['id'][]> = {
  claude: ['claude-code'],
  plus: ['codex'],
  easiest: ['claude-code', 'codex'],
  free: ['opencode'],
}

function ToolCard({ tool, highlighted, index }: { tool: Tool; highlighted: boolean; index: number }) {
  const t = PICK_YOUR_DOOR_COPY[useLocale()]
  return (
    <motion.article
      id={`tool-${tool.id}`}
      variants={fadeUp}
      className={`card-pop relative flex scroll-mt-28 flex-col gap-3 p-6 pt-7 ${
        highlighted ? 'outline outline-4 outline-offset-4 outline-tangerine' : ''
      }`}
      style={{ rotate: `${[-0.8, 0.7, -0.5, 0.9][index]}deg` }}
    >
      {highlighted && (
        <Sticker color="tangerine" rotate={-5} className="absolute -top-3.5 left-5">
          {t.pickSticker}
        </Sticker>
      )}
      {tool.forLater && (
        <Sticker color="grape" rotate={6} className="absolute -top-3.5 right-5">
          {t.laterSticker}
        </Sticker>
      )}
      <header>
        <h3 className="font-display text-2xl font-extrabold leading-tight">{tool.name}</h3>
        <p className="mt-0.5 font-mono text-xs text-ink-soft">{tool.by}</p>
      </header>
      <p className="leading-snug">{t.richBlurbs[tool.id] ?? tool.blurb}</p>
      <dl className="space-y-2 text-[0.95rem]">
        <div className="flex gap-3">
          <dt className="w-12 shrink-0 pt-0.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
            {t.livesLabel}
          </dt>
          <dd className="leading-snug">{tool.lives}</dd>
        </div>
        <div className="flex items-center gap-3">
          <dt className="w-12 shrink-0 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
            {t.costsLabel}
          </dt>
          <dd>
            <span
              className={`inline-block rounded-full border-2 border-ink px-2.5 py-0.5 text-xs font-bold ${
                tool.costTone === 'included' ? 'bg-sun' : 'bg-leaf text-paper'
              }`}
            >
              {tool.cost}
            </span>
          </dd>
        </div>
      </dl>
      <p className="text-[0.95rem] text-ink-soft">{tool.goodIf}</p>
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
        <a className="btn-pop btn-ink text-sm" href={tool.url} target="_blank" rel="noreferrer">
          {t.visitSite}
        </a>
        {tool.docsUrl && (
          <a
            className="font-mono text-xs underline decoration-2 underline-offset-4 hover:text-tangerine"
            href={tool.docsUrl}
            target="_blank"
            rel="noreferrer"
          >
            {tool.docsLabel} ↗
          </a>
        )}
      </div>
    </motion.article>
  )
}

export function PickYourDoor() {
  const locale = useLocale()
  const t = PICK_YOUR_DOOR_COPY[locale]
  const localTools = pick(locale, tools, toolsFr)
  const [step, setStep] = useState<Step>('q1')
  const [resultKey, setResultKey] = useState<ResultKey | null>(null)
  const result = resultKey ? { ids: RESULT_IDS[resultKey], ...t.results[resultKey] } : null

  const finish = (key: ResultKey) => {
    setResultKey(key)
    setStep('result')
  }

  const restart = () => {
    setResultKey(null)
    setStep('q1')
  }

  return (
    <SectionShell id="pick-your-door" eyebrow={t.eyebrow} title={t.title} kicker={t.kicker}>
      {/* the 30-second matchmaker */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="card-pop mx-auto mt-12 max-w-2xl overflow-hidden p-6 md:p-8"
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">{t.matchmaker}</p>
          <p className="hidden font-mono text-xs text-ink-soft sm:block">{t.orBrowse}</p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {step === 'q1' && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -26 }}
              transition={popSpring}
            >
              <p className="mt-3 font-display text-xl font-bold md:text-2xl">{t.q1}</p>
              <div className="mt-5 flex flex-col gap-3">
                <button type="button" className="btn-pop w-full" onClick={() => finish('claude')}>
                  {t.q1Claude}
                </button>
                <button type="button" className="btn-pop w-full" onClick={() => finish('plus')}>
                  {t.q1Plus}
                </button>
                <button type="button" className="btn-pop w-full" onClick={() => setStep('q2')}>
                  {t.q1Neither}
                </button>
              </div>
            </motion.div>
          )}
          {step === 'q2' && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -26 }}
              transition={popSpring}
            >
              <p className="mt-3 font-display text-xl font-bold md:text-2xl">{t.q2}</p>
              <div className="mt-5 flex flex-col gap-3">
                <button type="button" className="btn-pop w-full" onClick={() => finish('easiest')}>
                  {t.q2Easiest}
                </button>
                <button type="button" className="btn-pop w-full" onClick={() => finish('free')}>
                  {t.q2Free}
                </button>
              </div>
            </motion.div>
          )}
          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={popSpring}
              className="mt-4 text-center"
            >
              <Sticker color="tangerine" rotate={-3}>
                {t.pickSticker}
              </Sticker>
              <p className="mt-3 font-display text-2xl font-extrabold md:text-3xl">{result.names}</p>
              <p className="mx-auto mt-2 max-w-md leading-snug text-ink-soft">{result.reason}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                <a href={`#tool-${result.ids[0]}`} className="btn-pop btn-ink text-sm">
                  {t.seeCard}
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="font-mono text-xs underline decoration-2 underline-offset-4 hover:text-tangerine"
                >
                  {t.startOver}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={staggerKids}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {localTools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} highlighted={result?.ids.includes(tool.id) ?? false} />
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 text-center text-ink-soft"
      >
        {t.bottomA}
        <a href="./tools/" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
          {t.bottomLink}
        </a>
      </motion.p>
    </SectionShell>
  )
}
