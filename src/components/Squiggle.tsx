import { motion } from 'motion/react'
import { viewportOnce } from '../lib/motion'

type SquiggleKind = 'underline' | 'circle' | 'arrow'

interface SquiggleProps {
  kind?: SquiggleKind
  /** color comes from CSS `currentColor` — set via text-* classes */
  className?: string
  delay?: number
  strokeWidth?: number
}

const SHAPES: Record<SquiggleKind, { viewBox: string; d: string; extra?: string }> = {
  underline: {
    viewBox: '0 0 120 14',
    d: 'M3 9 Q 13 3 24 9 T 45 9 T 66 9 T 87 9 T 110 8',
  },
  circle: {
    viewBox: '0 0 220 84',
    d: 'M30 44 C 36 16 196 8 204 34 C 212 62 60 78 30 62 C 12 52 30 40 52 36',
  },
  arrow: {
    viewBox: '0 0 60 90',
    d: 'M30 4 C 22 30 40 48 28 78',
    extra: 'M14 64 L28 80 L42 66',
  },
}

/** Hand-drawn-feel stroke that draws itself when scrolled into view. */
export function Squiggle({ kind = 'underline', className = '', delay = 0, strokeWidth = 5 }: SquiggleProps) {
  const shape = SHAPES[kind]
  return (
    <svg viewBox={shape.viewBox} fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <motion.path
        d={shape.d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: 'easeInOut', delay }}
      />
      {shape.extra && (
        <motion.path
          d={shape.extra}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.3, ease: 'easeOut', delay: delay + 0.65 }}
        />
      )}
    </svg>
  )
}
