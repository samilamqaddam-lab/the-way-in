import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTypewriter } from '../../lib/useTypewriter'
import { PermissionCard } from './PermissionCard'
import type { Awaiting, LogItem } from './engine'
import type { Beat } from '../../data/missions'

interface AgentLineProps {
  text: string
  skipSignal: number
  onDone: () => void
}

function AgentLine({ text, skipSignal, onDone }: AgentLineProps) {
  const { shown, done, skip } = useTypewriter(text, { cps: 52, onDone })
  const lastSignal = useRef(skipSignal)
  useEffect(() => {
    if (skipSignal !== lastSignal.current) {
      lastSignal.current = skipSignal
      skip()
    }
  }, [skipSignal, skip])
  return (
    <span>
      <span aria-hidden="true">
        {shown}
        {!done && (
          <span className="text-tangerine" aria-hidden="true">
            ▍
          </span>
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

interface TerminalProps {
  log: LogItem[]
  awaiting: Awaiting
  beat: Beat | undefined
  denies: number
  skipSignal: number
  onSend: () => void
  onAllow: () => void
  onDeny: () => void
  onSkip: () => void
  onTyped: () => void
}

/** The conversation pane — warm-dark, big type, zero mystique. */
export function Terminal({
  log,
  awaiting,
  beat,
  denies,
  skipSignal,
  onSend,
  onAllow,
  onDeny,
  onSkip,
  onTyped,
}: TerminalProps) {
  const reduced = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [log.length, awaiting, reduced])

  const lastItem = log[log.length - 1]

  return (
    <div
      ref={scrollRef}
      aria-live="polite"
      className="term-scroll flex h-[21rem] flex-col gap-3.5 overflow-y-auto p-4 sm:p-5 md:h-[26rem]"
    >
      {log.map((item) => {
        switch (item.role) {
          case 'you':
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[88%] self-end rounded-2xl rounded-br-md border-[2.5px] border-ink bg-sun px-4 py-2.5 font-medium leading-snug text-ink"
              >
                {item.text}
              </motion.div>
            )
          case 'agent':
            return (
              <div key={item.id} className="max-w-[94%] leading-relaxed text-on-plum">
                <span className="mr-1.5 font-mono font-bold text-tangerine" aria-hidden="true">
                  ❯
                </span>
                <AgentLine text={item.text} skipSignal={skipSignal} onDone={onTyped} />
              </div>
            )
          case 'think': {
            const active = lastItem?.id === item.id && (awaiting === 'auto' || awaiting === 'pause')
            return (
              <div
                key={item.id}
                className={`font-mono text-[0.8rem] italic text-on-plum-dim ${active ? 'animate-shimmer anim-ambient' : 'opacity-60'}`}
              >
                · {item.text}…
              </div>
            )
          }
          case 'system':
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[0.82rem] text-term-green"
              >
                {item.text}
              </motion.div>
            )
        }
      })}

      {awaiting === 'typing' && (
        <button
          type="button"
          onClick={onSkip}
          className="self-start font-mono text-xs text-on-plum-dim underline decoration-dotted underline-offset-4 hover:text-on-plum"
        >
          skip the typing ▸▸
        </button>
      )}

      {awaiting === 'permission' && beat?.kind === 'askPermission' && (
        <PermissionCard
          question={beat.question}
          detail={beat.detail}
          reAsk={denies > 0}
          onAllow={onAllow}
          onDeny={onDeny}
        />
      )}

      {awaiting === 'send' && beat?.kind === 'youSend' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-[2.5px] border-plum-line bg-plum-deep p-3.5"
        >
          <p className="mb-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            your message — already written for you
          </p>
          <p className="leading-snug text-on-plum">{beat.text}</p>
          <motion.button
            type="button"
            onClick={onSend}
            className="btn-pop btn-tangerine mt-3.5 w-full"
            animate={reduced ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            Send it ▸
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
