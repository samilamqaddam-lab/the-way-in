import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { GlossaryTip } from '../components/GlossaryTip'
import { Sticker } from '../components/Sticker'
import { fadeUp, popSpring, staggerKids, viewportOnce } from '../lib/motion'
import { tools } from '../data/tools'
import type { Tool } from '../data/tools'

type Step = 'q1' | 'q2' | 'result'

interface QuizResult {
  ids: Tool['id'][]
  names: string
  reason: string
}

const RESULTS: Record<string, QuizResult> = {
  claude: {
    ids: ['claude-code'],
    names: 'Claude Code',
    reason: 'You already have it — it comes included in Claude Pro, as a friendly app. You could start tonight.',
  },
  plus: {
    ids: ['codex'],
    names: 'OpenAI Codex',
    reason: 'You already have it — it comes included in ChatGPT Plus and lives right inside ChatGPT.',
  },
  easiest: {
    ids: ['claude-code', 'codex'],
    names: 'Claude Code or Codex',
    reason:
      "Both come as friendly apps, included with their chat subscriptions (Claude Pro or ChatGPT Plus). Pick whichever assistant you'd rather talk to every day.",
  },
  free: {
    ids: ['opencode'],
    names: 'OpenCode',
    reason: 'The tool itself is free — you bring the AI: a subscription you already have, or your own API key.',
  },
}

/** Rich blurbs: same facts as data/tools.ts, with glossary tips woven in. */
const RICH_BLURBS: Partial<Record<Tool['id'], ReactNode>> = {
  opencode: (
    <>
      A free, <GlossaryTip k="openSource">open-source</GlossaryTip> coding agent. The tool costs nothing — you bring
      the AI: a Claude or ChatGPT subscription you already have, or your own{' '}
      <GlossaryTip k="apiKey">API keys</GlossaryTip>.
    </>
  ),
  hermes: (
    <>
      A free, open-source agent that is <GlossaryTip k="selfHosted">self-hosted</GlossaryTip> — you run it yourself.
      Maximum freedom, a bit more setup.
    </>
  ),
}

function ToolCard({ tool, highlighted, index }: { tool: Tool; highlighted: boolean; index: number }) {
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
          our pick for you
        </Sticker>
      )}
      {tool.forLater && (
        <Sticker color="grape" rotate={6} className="absolute -top-3.5 right-5">
          for later
        </Sticker>
      )}
      <header>
        <h3 className="font-display text-2xl font-extrabold leading-tight">{tool.name}</h3>
        <p className="mt-0.5 font-mono text-xs text-ink-soft">{tool.by}</p>
      </header>
      <p className="leading-snug">{RICH_BLURBS[tool.id] ?? tool.blurb}</p>
      <dl className="space-y-2 text-[0.95rem]">
        <div className="flex gap-3">
          <dt className="w-12 shrink-0 pt-0.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
            lives
          </dt>
          <dd className="leading-snug">{tool.lives}</dd>
        </div>
        <div className="flex items-center gap-3">
          <dt className="w-12 shrink-0 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
            costs
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
          Visit site ↗
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
  const [step, setStep] = useState<Step>('q1')
  const [result, setResult] = useState<QuizResult | null>(null)

  const finish = (key: keyof typeof RESULTS) => {
    setResult(RESULTS[key])
    setStep('result')
  }

  const restart = () => {
    setResult(null)
    setStep('q1')
  }

  return (
    <SectionShell
      id="pick-your-door"
      eyebrow="tools"
      title="Pick your door."
      kicker="Four good tools, no wrong answers — and we earn nothing from these links."
    >
      {/* the 30-second matchmaker */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="card-pop mx-auto mt-12 max-w-2xl overflow-hidden p-6 md:p-8"
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
            the 30-second matchmaker
          </p>
          <p className="hidden font-mono text-xs text-ink-soft sm:block">or just browse below ↓</p>
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
              <p className="mt-3 font-display text-xl font-bold md:text-2xl">Do you already pay for one of these?</p>
              <div className="mt-5 flex flex-col gap-3">
                <button type="button" className="btn-pop w-full" onClick={() => finish('claude')}>
                  Claude Pro
                </button>
                <button type="button" className="btn-pop w-full" onClick={() => finish('plus')}>
                  ChatGPT Plus
                </button>
                <button type="button" className="btn-pop w-full" onClick={() => setStep('q2')}>
                  Neither — or not sure
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
              <p className="mt-3 font-display text-xl font-bold md:text-2xl">
                What matters most for your first try?
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button type="button" className="btn-pop w-full" onClick={() => finish('easiest')}>
                  The easiest possible start
                </button>
                <button type="button" className="btn-pop w-full" onClick={() => finish('free')}>
                  Free — I don't mind a little setup
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
                our pick for you
              </Sticker>
              <p className="mt-3 font-display text-2xl font-extrabold md:text-3xl">{result.names}</p>
              <p className="mx-auto mt-2 max-w-md leading-snug text-ink-soft">{result.reason}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                <a href={`#tool-${result.ids[0]}`} className="btn-pop btn-ink text-sm">
                  See the card ↓
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="font-mono text-xs underline decoration-2 underline-offset-4 hover:text-tangerine"
                >
                  ↺ start over
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
        {tools.map((tool, i) => (
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
        In plain words: two of these come included with chat subscriptions you might already pay for. Two are free.
        Want every way in, side by side?{' '}
        <a href="./tools/" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
          the Toolshed ↗
        </a>
      </motion.p>
    </SectionShell>
  )
}
