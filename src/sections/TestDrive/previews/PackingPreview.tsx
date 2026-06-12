import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'
import { useLocale } from '../../../i18n/locale'

/** Title → the grouped checklist → ticks that stick. */
export function PackingPreview({ stage }: { stage: number }) {
  const fr = useLocale() === 'fr'
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-2.5 bg-[#E8F6F1] p-4 text-center text-ink">
      {stage >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={popSpring}>
          <p className="font-display text-xl font-extrabold leading-tight text-ink">
            {fr ? 'Week-end ✈️' : 'Weekend Trip ✈️'}
          </p>
          <p className="font-mono text-[0.62rem] text-neutral-500">
            {fr ? '7 sur 12 dans la valise' : '7 of 12 packed'}
          </p>
        </motion.div>
      )}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="w-full max-w-52 rounded-xl border-[2.5px] border-ink bg-white p-2.5 text-left"
        >
          <p className="mb-1 rounded bg-[#FFF3C4] px-1.5 py-0.5 font-mono text-[0.6rem] font-bold">
            {fr ? '⚠️ LE CHARGEUR. TOUJOURS LE CHARGEUR.' : '⚠️ THE CHARGER. ALWAYS THE CHARGER.'}
          </p>
          <ul className="space-y-1 text-xs text-neutral-800">
            <li className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded border-2 border-ink bg-leaf text-[0.55rem] font-bold text-paper">
                ✓
              </span>
              <span className="line-through opacity-60">{fr ? 'Brosse à dents' : 'Toothbrush'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded border-2 border-ink bg-white" />
              <span>{fr ? 'Chaussures confort' : 'Comfy shoes'}</span>
            </li>
          </ul>
        </motion.div>
      )}
      {stage >= 3 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={popSpring}
          className="rounded-full border-2 border-ink bg-leaf px-3 py-1 text-[0.68rem] font-bold text-ink shadow-pop-sm"
        >
          {fr ? '✓ retenu pour la prochaine fois' : '✓ remembered for next time'}
        </motion.span>
      )}
    </div>
  )
}
