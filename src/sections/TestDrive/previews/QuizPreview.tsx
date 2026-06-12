import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'

/** Three little screens: title → a question → the score. */
export function QuizPreview({ stage }: { stage: number }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-3 bg-[#F1ECFF] p-4 text-center text-ink">
      {stage === 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={popSpring}>
          <p className="font-display text-xl font-extrabold leading-tight text-grape">
            How well do you know me?
          </p>
          <span className="mt-3 inline-block rounded-full border-2 border-ink bg-grape px-3.5 py-1.5 text-xs font-bold text-paper shadow-pop-sm">
            start ▸
          </span>
        </motion.div>
      )}
      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="w-full max-w-56"
        >
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-neutral-500">
            question 2 of 3
          </p>
          <p className="mt-1 font-display text-base font-bold leading-snug text-ink">
            What's my dream trip?
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            <span className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-bold">Japan 🗾</span>
            <span className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-bold">Iceland 🧊</span>
          </div>
        </motion.div>
      )}
      {stage >= 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={popSpring}>
          <p className="font-display text-2xl font-extrabold text-grape">2 / 3 😄</p>
          <p className="mt-1 text-xs text-neutral-600">pretty good — you may stay friends</p>
          <span className="mt-1.5 block h-2.5 w-40 overflow-hidden rounded-full border-2 border-ink bg-white">
            <span className="block h-full w-2/3 bg-leaf" />
          </span>
        </motion.div>
      )}
    </div>
  )
}
