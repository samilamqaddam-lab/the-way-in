import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { SubpageShell } from '../../components/SubpageShell'
import { HowToStrip } from '../../components/HowToStrip'
import { PromptCard } from '../../components/PromptCard'
import { EmojiThumb } from '../../components/PromptThumbs'
import { CopyButton } from '../../components/CopyButton'
import { Pip } from '../../components/Pip'
import { Sticker } from '../../components/Sticker'
import { fadeUp, staggerKids, viewportOnce } from '../../lib/motion'
import { categories, categoryOf, pantry } from '../../data/pantry'
import type { CategoryId } from '../../data/pantry'

/* ─── The Prompt Mixer ──────────────────────────────────────────────────── */

const MIX_WHAT = [
  { id: 'page', label: 'a page', phrase: 'a one-page website' },
  { id: 'app', label: 'a little app', phrase: 'a tiny app that works completely offline' },
  { id: 'slides', label: 'a slideshow', phrase: 'a slideshow site I can flip through like slides' },
] as const

const MIX_WHO = [
  { id: 'me', label: 'me', phrase: 'myself' },
  { id: 'love', label: 'someone I love', phrase: 'someone I love' },
  { id: 'family', label: 'my family', phrase: 'my family' },
  { id: 'friends', label: 'my friends', phrase: 'my friends' },
] as const

const MIX_VIBE = [
  { id: 'cozy', label: 'cozy', phrase: 'cozy and warm' },
  { id: 'fun', label: 'loud & fun', phrase: 'loud, colorful and fun' },
  { id: 'calm', label: 'clean & calm', phrase: 'clean, calm and uncluttered' },
  { id: 'fancy', label: 'a little fancy', phrase: 'elegant and a little fancy' },
] as const

function mixPrompt(what: (typeof MIX_WHAT)[number], who: (typeof MIX_WHO)[number], vibe: (typeof MIX_VIBE)[number]) {
  return `Hi! I'm brand new to this — please be my friendly guide as well as my builder. I want to make ${what.phrase} for ${who.phrase}, with a ${vibe.phrase} feel.

Before you write any code, ask me four to six short questions, one at a time, to learn exactly what it should say and contain — the names, the moments or items that matter, and any colors I love.

Then create a new empty folder called "my-mixed-idea" and work only inside it, using plain HTML, CSS and JavaScript — no installs, no frameworks. Make it look great on a phone. If anything needs to be saved (like a list), use localStorage and add a small note that my data never leaves my device.

When you're done, explain what each file does in simple words, show me how to open it in my browser, and suggest three small changes I could ask you for next.`
}

function ChipGroup<T extends { id: string; label: string }>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: readonly T[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            aria-pressed={value === opt.id}
            onClick={() => onChange(opt.id)}
            className={`rounded-full border-[2.5px] border-ink px-3.5 py-1.5 text-sm font-bold transition-colors ${
              value === opt.id ? 'bg-sun' : 'bg-paper hover:bg-paper-deep'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function PromptMixer() {
  const [whatId, setWhatId] = useState<string>('page')
  const [whoId, setWhoId] = useState<string>('love')
  const [vibeId, setVibeId] = useState<string>('cozy')

  const what = MIX_WHAT.find((o) => o.id === whatId) ?? MIX_WHAT[0]
  const who = MIX_WHO.find((o) => o.id === whoId) ?? MIX_WHO[0]
  const vibe = MIX_VIBE.find((o) => o.id === vibeId) ?? MIX_VIBE[0]
  const mixed = mixPrompt(what, who, vibe)

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      aria-labelledby="mixer-title"
      className="card-pop mx-auto mt-20 max-w-3xl overflow-hidden"
    >
      <div className="border-b-[3px] border-ink bg-paper-deep px-6 py-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="mixer-title" className="font-display text-2xl font-extrabold md:text-3xl">
            The Prompt Mixer
          </h2>
          <Sticker color="grape" rotate={3}>
            build your own
          </Sticker>
        </div>
        <p className="mt-2 text-ink-soft">
          No shelf had your idea? Mix a fresh prompt — every combination keeps the safety habits baked in.
        </p>
      </div>
      <div className="grid gap-6 p-6 md:p-8">
        <ChipGroup legend="I want to make…" options={MIX_WHAT} value={whatId} onChange={setWhatId} />
        <ChipGroup legend="for…" options={MIX_WHO} value={whoId} onChange={setWhoId} />
        <ChipGroup legend="feeling…" options={MIX_VIBE} value={vibeId} onChange={setVibeId} />
        <div className="relative">
          <pre
            aria-label="Your mixed prompt"
            className="prompt-scroll max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl border-[2.5px] border-ink bg-paper-deep p-3.5 font-mono text-[0.78rem] leading-relaxed"
          >
            {mixed}
          </pre>
          <div className="pointer-events-none absolute inset-x-0.5 bottom-0.5 h-8 rounded-b-xl bg-gradient-to-t from-paper-deep to-transparent" />
        </div>
        <CopyButton text={mixed} label="Copy my mixed prompt" />
        <p className="text-center text-sm text-ink-soft">
          Before you paste it: add one sentence only you could write — the detail that makes it yours.
        </p>
      </div>
    </motion.section>
  )
}

/* ─── The Pantry page ───────────────────────────────────────────────────── */

export function PromptsPage() {
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')
  const [surpriseId, setSurpriseId] = useState<string | null>(null)
  const surpriseTimer = useRef<number | undefined>(undefined)

  const visible = useMemo(
    () => (filter === 'all' ? pantry : pantry.filter((p) => p.category === filter)),
    [filter],
  )

  // honor a deep link like /prompts/#plant-tracker
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' })
    }, 150)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => () => window.clearTimeout(surpriseTimer.current), [])

  const surprise = () => {
    const pick = visible[Math.floor(Math.random() * visible.length)]
    if (!pick) return
    setSurpriseId(pick.id)
    document.getElementById(pick.id)?.scrollIntoView({ block: 'center' })
    window.clearTimeout(surpriseTimer.current)
    surpriseTimer.current = window.setTimeout(() => setSurpriseId(null), 2600)
  }

  return (
    <SubpageShell
      page="prompts"
      eyebrow="the library"
      title="The Prompt Pantry"
      kicker={`${pantry.length} paste-ready prompts, organized by life — not by technology. Copy one, paste it into your tool, answer its questions.`}
      pip={<Pip size={60} hat="chef" bob />}
    >
      <section className="px-5">
        <div className="mx-auto w-full max-w-6xl">
          <HowToStrip className="mt-12" />
          <p className="mt-6 text-center font-mono text-sm text-ink-soft">
            every prompt here starts in a brand-new empty folder — nothing on your computer is at risk.
          </p>

          {/* shelf filter */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`rounded-full border-[2.5px] border-ink px-3.5 py-1.5 font-mono text-xs font-bold ${
                filter === 'all' ? 'bg-sun' : 'bg-paper hover:bg-paper-deep'
              }`}
            >
              the whole pantry
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={`rounded-full border-[2.5px] border-ink px-3.5 py-1.5 font-mono text-xs font-bold ${
                  filter === c.id ? 'bg-sun' : 'bg-paper hover:bg-paper-deep'
                }`}
              >
                {c.emoji} {c.label}
              </button>
            ))}
            <button type="button" onClick={surprise} className="btn-pop btn-tangerine px-3.5 py-1.5 text-xs">
              🎲 surprise me
            </button>
          </div>

          {/* the shelves */}
          <h2 className="sr-only">The shelves</h2>
          <motion.div
            key={filter}
            variants={staggerKids}
            initial="hidden"
            animate="show"
            className="mt-10 grid items-stretch gap-7 sm:grid-cols-2 xl:grid-cols-3"
          >
            {visible.map((p, i) => (
              <div key={p.id} className={surpriseId === p.id ? 'outline outline-4 outline-offset-4 outline-tangerine rounded-blob' : ''}>
                <PromptCard
                  data={p}
                  anchorId={p.id}
                  badge={p.classic ? 'the classic' : undefined}
                  thumb={<EmojiThumb emoji={p.emoji} tint={categoryOf(p).tint} />}
                  rotate={[-0.6, 0.5, -0.4, 0.7][i % 4]}
                />
              </div>
            ))}
          </motion.div>

          <PromptMixer />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-14 max-w-2xl text-center text-ink-soft"
          >
            New here? Take the{' '}
            <a href="../#test-drive" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
              test drive
            </a>{' '}
            first — it shows you exactly what happens after you paste.
          </motion.p>
        </div>
      </section>
    </SubpageShell>
  )
}
