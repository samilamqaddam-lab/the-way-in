import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { Sticker } from '../components/Sticker'
import { Pip } from '../components/Pip'
import { fadeUp, popSpring, staggerKids, viewportOnce } from '../lib/motion'
import { useLocale } from '../i18n/locale'
import { NOTHING_TO_BREAK_COPY } from './NothingToBreak.copy'

export function NothingToBreak() {
  const t = NOTHING_TO_BREAK_COPY[useLocale()]
  const reduced = useReducedMotion()
  const [tries, setTries] = useState(0)
  const [wobbling, setWobbling] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const smash = () => {
    setTries((t) => t + 1)
    if (!reduced) {
      setWobbling(false)
      // restart the CSS animation on rapid presses
      requestAnimationFrame(() => {
        setWobbling(true)
        window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => setWobbling(false), 600)
      })
    }
  }

  const toast = tries > 0 ? t.toasts[Math.min(tries, t.toasts.length) - 1] : null

  return (
    <SectionShell
      id="no-fear"
      eyebrow={t.eyebrow}
      title={t.title}
      kicker={t.kicker}
      className="border-y-[3px] border-ink bg-paper-deep dot-grid"
    >
      <div className={wobbling ? 'wobbling' : undefined}>
        <motion.div
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {t.facts.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="card-pop relative p-6 pt-7"
              style={{ rotate: `${[-1.2, 0.8, -0.6][i]}deg` }}
            >
              <Sticker color={(['sun', 'blush', 'sky'] as const)[i]} rotate={-6} className="absolute -top-3.5 left-5">
                {t.factSticker} {i + 1}
              </Sticker>
              <h3 className="font-display text-xl font-extrabold leading-snug">{card.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-xl text-center"
        >
          <p className="font-mono text-sm text-ink-soft">{t.stillNervous}</p>
          <button type="button" onClick={smash} className="btn-pop mt-4 bg-alarm px-8 py-4 text-xl text-paper">
            {t.buttons[Math.min(tries, t.buttons.length - 1)]}
          </button>
          <div aria-live="polite">
            {toast && (
              <motion.div
                key={tries}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={popSpring}
                className="card-pop mx-auto mt-6 flex max-w-md items-start gap-3.5 p-5 text-left"
                style={{ rotate: '-0.5deg' }}
              >
                <Pip size={40} mood="wink" className="mt-0.5 shrink-0" />
                <p className="leading-snug">{toast}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}
