import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'

interface SectionShellProps {
  id: string
  eyebrow: string
  title: ReactNode
  kicker?: ReactNode
  align?: 'center' | 'left'
  className?: string
  children: ReactNode
}

/** Shared section frame: eyebrow + display heading + kicker, with a once-only staggered reveal. */
export function SectionShell({
  id,
  eyebrow,
  title,
  kicker,
  align = 'center',
  className = '',
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={`relative overflow-x-clip px-5 py-24 md:py-32 ${className}`}>
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.header
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            <span className="text-tangerine" aria-hidden="true">
              ✳{' '}
            </span>
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2.1rem,6.2vw,3.8rem)] font-extrabold leading-[1.04] tracking-[-0.015em] text-balance"
          >
            {title}
          </motion.h2>
          {kicker && (
            <motion.p variants={fadeUp} className="mt-5 text-lg text-ink-soft md:text-xl">
              {kicker}
            </motion.p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  )
}
