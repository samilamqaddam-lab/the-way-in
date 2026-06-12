import { motion, useReducedMotion } from 'motion/react'
import { popSpring } from '../lib/motion'

type PipTone = 'ink' | 'tangerine' | 'paper'
type PipMood = 'idle' | 'wink' | 'cheer'
type PipLook = 'ahead' | 'down' | 'left' | 'right'

interface PipProps {
  /** height in px (ignored when fluid) */
  size?: number
  /** fill the parent's height instead of a fixed px size */
  fluid?: boolean
  tone?: PipTone
  mood?: PipMood
  look?: PipLook
  /** false renders a plain caret — the face hasn't "woken up" yet */
  eyes?: boolean
  /** tiny construction helmet — agent mode */
  hat?: boolean
  /** gentle idle float (CSS, disabled under reduced motion) */
  bob?: boolean
  className?: string
}

const BODY: Record<PipTone, string> = {
  ink: '#1B1611',
  tangerine: '#F4581C',
  paper: '#FBF5EB',
}

const PUPIL_SHIFT: Record<PipLook, { dx: number; dy: number }> = {
  ahead: { dx: 0, dy: 0.6 },
  down: { dx: 0, dy: 2.4 },
  left: { dx: -2.2, dy: 0.8 },
  right: { dx: 2.2, dy: 0.8 },
}

/**
 * Pip — the site's mascot. A text caret with a face: the same blinking
 * cursor that lives in every chat box and every terminal.
 */
export function Pip({
  size = 56,
  fluid = false,
  tone = 'ink',
  mood = 'idle',
  look = 'ahead',
  eyes = true,
  hat = false,
  bob = false,
  className = '',
}: PipProps) {
  const reduced = useReducedMotion()
  const body = BODY[tone]
  const eyeball = tone === 'paper' ? '#1B1611' : '#FBF5EB'
  const pupil = tone === 'paper' ? '#FBF5EB' : '#1B1611'
  const { dx, dy } = PUPIL_SHIFT[look]
  const happy = mood === 'cheer'

  return (
    <motion.span
      className={`inline-block leading-none ${fluid ? 'h-full' : ''} ${bob ? 'animate-bob anim-ambient' : ''} ${className}`}
      animate={!reduced && happy ? { y: [0, -9, 0] } : { y: 0 }}
      transition={{ duration: 0.55, repeat: happy && !reduced ? Infinity : 0, repeatDelay: 0.7 }}
      aria-hidden="true"
    >
      <svg
        width={fluid ? undefined : (size * 48) / 72}
        height={fluid ? undefined : size}
        className={fluid ? 'h-full w-auto' : undefined}
        viewBox="0 0 48 72"
        overflow={hat ? 'visible' : undefined}
        fill="none"
      >
        <rect x="3" y="3" width="42" height="66" rx="13" fill={body} />
        {hat && (
          <g>
            <path d="M8 2 Q 24 -14 40 2 Z" fill="#FFC83D" stroke="#1B1611" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="1" y="0" width="46" height="6" rx="3" fill="#FFC83D" stroke="#1B1611" strokeWidth="2.5" />
          </g>
        )}
        {eyes && (
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={popSpring}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <g
              className="animate-blink anim-ambient"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              {happy ? (
                <>
                  <path d="M11 28 q6 -7 12 0" stroke={eyeball} strokeWidth="3.4" strokeLinecap="round" fill="none" />
                  <path d="M25 28 q6 -7 12 0" stroke={eyeball} strokeWidth="3.4" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="17" cy="27" r="5" fill={eyeball} />
                  {mood === 'wink' ? (
                    <path d="M26 27 q5 4 10 0" stroke={eyeball} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  ) : (
                    <circle cx="31" cy="27" r="5" fill={eyeball} />
                  )}
                  <circle cx={17 + dx} cy={27 + dy} r="2.1" fill={pupil} />
                  {mood !== 'wink' && <circle cx={31 + dx} cy={27 + dy} r="2.1" fill={pupil} />}
                </>
              )}
            </g>
          </motion.g>
        )}
      </svg>
    </motion.span>
  )
}
