import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'
import { useLocale } from '../../../i18n/locale'

/**
 * Stage 1: bare content (just HTML). Stage 2: the CSS arrives and it blooms.
 * Stage 3: the confetti button lands. A tiny lesson in what each file does.
 */
export function BirthdayPreview({ stage }: { stage: number }) {
  const fr = useLocale() === 'fr'
  const styled = stage >= 2
  return (
    <div
      className={`flex min-h-52 flex-col items-center justify-center gap-3 p-4 text-center text-ink transition-colors duration-500 ${
        styled ? 'bg-[#FFF1E0]' : 'bg-white'
      }`}
    >
      {stage >= 1 && (
        <motion.p
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={popSpring}
          className={
            styled
              ? 'font-display text-2xl font-extrabold leading-tight text-tangerine'
              : 'font-serif text-lg text-neutral-800'
          }
        >
          {fr ? 'Joyeux anniversaire, Maya ! 🎂' : 'Happy birthday, Maya! 🎂'}
        </motion.p>
      )}
      {stage >= 1 && !styled && (
        <p className="font-serif text-xs text-neutral-500">
          {fr ? 'gentille — drôle — toujours là' : 'kind — funny — always there'}
        </p>
      )}
      {styled && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="flex flex-wrap justify-center gap-1.5"
        >
          {[
            [fr ? 'gentille' : 'kind', 'bg-sun text-ink'],
            [fr ? 'drôle' : 'funny', 'bg-blush text-ink'],
            [fr ? 'toujours là' : 'always there', 'bg-sky text-ink'],
          ].map(([label, cls]) => (
            <span
              key={label}
              className={`rounded-full border-2 border-ink px-2.5 py-1 text-[0.68rem] font-bold ${cls}`}
            >
              {label}
            </span>
          ))}
        </motion.div>
      )}
      {stage >= 3 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={popSpring}
          className="shadow-pop-sm rounded-full border-2 border-ink bg-tangerine px-3.5 py-1.5 text-xs font-bold text-ink"
        >
          {fr ? '🎉 confettis !' : '🎉 confetti!'}
        </motion.span>
      )}
    </div>
  )
}
