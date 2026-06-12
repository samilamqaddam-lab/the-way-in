import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { Pip } from '../components/Pip'
import { ConfettiBurst } from '../components/ConfettiBurst'
import { popSpring } from '../lib/motion'

/**
 * The two little theaters: the same message goes to "chat mode" Pip, who
 * prints you a comically long to-do receipt, and to "agent mode" Pip, who
 * builds the thing himself — and pauses once to ask the visitor a real
 * question. The tap IS the lesson: with agents, your job becomes deciding.
 * All scripted, nothing real.
 */

type Phase = 'idle' | 'send' | 'work' | 'decision' | 'finish' | 'done'
type MayaColor = 'sun' | 'blush'

const MESSAGE = 'make a birthday page for my friend Maya'
const TOTAL_STEPS = 23

const RECEIPT_LINES = [
  '1. Install a code editor',
  '2. New file: index.html',
  '3. Copy this HTML in',
  '4. New file: style.css',
  '5. Link the stylesheet',
  '6. Save everything',
  '7. Open it in a browser',
  '8. Fix what looks off',
  '9. Add a confetti library',
]

const NARRATION: Record<Phase, string> = {
  idle: '',
  send: 'You send the same message to both: make a birthday page for my friend Maya.',
  work: 'The chat answers with a long to-do list for you. The agent starts building the page itself.',
  decision: "The agent pauses and asks: Maya's favorite color? Two buttons follow.",
  finish: 'You chose. The agent finishes the page in your color.',
  done: 'Result: the chat handed you 23 steps. The agent built the page — you made one decision.',
}

const TORN_EDGE =
  'polygon(0 0, 100% 0, 100% calc(100% - 6px), 94% 100%, 84% calc(100% - 5px), 74% 100%, 64% calc(100% - 6px), 54% 100%, 44% calc(100% - 5px), 34% 100%, 24% calc(100% - 6px), 14% 100%, 5% calc(100% - 5px), 0 100%)'

function YouBubble({ show }: { show: boolean }) {
  return (
    <div className="flex min-h-12 justify-end">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={popSpring}
            className="max-w-[90%] rounded-2xl rounded-br-md border-[2.5px] border-ink bg-sun px-3.5 py-2 text-sm font-medium text-ink"
          >
            {MESSAGE}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stamp({ show, children, tone }: { show: boolean; children: ReactNode; tone: 'paper' | 'leaf' }) {
  return (
    <div className="flex min-h-14 items-center justify-center">
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, scale: 1.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={popSpring}
            className={`shadow-pop-sm inline-block rounded-lg border-[2.5px] border-ink px-3.5 py-1.5 text-center font-mono text-xs font-bold ${
              tone === 'leaf' ? 'bg-leaf text-paper' : 'bg-paper-deep text-ink'
            }`}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function ChatStage({ phase, steps }: { phase: Phase; steps: number }) {
  const started = phase !== 'idle'
  const talking = started && phase !== 'send'
  return (
    <div className="card-pop flex flex-col p-5 md:-rotate-[0.6deg]">
      <div className="mb-4 flex items-center gap-3 border-b-[3px] border-line pb-3.5">
        <Pip size={36} tone="ink" />
        <div>
          <p className="font-bold leading-tight">Chat mode</p>
          <p className="text-xs text-ink-soft">answers in words</p>
        </div>
      </div>

      <YouBubble show={started} />

      <div className="mt-2 flex min-h-9 items-start gap-2">
        {talking && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl rounded-bl-md border-[2.5px] border-line bg-paper-deep px-3 py-1.5 text-sm"
          >
            Sure! Here's how:
          </motion.p>
        )}
      </div>

      {/* the receipt printer */}
      <div className="mx-auto mt-2 w-52">
        <div className="mx-auto h-3 w-48 rounded-full bg-ink" />
        <div className="relative mx-auto -mt-px h-52 w-44 overflow-hidden">
          <div
            className="border-x-2 border-b-0 border-line bg-white px-3 py-2 font-mono text-[0.62rem] leading-[1.75] text-neutral-700"
            style={{ clipPath: TORN_EDGE }}
          >
            {RECEIPT_LINES.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
            <span className="block italic">…plus 13 more steps</span>
          </div>
          {/* paper-colored cover slides down = the receipt "prints" (transform only) */}
          <div
            className="absolute inset-0 bg-paper transition-transform duration-150 ease-linear"
            style={{ transform: `translateY(${(steps / TOTAL_STEPS) * 102}%)` }}
          />
        </div>
        <p className="mt-1.5 text-center font-mono text-xs text-ink-soft">
          steps for you: <strong className="text-ink">{steps}</strong>
        </p>
      </div>

      <div className="mt-auto pt-3">
        <Stamp show={phase === 'done'} tone="paper">
          your to-do list: 23 steps 📝
        </Stamp>
      </div>
    </div>
  )
}

interface AgentStageProps {
  phase: Phase
  blocks: number
  color: MayaColor | null
  burst: number
  onPick: (c: MayaColor) => void
}

function AgentStage({ phase, blocks, color, burst, onPick }: AgentStageProps) {
  const started = phase !== 'idle'
  const talking = started && phase !== 'send'
  const tint = color === 'blush' ? 'bg-blush' : color === 'sun' ? 'bg-sun' : 'bg-paper-deep'
  return (
    <div className="on-dark flex flex-col rounded-[1.4rem] border-[3px] border-ink bg-plum p-5 text-on-plum shadow-pop md:rotate-[0.6deg]">
      <div className="mb-4 flex items-center gap-3 border-b-[3px] border-plum-line pb-3.5">
        <Pip size={36} tone="tangerine" hat />
        <div>
          <p className="font-bold leading-tight">Agent mode</p>
          <p className="text-xs text-on-plum-dim">builds — and asks when it's your call</p>
        </div>
      </div>

      <YouBubble show={started} />

      <div className="mt-2 flex min-h-9 items-start">
        {talking && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm leading-snug text-on-plum"
          >
            <span className="mr-1.5 font-mono font-bold text-tangerine" aria-hidden="true">
              ❯
            </span>
            On it. I'll ask when it's your call.
          </motion.p>
        )}
      </div>

      {/* the build site */}
      <div className="relative mx-auto mt-2 w-full max-w-60">
        <div className="flex min-h-44 flex-col gap-1.5 rounded-xl border-[2.5px] border-plum-line bg-paper p-2.5">
          {blocks === 0 && (
            <p className="m-auto font-mono text-[0.65rem] italic text-neutral-400">empty lot — waiting for the okay…</p>
          )}
          {blocks >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={popSpring}
              className={`rounded-md border-2 border-ink px-2 py-1.5 text-center font-display text-[0.72rem] font-extrabold text-ink transition-colors duration-500 ${tint}`}
            >
              HAPPY BIRTHDAY, MAYA!
            </motion.div>
          )}
          {blocks >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={popSpring}
              className="py-0.5 text-center text-2xl"
            >
              🎂
            </motion.div>
          )}
          {blocks >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={popSpring}
              className="space-y-1.5 px-2"
            >
              <span className="block h-2 w-full rounded-full bg-ink/15" />
              <span className="block h-2 w-3/4 rounded-full bg-ink/15" />
            </motion.div>
          )}
          {blocks >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={popSpring}
              className="pt-0.5 text-center"
            >
              <span
                className={`shadow-pop-sm inline-block rounded-full border-2 border-ink px-3 py-1 text-[0.68rem] font-bold text-ink transition-colors duration-500 ${tint}`}
              >
                🎉 confetti!
              </span>
            </motion.div>
          )}
        </div>
        <ConfettiBurst trigger={burst} count={14} />
      </div>

      {/* the decision moment — the visitor's actual job */}
      <div className="mt-3 min-h-[8.5rem]">
        <AnimatePresence mode="wait">
          {phase === 'decision' && (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={popSpring}
              className="rounded-xl border-[2.5px] border-sun bg-plum-deep p-3.5"
            >
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-sun">
                quick one — your call
              </p>
              <p className="mt-1.5 font-semibold leading-snug">Maya's favorite color?</p>
              <div className="mt-3 flex gap-2.5">
                <button type="button" onClick={() => onPick('sun')} className="btn-pop btn-sun min-h-11 flex-1 px-2 text-sm">
                  🌞 sunny yellow
                </button>
                <button
                  type="button"
                  onClick={() => onPick('blush')}
                  className="btn-pop min-h-11 flex-1 bg-blush px-2 text-sm text-ink"
                >
                  🌸 bubblegum pink
                </button>
              </div>
              <p className="mt-2.5 font-mono text-[0.68rem] text-on-plum-dim">
                agents pause for the parts only you know.
              </p>
            </motion.div>
          )}
          {(phase === 'finish' || phase === 'done') && (
            <motion.p
              key="built"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm text-term-green"
            >
              ✓ built — in {color === 'blush' ? 'bubblegum pink' : 'sunny yellow'}, your call
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-3">
        <Stamp show={phase === 'done'} tone="leaf">
          your to-do list: 1 decision 🎂
        </Stamp>
      </div>
    </div>
  )
}

export function Theater() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.3 })

  const [phase, setPhase] = useState<Phase>('idle')
  const [steps, setSteps] = useState(0)
  const [color, setColor] = useState<MayaColor | null>(null)
  const [burst, setBurst] = useState(0)

  // blocks are derived, never stored: 3 build before the question, the 4th lands after
  const blocks =
    phase === 'finish' || phase === 'done' ? 4 : steps >= 17 ? 3 : steps >= 11 ? 2 : steps >= 5 ? 1 : 0

  useEffect(() => {
    if (!inView || phase !== 'idle') return
    if (reduced) {
      setSteps(TOTAL_STEPS)
      setPhase('decision')
    } else {
      setPhase('send')
    }
  }, [inView, phase, reduced])

  useEffect(() => {
    if (phase !== 'send') return
    const t = window.setTimeout(() => setPhase('work'), 800)
    return () => window.clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'work') return
    const iv = window.setInterval(() => setSteps((s) => Math.min(TOTAL_STEPS, s + 1)), 115)
    return () => window.clearInterval(iv)
  }, [phase])

  useEffect(() => {
    if (phase === 'work' && steps >= TOTAL_STEPS) setPhase('decision')
  }, [phase, steps])

  useEffect(() => {
    if (phase !== 'finish') return
    const t = window.setTimeout(() => setPhase('done'), 1300)
    return () => window.clearTimeout(t)
  }, [phase])

  const pick = (c: MayaColor) => {
    if (phase !== 'decision') return
    setColor(c)
    if (reduced) {
      setPhase('done')
    } else {
      setBurst((b) => b + 1)
      setPhase('finish')
    }
  }

  const replay = () => {
    setColor(null)
    setBurst(0)
    if (reduced) {
      setSteps(TOTAL_STEPS)
      setPhase('decision')
    } else {
      setSteps(0)
      setPhase('send')
    }
  }

  return (
    <div ref={rootRef}>
      <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
        <ChatStage phase={phase} steps={steps} />
        <AgentStage phase={phase} blocks={blocks} color={color} burst={burst} onPick={pick} />
      </div>
      <div className="mt-4 flex min-h-12 justify-center">
        {phase === 'done' && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={popSpring}
            onClick={replay}
            className="btn-pop text-sm"
          >
            ↺ replay the little show
          </motion.button>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {NARRATION[phase]}
      </p>
    </div>
  )
}
