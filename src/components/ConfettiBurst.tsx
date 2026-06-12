import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const COLORS = ['#F4581C', '#FFC83D', '#6C4DF4', '#1F9D5B', '#2D8CFF', '#FF7E9D']

interface ConfettiBurstProps {
  /** increment this number to fire a burst */
  trigger: number
  count?: number
  className?: string
}

interface Piece {
  id: string
  x: number
  peak: number
  fall: number
  rot: number
  dur: number
  delay: number
  color: string
  round: boolean
}

/**
 * A small celebratory burst — capped particle count, transform/opacity only.
 * Under reduced motion it becomes a calm "ta-da!" badge instead.
 */
export function ConfettiBurst({ trigger, count = 24, className = '' }: ConfettiBurstProps) {
  const reduced = useReducedMotion()

  const pieces = useMemo<Piece[]>(() => {
    if (trigger === 0 || reduced) return []
    return Array.from({ length: count }, (_, i) => ({
      id: `${trigger}-${i}`,
      x: (Math.random() * 2 - 1) * 150,
      peak: -(40 + Math.random() * 150),
      fall: 200 + Math.random() * 130,
      rot: (Math.random() * 2 - 1) * 540,
      dur: 0.9 + Math.random() * 0.5,
      delay: Math.random() * 0.12,
      color: COLORS[i % COLORS.length],
      round: i % 5 < 2,
    }))
  }, [trigger, count, reduced])

  if (trigger === 0) return null

  if (reduced) {
    return (
      <span className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`} aria-hidden="true">
        <motion.span
          key={trigger}
          className="card-pop bg-sun px-4 py-1.5 font-mono text-sm font-bold"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
          transition={{ duration: 1.8, times: [0, 0.12, 0.8, 1] }}
        >
          ta-da!
        </motion.span>
      </span>
    )
  }

  return (
    <span className={`pointer-events-none absolute inset-0 overflow-visible ${className}`} aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute left-1/2 top-1/2 block ${p.round ? 'h-2.5 w-2.5 rounded-full' : 'h-2 w-3 rounded-[2px]'}`}
          style={{ background: p.color }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: [0, p.peak, p.peak + p.fall],
            rotate: p.rot,
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </span>
  )
}
