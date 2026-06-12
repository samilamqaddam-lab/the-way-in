import { motion } from 'motion/react'
import { popSpring } from '../../lib/motion'
import { useLocale } from '../../i18n/locale'
import { TEST_DRIVE_COPY } from './copy'

interface PermissionCardProps {
  question: string
  detail: string
  reAsk: boolean
  onAllow: () => void
  onDeny: () => void
}

/** The teaching moment: the visitor personally grants (or refuses) permission. */
export function PermissionCard({ question, detail, reAsk, onAllow, onDeny }: PermissionCardProps) {
  const t = TEST_DRIVE_COPY[useLocale()]
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={popSpring}
      className="rounded-2xl border-[3px] border-sun bg-plum-deep p-4 sm:p-5"
    >
      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-sun">
        {t.permKicker}
        {reAsk && <span className="ml-2 normal-case tracking-normal text-on-plum-dim">{t.permReAsk}</span>}
      </p>
      <p className="mt-2 font-semibold leading-snug text-on-plum">{question}</p>
      <p className="mt-1.5 text-sm leading-snug text-on-plum-dim">{detail}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={onAllow} className="btn-pop btn-sun flex-1 whitespace-nowrap text-base">
          {t.allow}
        </button>
        <button
          type="button"
          onClick={onDeny}
          className="min-h-12 flex-1 whitespace-nowrap rounded-full border-[3px] border-plum-line px-5 font-bold text-on-plum transition-colors hover:border-on-plum-dim"
        >
          {t.deny}
        </button>
      </div>
      <p className="mt-3 font-mono text-[0.7rem] text-on-plum-dim">{t.permFootnote}</p>
    </motion.div>
  )
}
