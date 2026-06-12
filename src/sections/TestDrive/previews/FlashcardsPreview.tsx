import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'

/** Question card → flipped answer with verdict buttons → the score. */
export function FlashcardsPreview({ stage }: { stage: number }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-3 bg-[#EAF3FF] p-4 text-center text-ink">
      {stage === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="w-full max-w-52 rounded-xl border-[2.5px] border-ink bg-white p-4 shadow-pop-sm"
        >
          <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-neutral-500">card 1 of 10</p>
          <p className="mt-2 font-display text-base font-bold leading-snug">What do plants breathe in?</p>
          <span className="mt-3 inline-block rounded-full border-2 border-ink bg-sky px-3 py-1 text-xs font-bold text-paper">
            tap to flip
          </span>
        </motion.div>
      )}
      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-52 rounded-xl border-[2.5px] border-ink bg-sun p-4 shadow-pop-sm"
        >
          <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-soft">answer</p>
          <p className="mt-2 font-display text-base font-extrabold leading-snug">Carbon dioxide (CO₂)</p>
          <div className="mt-3 flex justify-center gap-1.5">
            <span className="rounded-full border-2 border-ink bg-leaf px-2.5 py-1 text-[0.65rem] font-bold text-ink">
              got it ✓
            </span>
            <span className="rounded-full border-2 border-ink bg-white px-2.5 py-1 text-[0.65rem] font-bold">
              not yet
            </span>
          </div>
        </motion.div>
      )}
      {stage >= 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={popSpring}>
          <p className="font-display text-2xl font-extrabold text-sky">8 / 10 📚</p>
          <p className="mt-1 text-xs text-neutral-600">best streak yet — saved on this device</p>
          <span className="mt-1.5 block h-2.5 w-40 overflow-hidden rounded-full border-2 border-ink bg-white">
            <span className="block h-full w-4/5 bg-sky" />
          </span>
        </motion.div>
      )}
    </div>
  )
}
