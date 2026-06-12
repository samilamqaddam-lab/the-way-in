import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { popSpring } from '../../../lib/motion'
import { GRIDS, spriteDataUrl } from '../engine/sprites'
import { BOSS_QUESTIONS, SHARDS } from '../data/script'

export interface BossResult {
  remaining: string[]
  won: boolean
  gold: boolean
}

interface BossQuizProps {
  shardsAtStart: string[]
  onDone: (result: BossResult) => void
}

type Phase = 'intro' | 'question' | 'feedback' | 'verdict'

/** The Data Snatcher battle: five questions, wrong answers cost shards. */
export function BossQuiz({ shardsAtStart, onDone }: BossQuizProps) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('intro')
  const [qi, setQi] = useState(0)
  const [remaining, setRemaining] = useState<string[]>(shardsAtStart)
  const [picked, setPicked] = useState<number | null>(null)

  const snatcher = useMemo(() => spriteDataUrl(GRIDS.snatcherA, GRIDS.snatcherPalette, 7), [])
  const pip = useMemo(() => spriteDataUrl(GRIDS.pipDown, GRIDS.pipOnDark, 5), [])

  const q = BOSS_QUESTIONS[qi]
  const correct = picked !== null && picked === q.correct

  const answer = (i: number) => {
    if (phase !== 'question') return
    setPicked(i)
    if (i !== q.correct) setRemaining((r) => r.slice(0, -1))
    setPhase('feedback')
  }

  const next = () => {
    if (qi + 1 < BOSS_QUESTIONS.length) {
      setQi(qi + 1)
      setPicked(null)
      setPhase('question')
    } else {
      setPhase('verdict')
    }
  }

  const finish = () => {
    const won = remaining.length >= 3
    onDone({ remaining, won, gold: won && remaining.length === SHARDS.length })
  }

  const shardOf = (id: string) => SHARDS.find((s) => s.id === id)

  return (
    <div className="on-dark absolute inset-0 z-30 flex flex-col bg-plum-deep p-3 text-on-plum sm:p-5" role="dialog" aria-label="The Data Snatcher">
      {/* arena */}
      <div className="relative flex-none">
        <div className="flex items-start justify-between">
          <div className="mt-6 text-center">
            <span className="inline-block rounded-xl border-2 border-ink bg-paper p-1.5">
              <img src={pip} alt="" className="block" style={{ imageRendering: 'pixelated', width: 52 }} />
            </span>
            <p className="mt-1 font-mono text-[0.65rem] text-on-plum-dim">pip</p>
          </div>
          <div className="text-center">
            <motion.img
              src={snatcher}
              alt="The Data Snatcher, a glitchy ink blob"
              style={{ imageRendering: 'pixelated', width: 105 }}
              animate={reduced ? undefined : { y: [0, -5, 0], rotate: [0, -2, 2, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="mt-1 font-mono text-[0.65rem] text-blush">the DATA SNATCHER</p>
          </div>
        </div>
        {/* the loot it wants */}
        <div className="absolute left-1/2 top-1 flex -translate-x-1/2 gap-1" aria-label={`Shards remaining: ${remaining.length}`}>
          {remaining.map((id) => (
            <span key={id} className="grid h-7 w-7 place-items-center rounded-md border-2 border-sun bg-plum text-sm">
              <span aria-hidden="true">{shardOf(id)?.emoji}</span>
            </span>
          ))}
        </div>
      </div>

      {/* the floor */}
      <div className="mt-auto">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={popSpring}
              className="rounded-xl border-[3px] border-blush bg-plum p-4"
            >
              <p className="leading-snug">
                <strong className="text-blush">“Lovely shards, little cursor.”</strong> The Snatcher blocks the door.{' '}
                <strong>“Answer my questions — every wrong answer, I keep one.”</strong>
              </p>
              <p className="mt-2 font-mono text-[0.7rem] text-on-plum-dim">
                escape with 3+ shards to win · all 5 = golden certificate
              </p>
              <button type="button" onClick={() => setPhase('question')} className="btn-pop btn-sun mt-3 w-full">
                Bring it on
              </button>
            </motion.div>
          )}

          {phase === 'question' && (
            <motion.div
              key={`q${qi}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={popSpring}
              className="rounded-xl border-[3px] border-ink bg-paper p-4 text-ink"
            >
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-tangerine-deep">
                question {qi + 1} of {BOSS_QUESTIONS.length}
              </p>
              <p className="mt-1.5 font-semibold leading-snug">{q.q}</p>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => answer(i)}
                    className="rounded-xl border-[2.5px] border-ink bg-paper-deep px-3 py-2 text-left text-sm font-semibold hover:bg-sun"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'feedback' && (
            <motion.div
              key={`f${qi}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={popSpring}
              className={`rounded-xl border-[3px] p-4 ${correct ? 'border-leaf bg-paper text-ink' : 'border-blush bg-plum'}`}
            >
              <p className="font-display text-lg font-extrabold">
                {correct ? '✓ Correct! The Snatcher recoils.' : '✗ Wrong — it snatches a shard!'}
              </p>
              <p className={`mt-1.5 text-sm leading-snug ${correct ? 'text-ink-soft' : 'text-on-plum'}`}>{q.why}</p>
              <button type="button" onClick={next} className={`btn-pop mt-3 w-full ${correct ? 'btn-ink' : 'btn-sun'}`}>
                {qi + 1 < BOSS_QUESTIONS.length ? 'Next question ▸' : 'Face the verdict'}
              </button>
            </motion.div>
          )}

          {phase === 'verdict' && (
            <motion.div
              key="verdict"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={popSpring}
              className="rounded-xl border-[3px] border-sun bg-plum p-4 text-center"
            >
              {remaining.length >= 3 ? (
                <>
                  <p className="font-display text-xl font-extrabold text-sun">
                    {remaining.length === SHARDS.length ? 'FLAWLESS. The Snatcher dissolves into harmless pixels.' : 'The Snatcher shrieks and lets you pass!'}
                  </p>
                  <p className="mt-1.5 text-sm text-on-plum-dim">
                    You escape with {remaining.length} of {SHARDS.length} shards.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl font-extrabold text-blush">The Snatcher cackles…</p>
                  <p className="mt-1.5 text-sm text-on-plum-dim">
                    It kept too much. You slip out the door with {remaining.length} shard{remaining.length === 1 ? '' : 's'} and a heavy heart.
                  </p>
                </>
              )}
              <button type="button" onClick={finish} className="btn-pop btn-sun mt-3 w-full">
                {remaining.length >= 3 ? 'Step through the door' : 'Trudge out'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
