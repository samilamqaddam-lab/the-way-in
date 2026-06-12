import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'

/** Gallery title → the wall of frames → a caption with a story. */
export function PhotosPreview({ stage }: { stage: number }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-2.5 bg-[#FBF1F4] p-4 text-center">
      {stage >= 1 && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="font-display text-xl font-extrabold leading-tight text-ink"
        >
          Grandma's Wall 🖼️
        </motion.p>
      )}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="grid grid-cols-3 gap-1.5"
        >
          {['🌻', '👰', '🐕', '🎂', '⛱️', '👶'].map((p, i) => (
            <span
              key={i}
              className="grid h-10 w-10 place-items-center rounded-md border-2 border-ink bg-white text-lg shadow-pop-sm"
              style={{ rotate: `${[-2, 1.5, -1, 2, -1.5, 1][i]}deg` }}
              aria-hidden="true"
            >
              {p}
            </span>
          ))}
        </motion.div>
      )}
      {stage >= 3 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={popSpring}
          className="max-w-56 rounded-lg border-2 border-ink bg-white px-3 py-1.5 font-serif text-[0.68rem] italic text-neutral-700"
        >
          “Summer 1987 — the dog stole the cake and nobody minded.”
        </motion.p>
      )}
    </div>
  )
}
