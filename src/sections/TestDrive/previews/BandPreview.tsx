import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'

/** Poster name → the gig list → the follow strip. */
export function BandPreview({ stage }: { stage: number }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-2.5 bg-[#241836] p-4 text-center">
      {stage >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={popSpring}>
          <p className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-[#FFC83D]">
            The Kitchen Cats
          </p>
          <p className="mt-1 font-mono text-[0.62rem] italic text-[#B3A4CD]">loud songs about quiet appliances</p>
        </motion.div>
      )}
      {stage >= 2 && (
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="w-full max-w-56 space-y-1 font-mono text-[0.65rem] text-[#F5EDE0]"
        >
          <li className="flex justify-between rounded border border-[#3D2C5C] px-2 py-1">
            <span>FRI 21 — Garage Fest</span>
            <span className="text-[#FFC83D]">19:00</span>
          </li>
          <li className="flex justify-between rounded border border-[#3D2C5C] px-2 py-1">
            <span>SAT 29 — Youth Club</span>
            <span className="text-[#FFC83D]">20:00</span>
          </li>
          <li className="flex justify-between rounded border border-[#3D2C5C] px-2 py-1">
            <span>SUN 07 — Aunt Rosa's BBQ</span>
            <span className="text-[#FFC83D]">14:00</span>
          </li>
        </motion.ul>
      )}
      {stage >= 3 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={popSpring}
          className="rounded-full border-2 border-ink bg-[#FF7E9D] px-3.5 py-1.5 text-xs font-bold text-ink shadow-pop-sm"
        >
          🎸 come see us!
        </motion.span>
      )}
    </div>
  )
}
