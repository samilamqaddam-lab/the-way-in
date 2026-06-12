import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'

/** Shop name → the jars with prices → find-me-at-the-market. */
export function HoneyPreview({ stage }: { stage: number }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-2.5 bg-[#FFF6E0] p-4 text-center">
      {stage >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={popSpring}>
          <p className="font-display text-xl font-extrabold leading-tight text-ink">Rosa's Honey 🍯</p>
          <p className="font-serif text-xs italic text-neutral-500">from sleepy bees, with love</p>
        </motion.div>
      )}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="flex gap-1.5"
        >
          {[
            ['Wildflower', '6€'],
            ['Forest', '7€'],
            ['Spring', '6€'],
          ].map(([name, price]) => (
            <span key={name} className="rounded-lg border-2 border-ink bg-white px-2 py-1.5 text-[0.62rem] font-bold">
              {name}
              <span className="block text-[#B8860B]">{price}</span>
            </span>
          ))}
        </motion.div>
      )}
      {stage >= 3 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={popSpring}
          className="rounded-full border-2 border-ink bg-sun px-3 py-1.5 text-[0.68rem] font-bold shadow-pop-sm"
        >
          📍 Saturday market, stall 12
        </motion.span>
      )}
    </div>
  )
}
