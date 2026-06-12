import { motion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { CopyButton } from '../components/CopyButton'
import { Sticker } from '../components/Sticker'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'
import { starterPrompts } from '../data/prompts'
import type { StarterPrompt } from '../data/prompts'

const STEPS = [
  {
    n: '1',
    color: 'sun' as const,
    text: (
      <>
        <strong>Open your tool.</strong> The app or the terminal — both are fine.
      </>
    ),
  },
  {
    n: '2',
    color: 'blush' as const,
    text: (
      <>
        <strong>Paste the prompt.</strong> It's a normal message, nothing special.
      </>
    ),
  },
  {
    n: '3',
    color: 'sky' as const,
    text: (
      <>
        <strong>Answer its questions.</strong> It asks before changing anything — and “no” is always allowed.
      </>
    ),
  },
]

/** Tiny hand-built mockups of what each prompt produces. */
function Thumb({ id }: { id: StarterPrompt['id'] }) {
  if (id === 'about-me') {
    return (
      <div className="flex h-full items-center justify-center gap-4 bg-[#FFE8D6]">
        <span className="grid h-12 w-12 place-items-center rounded-full border-[2.5px] border-ink bg-tangerine text-xl" aria-hidden="true">
          🙂
        </span>
        <div className="space-y-1.5">
          <span className="block h-2.5 w-24 rounded-full bg-ink" />
          <span className="block h-2 w-16 rounded-full bg-ink/50" />
          <span className="mt-2 flex gap-1">
            <span className="h-3.5 w-9 rounded-full border-2 border-ink bg-sun" />
            <span className="h-3.5 w-9 rounded-full border-2 border-ink bg-blush" />
            <span className="h-3.5 w-9 rounded-full border-2 border-ink bg-sky" />
          </span>
        </div>
      </div>
    )
  }
  if (id === 'presentation') {
    return (
      <div className="relative flex h-full items-center justify-center bg-[#EDE8FF]">
        <span className="absolute h-20 w-32 -rotate-6 rounded-lg border-[2.5px] border-ink bg-white shadow-pop-sm" />
        <span className="absolute h-20 w-32 rotate-3 rounded-lg border-[2.5px] border-ink bg-sun shadow-pop-sm" />
        <span className="relative grid h-20 w-32 place-items-center rounded-lg border-[2.5px] border-ink bg-white shadow-pop-sm">
          <span className="block h-2.5 w-20 rounded-full bg-ink" />
          <span className="absolute bottom-2 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
          </span>
        </span>
      </div>
    )
  }
  return (
    <div className="flex h-full items-center justify-center gap-4 bg-[#E4F6EC]">
      <span className="relative inline-block">
        <span
          className="block h-20 w-20 rounded-full border-[3px] border-ink shadow-pop-sm"
          style={{
            background:
              'conic-gradient(#F4581C 0 60deg, #FFC83D 60deg 140deg, #2D8CFF 140deg 215deg, #FF7E9D 215deg 290deg, #1F9D5B 290deg 360deg)',
          }}
        />
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-sm" aria-hidden="true">
          ▼
        </span>
      </span>
      <span className="rounded-full border-[2.5px] border-ink bg-tangerine px-3.5 py-1.5 text-xs font-bold text-paper shadow-pop-sm">
        SPIN!
      </span>
    </div>
  )
}

export function FirstPrompts() {
  return (
    <SectionShell
      id="first-prompts"
      eyebrow="take-away"
      title="Leave with something to make."
      kicker="Three first builds, written for you. Copy one, paste it into your tool, answer its questions — about fifteen minutes later, you've made a real thing."
    >
      <motion.div
        variants={staggerKids}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid gap-4 sm:grid-cols-3"
      >
        {STEPS.map((step) => (
          <motion.div key={step.n} variants={fadeUp} className="card-pop flex items-start gap-3 p-4">
            <Sticker color={step.color} rotate={-4} className="shrink-0">
              {step.n}
            </Sticker>
            <p className="text-sm leading-snug">{step.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={staggerKids}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid items-stretch gap-7 lg:grid-cols-3"
      >
        {starterPrompts.map((sp, i) => (
          <motion.article
            key={sp.id}
            variants={fadeUp}
            className="card-pop flex flex-col overflow-hidden"
            style={{ rotate: `${[-0.7, 0.5, -0.4][i]}deg` }}
          >
            <div className="h-36 border-b-[3px] border-ink" aria-hidden="true">
              <Thumb id={sp.id} />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="font-display text-xl font-extrabold leading-tight">{sp.title}</h3>
                <span className="rounded-full border-2 border-ink bg-paper-deep px-2.5 py-0.5 font-mono text-[0.68rem] font-bold">
                  {sp.forWho}
                </span>
                <span className="rounded-full border-2 border-ink bg-paper-deep px-2.5 py-0.5 font-mono text-[0.68rem] font-bold">
                  {sp.time}
                </span>
              </header>
              <p className="text-sm leading-snug text-ink-soft">{sp.what}</p>
              <div className="relative">
                <pre
                  aria-label={`Starter prompt: ${sp.title}`}
                  className="prompt-scroll max-h-52 overflow-y-auto whitespace-pre-wrap rounded-xl border-[2.5px] border-ink bg-paper-deep p-3.5 font-mono text-[0.78rem] leading-relaxed"
                >
                  {sp.prompt}
                </pre>
                <div className="pointer-events-none absolute inset-x-0.5 bottom-0.5 h-8 rounded-b-xl bg-gradient-to-t from-paper-deep to-transparent" />
              </div>
              <CopyButton text={sp.prompt} className="mt-auto" />
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-10 max-w-2xl text-center text-ink-soft"
      >
        Make them yours — change the folder names, the questions, anything. The agent rolls with it. And if you don't
        have a tool yet,{' '}
        <a href="#pick-your-door" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
          pick your door ↑
        </a>
      </motion.p>
    </SectionShell>
  )
}
