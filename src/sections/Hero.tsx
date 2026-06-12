import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTypewriter } from '../lib/useTypewriter'
import { useLocale } from '../i18n/locale'
import { LangToggle } from '../components/LangToggle'
import { Pip } from '../components/Pip'
import { Squiggle } from '../components/Squiggle'
import { Marquee } from '../components/Marquee'
import { Wordmark } from '../components/Wordmark'
import { HERO_COPY } from './Hero.copy'

type Gesture = 'idle' | 'wink' | 'left' | 'right' | 'hop'

/** The headline caret, alive: a bouncy wake-up, then idle mischief. */
function HeroPip({ awake }: { awake: boolean }) {
  const reduced = useReducedMotion()
  const [gesture, setGesture] = useState<Gesture>('idle')

  useEffect(() => {
    if (!awake || reduced) return
    let timer = 0
    let revert = 0
    const loop = () => {
      const options: Gesture[] = ['wink', 'left', 'right', 'hop', 'wink']
      const g = options[Math.floor(Math.random() * options.length)]
      setGesture(g)
      revert = window.setTimeout(() => setGesture('idle'), g === 'hop' ? 550 : 850)
      timer = window.setTimeout(loop, 2600 + Math.random() * 2800)
    }
    timer = window.setTimeout(loop, 1500)
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(revert)
    }
  }, [awake, reduced])

  return (
    <motion.span
      className="inline-block h-full"
      animate={
        !reduced && awake
          ? gesture === 'hop'
            ? { y: [0, -9, 0], scaleY: [1, 1.12, 0.9, 1] }
            : { y: 0, scaleY: 1 }
          : { y: 0, scaleY: 1 }
      }
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* fully invisible until the headline lands — the seat stays reserved
          (opacity/scale don't move layout), then Pip arrives with a flourish */}
      <motion.span
        className="inline-block h-full"
        initial={false}
        animate={
          awake
            ? reduced
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 1, scale: [0, 1.25, 0.9, 1], rotate: [0, -12, 7, 0] }
            : { opacity: 0, scale: reduced ? 1 : 0, rotate: 0 }
        }
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Pip
          fluid
          tone="ink"
          eyes
          mood={gesture === 'wink' ? 'wink' : 'idle'}
          look={gesture === 'left' ? 'left' : gesture === 'right' ? 'right' : 'ahead'}
        />
      </motion.span>
    </motion.span>
  )
}

export function Hero() {
  const t = HERO_COPY[useLocale()]
  const headline = t.headA + t.headB
  const { shown, done } = useTypewriter(headline, { cps: 36 })
  const count = shown.length

  // Every character is laid out from frame one and revealed by opacity —
  // the classic typewriter look with zero layout shift.
  const charSpan = (c: string, i: number) => (
    <span key={i} className={i < count ? 'opacity-100' : 'opacity-0'}>
      {c}
    </span>
  )

  return (
    <section id="start" className="relative flex min-h-[100svh] flex-col overflow-x-clip">
      {/* soft color weather */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,61,0.55),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-44 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(108,77,244,0.18),transparent_70%)]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6">
        <Wordmark />
        <LangToggle />
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        {/* drifting prompt chips — other people's first messages */}
        {/* one short orienting line — visible from the very first paint */}
        <p className="mb-5 font-mono text-[0.8rem] font-semibold text-ink-soft md:text-sm">
          <span className="text-tangerine-deep" aria-hidden="true">
            ✳{' '}
          </span>
          {t.eyebrow}
        </p>

        <h1
          aria-label={headline}
          className="relative max-w-4xl text-balance font-display text-[clamp(2.75rem,9.5vw,6.1rem)] font-extrabold leading-[0.98] tracking-[-0.02em]"
        >
          <span aria-hidden="true">
            {t.headA.split('').map(charSpan)}
            <span className="relative inline-block">
              {t.headB.split('').map((c, i) => charSpan(c, t.headA.length + i))}
              {done && (
                <Squiggle
                  kind="underline"
                  className="absolute -bottom-3 left-[-4%] h-3.5 w-[108%] text-tangerine md:-bottom-4"
                  strokeWidth={6}
                />
              )}
            </span>
            <span className="ml-[0.06em] inline-block h-[0.74em] translate-y-[0.06em]">
              <HeroPip awake={done} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mx-auto mt-7 max-w-4xl text-balance text-lg text-ink-soft md:text-xl"
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#test-drive" className="btn-pop btn-ink px-7 py-3.5 text-lg">
            {t.ctaPrimary}
          </a>
          <a href="./quest/" className="btn-pop px-5 py-3.5 text-lg">
            {t.ctaSecondary}
          </a>
        </motion.div>

        {/* the contract, whispered — the send-off checklist hands back the receipts */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-7 px-2 font-mono text-[0.72rem] text-ink-soft"
        >
          {t.finePrint}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 font-mono text-xs text-ink-soft"
        >
          {t.scrollHint}{' '}
          <span className="anim-ambient inline-block" style={{ animation: 'bob 1.8s ease-in-out infinite' }} aria-hidden="true">
            ↓
          </span>
        </motion.p>
      </div>

      <div className="relative z-10 -mx-[2%] w-[104%] -rotate-[1.2deg] pb-3">
        <Marquee items={t.marquee} />
        <p className="sr-only">
          {t.marqueeSr} {t.marquee.join(', ')}
        </p>
      </div>
    </section>
  )
}
