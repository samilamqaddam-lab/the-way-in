import { motion } from 'motion/react'
import { useTypewriter } from '../lib/useTypewriter'
import { Pip } from '../components/Pip'
import { Sticker } from '../components/Sticker'
import { Squiggle } from '../components/Squiggle'
import { Marquee } from '../components/Marquee'

const HEAD_A = 'You can already do '
const HEAD_B = 'the hard part.'
const HEADLINE = HEAD_A + HEAD_B

const MADE_BY_BEGINNERS = [
  'a birthday page for a best friend',
  'a chore wheel for the kids',
  'a poem book for grandma',
  'a fan page for a football club',
  'a study timer',
  'a recipe card that never gets lost',
  'a countdown to vacation',
  'a tiny quiz for friends',
]

const CHIPS = [
  { text: 'make me a birthday page', cls: 'bg-sun/40', pos: 'left-0 top-0 -rotate-6 md:top-1', delay: '0s' },
  {
    text: 'build a chore wheel for us',
    cls: 'bg-paper-deep/70',
    pos: 'right-0 top-10 rotate-[5deg] md:top-2',
    delay: '-2.1s',
  },
  {
    text: "explain this like I'm twelve",
    cls: 'bg-blush/35',
    pos: 'left-[24%] top-10 rotate-[3deg] hidden md:block',
    delay: '-3.4s',
  },
  {
    text: 'turn my notes into a study site',
    cls: 'bg-paper-deep/70',
    pos: 'right-[20%] top-11 -rotate-[4deg] hidden md:block',
    delay: '-1.2s',
  },
  {
    text: 'a page for my plant babies',
    cls: 'bg-leaf/20',
    pos: 'left-1/2 top-0 -translate-x-1/2 rotate-[2deg] hidden lg:block',
    delay: '-4.6s',
  },
]

export function Hero() {
  const { shown, done } = useTypewriter(HEADLINE, { cps: 36 })
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
        <span className="font-mono text-sm font-bold tracking-tight">
          the·way·in{' '}
          <span className="text-tangerine" aria-hidden="true">
            ✳
          </span>
        </span>
        <span className="hidden sm:inline-block">
          <Sticker color="sun" rotate={3}>
            no signup · nothing to install
          </Sticker>
        </span>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        {/* drifting prompt chips — other people's first messages */}
        {/* dashed + flat + muted = "example text", never "tap me" — buttons keep the solid pop look.
            The chips live in their own reserved band above the headline (flow layout), so they can
            never drift next to the buttons, whatever the viewport. */}
        <div className="relative mb-6 h-20 w-full max-w-4xl md:mb-8 md:h-24" aria-hidden="true">
          {CHIPS.map((chip) => (
            <span
              key={chip.text}
              className={`anim-ambient pointer-events-none absolute select-none whitespace-nowrap rounded-full border-2 border-dashed border-ink/40 px-4 py-1.5 font-mono text-[0.72rem] font-medium text-ink-soft ${chip.cls} ${chip.pos}`}
              style={{ animation: 'bob 6.5s ease-in-out infinite', animationDelay: chip.delay }}
            >
              {chip.text}
            </span>
          ))}
        </div>

        {/* the plain-words promise — visible from the very first paint, no metaphor */}
        <p className="mb-5 text-balance px-2 font-mono text-[0.8rem] font-semibold text-ink-soft md:text-sm">
          <span className="text-tangerine-deep" aria-hidden="true">
            ✳{' '}
          </span>
          a free little guide to AI agents — the kind that builds for you, not just chats
        </p>

        <h1
          aria-label={HEADLINE}
          className="relative max-w-4xl text-balance font-display text-[clamp(2.75rem,9.5vw,6.1rem)] font-extrabold leading-[0.98] tracking-[-0.02em]"
        >
          <span aria-hidden="true">
            {HEAD_A.split('').map(charSpan)}
            <span className="relative inline-block">
              {HEAD_B.split('').map((c, i) => charSpan(c, HEAD_A.length + i))}
              {done && (
                <Squiggle
                  kind="underline"
                  className="absolute -bottom-3 left-0 h-3.5 w-full text-tangerine md:-bottom-4"
                  strokeWidth={6}
                />
              )}
            </span>
            <span className="ml-[0.06em] inline-block h-[0.74em] translate-y-[0.06em]">
              <Pip fluid tone="ink" eyes={done} bob={false} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mx-auto mt-7 max-w-xl text-balance text-lg text-ink-soft md:text-xl"
        >
          If you've ever written a good message to ChatGPT or Claude, you already speak the language that builds real
          things. This site walks you through the door — and nothing here can break.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#test-drive" className="btn-pop btn-ink px-7 py-3.5 text-lg">
            Take the test drive ↓
          </a>
          <a href="#first-prompts" className="btn-pop">
            Skip to my first prompt
          </a>
        </motion.div>

        {/* the contract — the send-off checklist confirms these exact four, as receipts */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-2"
        >
          <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
            in one visit:
          </span>
          {['get what an agent is', 'try one, safely', 'pick your tool & cost', 'leave with a ready prompt'].map(
            (promise) => (
              <span
                key={promise}
                className="rounded-full border-2 border-ink bg-paper-deep px-3 py-1 text-[0.78rem] font-semibold"
              >
                {promise}
              </span>
            ),
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 font-mono text-xs text-ink-soft"
        >
          scroll — the door's this way{' '}
          <span className="anim-ambient inline-block" style={{ animation: 'bob 1.8s ease-in-out infinite' }} aria-hidden="true">
            ↓
          </span>
        </motion.p>
      </div>

      <div className="relative z-10 -mx-[2%] w-[104%] -rotate-[1.2deg] pb-3">
        <Marquee items={MADE_BY_BEGINNERS} />
        <p className="sr-only">Things beginners made recently: {MADE_BY_BEGINNERS.join(', ')}</p>
      </div>
    </section>
  )
}
