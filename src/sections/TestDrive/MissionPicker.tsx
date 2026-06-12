import { motion } from 'motion/react'
import { fadeUp, staggerKids, viewportOnce } from '../../lib/motion'
import { missions } from '../../data/missions'
import type { Mission } from '../../data/missions'

interface MissionPickerProps {
  onPick: (mission: Mission) => void
}

export function MissionPicker({ onPick }: MissionPickerProps) {
  return (
    <motion.div variants={staggerKids} initial="hidden" whileInView="show" viewport={viewportOnce}>
      <div className="grid gap-5 sm:grid-cols-3">
        {missions.map((mission, i) => (
          <motion.button
            key={mission.id}
            type="button"
            variants={fadeUp}
            onClick={() => onPick(mission)}
            className="card-pop group p-6 text-left transition-transform duration-150 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            style={{ rotate: `${[-1.1, 0.7, -0.5][i]}deg` }}
          >
            <span className="block text-4xl" aria-hidden="true">
              {mission.emoji}
            </span>
            <span className="mt-3 block font-display text-xl font-bold leading-tight">{mission.label}</span>
            <span className="mt-1 block text-ink-soft">{mission.tagline}</span>
            <span className="mt-4 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-tangerine">
              play this one ▸
            </span>
          </motion.button>
        ))}
      </div>
      <motion.p variants={fadeUp} className="mt-6 text-center font-mono text-sm text-ink-soft">
        all three are make-believe — the same moves as the real thing, with zero risk.
      </motion.p>
    </motion.div>
  )
}
