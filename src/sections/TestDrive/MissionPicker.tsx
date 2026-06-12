import { motion } from 'motion/react'
import { fadeUp, staggerKids, viewportOnce } from '../../lib/motion'
import { useLocale } from '../../i18n/locale'
import { TEST_DRIVE_COPY } from './copy'
import type { Mission } from '../../data/missions'

interface MissionPickerProps {
  missions: Mission[]
  onPick: (mission: Mission) => void
}

const TILTS = [-1.1, 0.7, -0.5, 0.9, -0.8, 0.6, -0.4, 1.0]

export function MissionPicker({ missions, onPick }: MissionPickerProps) {
  const t = TEST_DRIVE_COPY[useLocale()]
  return (
    <motion.div variants={staggerKids} initial="hidden" whileInView="show" viewport={viewportOnce}>
      <div className={`grid gap-5 sm:grid-cols-3 ${missions.length > 4 ? 'lg:grid-cols-4' : ''}`}>
        {missions.map((mission, i) => (
          <motion.button
            key={mission.id}
            type="button"
            variants={fadeUp}
            onClick={() => onPick(mission)}
            className="card-pop group p-6 text-left transition-transform duration-150 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
          >
            <span className="block text-4xl" aria-hidden="true">
              {mission.emoji}
            </span>
            <span className="mt-3 block font-display text-xl font-bold leading-tight">{mission.label}</span>
            <span className="mt-1 block text-ink-soft">{mission.tagline}</span>
            <span className="btn-pop btn-sun mt-4 inline-block px-4 py-1.5 text-sm transition-transform duration-150 group-hover:-translate-y-0.5">
              {t.playThis}
            </span>
          </motion.button>
        ))}
      </div>
      <motion.p variants={fadeUp} className="mt-6 text-center font-mono text-sm text-ink-soft">
        {t.allPretend}
      </motion.p>
    </motion.div>
  )
}
