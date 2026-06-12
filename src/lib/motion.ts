import type { Transition, Variants } from 'motion/react'

export const popSpring: Transition = { type: 'spring', stiffness: 420, damping: 26 }
export const softSpring: Transition = { type: 'spring', stiffness: 230, damping: 28 }

export const viewportOnce = { once: true, amount: 0.25 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: softSpring },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  show: { opacity: 1, scale: 1, transition: popSpring },
}

export const staggerKids: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}

export const staggerKidsSlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
}
