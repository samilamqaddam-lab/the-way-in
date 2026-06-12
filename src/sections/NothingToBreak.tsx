import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { GlossaryTip } from '../components/GlossaryTip'
import { Sticker } from '../components/Sticker'
import { Pip } from '../components/Pip'
import { fadeUp, popSpring, staggerKids, viewportOnce } from '../lib/motion'

const BUTTON_LABELS = ['Go on. Try to break something.', 'Try harder.', 'One more, for luck.']

const TOASTS = [
  'Nothing broke. Nothing can break — this is just a webpage. And your practice folder works the same way: empty means safe.',
  "Still nothing. That's the whole trick — start empty, and there's nothing to lose.",
  "Okay — you've now officially broken… nothing. You're ready. 💛",
]

export function NothingToBreak() {
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

  const toast = tries > 0 ? TOASTS[Math.min(tries, TOASTS.length) - 1] : null

  return (
    <SectionShell
      id="no-fear"
      eyebrow="the big fear"
      title="“What if I break something?”"
      kicker="The most sensible question in the world. Three honest answers:"
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
          {[
            {
              n: '1',
              color: 'sun' as const,
              rotate: -1.2,
              title: 'Agents ask first.',
              body: (
                <>
                  You felt it in the test drive — you clicked Allow yourself. Real agents work the same way: before
                  anything is created or changed, the question comes to you. And “no” always works.
                </>
              ),
            },
            {
              n: '2',
              color: 'blush' as const,
              rotate: 0.8,
              title: 'You practice in an empty folder.',
              body: (
                <>
                  Your first projects live in a brand-new <GlossaryTip k="folder">folder</GlossaryTip> — a fresh box
                  with nothing else inside. Empty means nothing to lose.
                </>
              ),
            },
            {
              n: '3',
              color: 'sky' as const,
              rotate: -0.6,
              title: 'Worst case? Delete it.',
              body: (
                <>
                  If a practice project gets weird, you delete that one folder and it's like it never happened. Your
                  photos, your <GlossaryTip k="file">files</GlossaryTip>, the rest of your computer — simply not
                  involved.
                </>
              ),
            },
          ].map((card) => (
            <motion.div
              key={card.n}
              variants={fadeUp}
              className="card-pop relative p-6 pt-7"
              style={{ rotate: `${card.rotate}deg` }}
            >
              <Sticker color={card.color} rotate={-6} className="absolute -top-3.5 left-5">
                fact {card.n}
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
          <p className="font-mono text-sm text-ink-soft">still nervous? get it out of your system:</p>
          <button type="button" onClick={smash} className="btn-pop mt-4 bg-alarm px-8 py-4 text-xl text-paper">
            {BUTTON_LABELS[Math.min(tries, BUTTON_LABELS.length - 1)]}
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
