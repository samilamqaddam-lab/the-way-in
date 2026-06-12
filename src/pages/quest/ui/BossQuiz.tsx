import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { popSpring } from '../../../lib/motion'
import { GRIDS, spriteDataUrl } from '../engine/sprites'
import { BOSS_QUESTIONS, SHARDS } from '../data/script'
import { BOSS_QUESTIONS_FR, SHARDS_FR } from '../data/script.fr'
import { pick, useLocale } from '../../../i18n/locale'
import type { Locale } from '../../../i18n/locale'

const BOSS_COPY = {
  en: {
    dialogAria: 'The Data Snatcher',
    pipName: 'pip',
    bossName: 'the DATA SNATCHER',
    bossAlt: 'The Data Snatcher, a glitchy ink blob',
    lootAria: (n: number) => `Shards remaining: ${n}`,
    introA: '“Lovely shards, little cursor.”',
    introB: 'The Snatcher blocks the door.',
    introC: '“Answer my questions — every wrong answer, I keep one.”',
    introRules: 'escape with 3+ shards to win · all 5 = golden certificate',
    bringIt: 'Bring it on',
    questionOf: (a: number, b: number) => `question ${a} of ${b}`,
    right: '✓ Correct! The Snatcher recoils.',
    wrong: '✗ Wrong — it snatches a shard!',
    nextQ: 'Next question ▸',
    verdictBtn: 'Face the verdict',
    flawless: 'FLAWLESS. The Snatcher dissolves into harmless pixels.',
    passed: 'The Snatcher shrieks and lets you pass!',
    escaped: (a: number, b: number) => `You escape with ${a} of ${b} shards.`,
    cackles: 'The Snatcher cackles…',
    keptTooMuch: (n: number) => `It kept too much. You slip out the door with ${n} shard${n === 1 ? '' : 's'} and a heavy heart.`,
    stepThrough: 'Step through the door',
    trudge: 'Trudge out',
  },
  fr: {
    dialogAria: 'Le Chapardeur de Données',
    pipName: 'pip',
    bossName: 'le CHAPARDEUR DE DONNÉES',
    bossAlt: 'Le Chapardeur de Données, une tache d’encre pleine de glitchs',
    lootAria: (n: number) => `Éclats restants : ${n}`,
    introA: '« Jolis éclats, petit curseur. »',
    introB: 'Le Chapardeur bloque la porte.',
    introC: '« Réponds à mes questions — chaque mauvaise réponse, j’en garde un. »',
    introRules: 'ressors avec 3 éclats ou plus pour gagner · les 5 = certificat doré',
    bringIt: 'Vas-y, essaie',
    questionOf: (a: number, b: number) => `question ${a} sur ${b}`,
    right: '✓ Correct ! Le Chapardeur recule.',
    wrong: '✗ Faux — il chaparde un éclat !',
    nextQ: 'Question suivante ▸',
    verdictBtn: 'Affronter le verdict',
    flawless: 'SANS FAUTE. Le Chapardeur se dissout en pixels inoffensifs.',
    passed: 'Le Chapardeur glapit et te laisse passer !',
    escaped: (a: number, b: number) => `Tu t’échappes avec ${a} éclats sur ${b}.`,
    cackles: 'Le Chapardeur ricane…',
    keptTooMuch: (n: number) => `Il en a gardé trop. Tu te glisses dehors avec ${n} éclat${n === 1 ? '' : 's'} et le cœur lourd.`,
    stepThrough: 'Passer la porte',
    trudge: 'Sortir d’un pas lourd',
  },
} satisfies Record<Locale, Record<string, string | ((...a: number[]) => string)>>

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
  const locale = useLocale()
  const t = BOSS_COPY[locale]
  const questions = pick(locale, BOSS_QUESTIONS, BOSS_QUESTIONS_FR)
  const shardDefs = pick(locale, SHARDS, SHARDS_FR)
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('intro')
  const [qi, setQi] = useState(0)
  const [remaining, setRemaining] = useState<string[]>(shardsAtStart)
  const [picked, setPicked] = useState<number | null>(null)

  const snatcher = useMemo(() => spriteDataUrl(GRIDS.snatcherA, GRIDS.snatcherPalette, 7), [])
  const pip = useMemo(() => spriteDataUrl(GRIDS.pipDown, GRIDS.pipOnDark, 5), [])

  const q = questions[qi]
  const correct = picked !== null && picked === q.correct

  const answer = (i: number) => {
    if (phase !== 'question') return
    setPicked(i)
    if (i !== q.correct) setRemaining((r) => r.slice(0, -1))
    setPhase('feedback')
  }

  const next = () => {
    if (qi + 1 < questions.length) {
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

  const shardOf = (id: string) => shardDefs.find((s) => s.id === id)

  return (
    <div className="on-dark absolute inset-0 z-30 flex flex-col overflow-y-auto bg-plum-deep p-3 text-on-plum sm:p-5" role="dialog" aria-label={t.dialogAria}>
      {/* arena */}
      <div className="relative flex-none">
        <div className="flex items-start justify-between">
          <div className="mt-6 text-center">
            <img src={pip} alt="" className="mx-auto block" style={{ imageRendering: 'pixelated', width: 50 }} />
            <p className="mt-1 font-mono text-[0.65rem] text-on-plum-dim">{t.pipName}</p>
          </div>
          <div className="text-center">
            <motion.img
              src={snatcher}
              alt={t.bossAlt}
              style={{ imageRendering: 'pixelated', width: 105 }}
              animate={reduced ? undefined : { y: [0, -5, 0], rotate: [0, -2, 2, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="mt-1 font-mono text-[0.65rem] text-blush">{t.bossName}</p>
          </div>
        </div>
        {/* the loot it wants */}
        <div className="absolute left-1/2 top-1 flex -translate-x-1/2 gap-1" aria-label={t.lootAria(remaining.length)}>
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
                <strong className="text-blush">{t.introA}</strong> {t.introB} <strong>{t.introC}</strong>
              </p>
              <p className="mt-2 font-mono text-[0.7rem] text-on-plum-dim">{t.introRules}</p>
              <button type="button" onClick={() => setPhase('question')} className="btn-pop btn-sun mt-3 w-full">
                {t.bringIt}
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
                {t.questionOf(qi + 1, questions.length)}
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
              <p className="font-display text-lg font-extrabold">{correct ? t.right : t.wrong}</p>
              <p className={`mt-1.5 text-sm leading-snug ${correct ? 'text-ink-soft' : 'text-on-plum'}`}>{q.why}</p>
              <button type="button" onClick={next} className={`btn-pop mt-3 w-full ${correct ? 'btn-ink' : 'btn-sun'}`}>
                {qi + 1 < questions.length ? t.nextQ : t.verdictBtn}
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
                    {remaining.length === SHARDS.length ? t.flawless : t.passed}
                  </p>
                  <p className="mt-1.5 text-sm text-on-plum-dim">{t.escaped(remaining.length, SHARDS.length)}</p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl font-extrabold text-blush">{t.cackles}</p>
                  <p className="mt-1.5 text-sm text-on-plum-dim">{t.keptTooMuch(remaining.length)}</p>
                </>
              )}
              <button type="button" onClick={finish} className="btn-pop btn-sun mt-3 w-full">
                {remaining.length >= 3 ? t.stepThrough : t.trudge}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
