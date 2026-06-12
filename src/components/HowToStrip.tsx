import { motion } from 'motion/react'
import { Sticker } from './Sticker'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'
import { useLocale } from '../i18n/locale'
import type { Locale } from '../i18n/locale'

interface Step {
  n: string
  color: 'sun' | 'blush' | 'sky'
  strong: string
  rest: string
}

const STEPS = {
  en: [
    { n: '1', color: 'sun', strong: 'Open your tool.', rest: 'The app or the terminal — both are fine.' },
    { n: '2', color: 'blush', strong: 'Paste the prompt.', rest: "It's a normal message, nothing special." },
    {
      n: '3',
      color: 'sky',
      strong: 'Answer its questions.',
      rest: 'It asks before changing anything — and “no” is always allowed.',
    },
  ],
  fr: [
    { n: '1', color: 'sun', strong: 'Ouvre ton outil.', rest: 'L’appli ou le terminal — les deux marchent.' },
    { n: '2', color: 'blush', strong: 'Colle le prompt.', rest: 'C’est un message normal, rien de spécial.' },
    {
      n: '3',
      color: 'sky',
      strong: 'Réponds à ses questions.',
      rest: 'Il demande avant de changer quoi que ce soit — et “non” est toujours permis.',
    },
  ],
} satisfies Record<Locale, Step[]>

/** The ①②③ open → paste → answer strip, shared by home and the Pantry. */
export function HowToStrip({ className = '' }: { className?: string }) {
  const steps = STEPS[useLocale()]
  return (
    <motion.div
      variants={staggerKids}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`grid gap-4 sm:grid-cols-3 ${className}`}
    >
      {steps.map((step) => (
        <motion.div key={step.n} variants={fadeUp} className="card-pop flex items-start gap-3 p-4">
          <Sticker color={step.color} rotate={-4} className="shrink-0">
            {step.n}
          </Sticker>
          <p className="text-sm leading-snug">
            <strong>{step.strong}</strong> {step.rest}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
