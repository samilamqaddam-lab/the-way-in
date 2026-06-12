import { motion } from 'motion/react'
import { Sticker } from './Sticker'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'

const STEPS = [
  {
    n: '1',
    color: 'sun' as const,
    text: (
      <>
        <strong>Open your tool.</strong> The app or the terminal — both are fine.
      </>
    ),
  },
  {
    n: '2',
    color: 'blush' as const,
    text: (
      <>
        <strong>Paste the prompt.</strong> It's a normal message, nothing special.
      </>
    ),
  },
  {
    n: '3',
    color: 'sky' as const,
    text: (
      <>
        <strong>Answer its questions.</strong> It asks before changing anything — and “no” is always allowed.
      </>
    ),
  },
]

/** The ①②③ open → paste → answer strip, shared by home and the Pantry. */
export function HowToStrip({ className = '' }: { className?: string }) {
  return (
    <motion.div
      variants={staggerKids}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`grid gap-4 sm:grid-cols-3 ${className}`}
    >
      {STEPS.map((step) => (
        <motion.div key={step.n} variants={fadeUp} className="card-pop flex items-start gap-3 p-4">
          <Sticker color={step.color} rotate={-4} className="shrink-0">
            {step.n}
          </Sticker>
          <p className="text-sm leading-snug">{step.text}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
