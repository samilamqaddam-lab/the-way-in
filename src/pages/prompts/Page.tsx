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
import type { CategoryId, PantryPrompt } from '../../data/pantry'

/* ─── The Prompt Mixer ──────────────────────────────────────────────────── */

const MIX_WHAT = [
  { id: 'page', label: 'a page', phrase: 'a one-page website' },
  { id: 'app', label: 'a little app', phrase: 'a tiny app' },
  { id: 'slides', label: 'a slideshow', phrase: 'a slideshow site I can flip through like slides' },
] as const

const MIX_WHO = [
  { id: 'me', label: 'me', phrase: 'myself', slug: 'me' },
  { id: 'love', label: 'someone I love', phrase: 'someone I love', slug: 'someone-special' },
  { id: 'family', label: 'my family', phrase: 'my family', slug: 'the-family' },
  { id: 'friends', label: 'my friends', phrase: 'my friends', slug: 'the-crew' },
] as const

const MIX_VIBE = [
  { id: 'cozy', label: 'cozy', phrase: 'cozy and warm' },
  { id: 'fun', label: 'loud & fun', phrase: 'loud, colorful and fun' },
  { id: 'calm', label: 'clean & calm', phrase: 'clean, calm and uncluttered' },
  { id: 'fancy', label: 'a little fancy', phrase: 'elegant and a little fancy' },
] as const

const MIX_PURPOSE = [
  { id: 'joy', label: '✨ just for joy', phrase: "It's just for joy.", cats: ['hobby', 'words'] },
  { id: 'celebration', label: '🎉 a celebration', phrase: "It's for a celebration.", cats: ['love'] },
  {
    id: 'business',
    label: '💼 my business',
    phrase: "It's for my small business — it should feel trustworthy and clear.",
    cats: ['thing'],
  },
  {
    id: 'money',
    label: '📊 money & plans',
    phrase: "It's for keeping my money or my plans organized.",
    cats: ['helpers'],
  },
  { id: 'learning', label: '📚 learning', phrase: "It's for learning or teaching something.", cats: ['school'] },
] as const

const MIX_COLORS = [
  { id: 'sunset', label: 'warm sunset', dots: ['#F4581C', '#FF7E9D', '#FFC83D'], phrase: 'warm sunset oranges and pinks' },
  { id: 'garden', label: 'fresh garden', dots: ['#1F9D5B', '#7BE0A2', '#FFF6E0'], phrase: 'fresh garden greens' },
  { id: 'sea', label: 'sea & sky', dots: ['#2D8CFF', '#8FC2FF', '#F5EDE0'], phrase: 'calm sea-and-sky blues' },
  { id: 'candy', label: 'candy pop', dots: ['#FF7E9D', '#6C4DF4', '#FFC83D'], phrase: 'bright candy-shop colors' },
  { id: 'pastel', label: 'soft pastels', dots: ['#FFD9CF', '#D9E8FF', '#DFF5E7'], phrase: 'soft, dreamy pastels' },
  { id: 'inkpaper', label: 'ink & paper', dots: ['#1B1611', '#FBF5EB'], phrase: 'simple ink-on-paper black and cream' },
  { id: 'agent', label: "✨ agent's pick", dots: [], phrase: '' },
] as const

const MIX_POWERS = [
  { id: 'remembers', label: '🧠 remembers things' },
  { id: 'offline', label: '✈️ works offline' },
  { id: 'surprise', label: '🎉 a hidden surprise' },
  { id: 'readable', label: '👓 big & readable' },
  { id: 'printable', label: '🖨️ print-friendly' },
] as const

type What = (typeof MIX_WHAT)[number]
type Who = (typeof MIX_WHO)[number]
type Vibe = (typeof MIX_VIBE)[number]
type MixColor = (typeof MIX_COLORS)[number]
type Purpose = (typeof MIX_PURPOSE)[number]
type PowerId = (typeof MIX_POWERS)[number]['id']

function mixPrompt(what: What, who: Who, vibe: Vibe, color: MixColor, purpose: Purpose, need: string, powers: Set<PowerId>) {
  const folder = `my-${what.id}-for-${who.slug}`
  const colorLine =
    color.id === 'agent' ? ' Pick colors you think fit — surprise me.' : ` Lean its colors toward ${color.phrase}.`
  const needLine = need.trim() ? ` In my own words, the need is: ${need.trim().slice(0, 240)}` : ''
  const needPunct = needLine && !/[.!?]$/.test(needLine) ? '.' : ''

  let build = `Then create a new empty folder called "${folder}" and work only inside it, using plain HTML, CSS and JavaScript — no installs, no frameworks. Make it look great on a phone.`
  if (powers.has('offline')) build += ' It should work completely offline once opened.'
  if (powers.has('readable'))
    build += ' Make all the text big and easy on tired eyes — generous sizes, strong contrast, nothing cramped.'
  if (powers.has('printable')) build += ' It should also look tidy when printed.'
  build += powers.has('remembers')
    ? ' It should remember things between visits — save them in the browser with localStorage, and add a small note that my data never leaves my device.'
    : ' If anything needs to be saved (like a list), use localStorage and add a small note that my data never leaves my device.'
  if (powers.has('surprise'))
    build +=
      " Hide one small, tasteful surprise in it — a confetti moment or a tiny easter egg — and tell me where it is after you're done."

  return `Hi! I'm brand new to this — please be my friendly guide as well as my builder. I want to make ${what.phrase} for ${who.phrase}, with a ${vibe.phrase} feel.${colorLine} ${purpose.phrase}${needLine}${needPunct}

Before you write any code, ask me four to six short questions, one at a time, to sharpen exactly what it should say and contain — the names, the details that matter, and anything only I would know. If my description above is vague, your questions are how we fix that together.

${build}

When you're done, explain what each file does in simple words, show me how to open it in my browser, and suggest three small changes I could ask you for next.`
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink px-3.5 py-1.5 text-sm font-bold transition-colors ${
        pressed ? 'bg-sun' : 'bg-paper hover:bg-paper-deep'
      }`}
    >
      {children}
    </button>
  )
}

interface MixerProps {
  onJump: (id: string) => void
}

function PromptMixer({ onJump }: MixerProps) {
  const [whatId, setWhatId] = useState<string>('page')
  const [whoId, setWhoId] = useState<string>('love')
  const [vibeId, setVibeId] = useState<string>('cozy')
  const [colorId, setColorId] = useState<string>('sunset')
  const [purposeId, setPurposeId] = useState<string>('joy')
  const [need, setNeed] = useState('')
  const [powers, setPowers] = useState<Set<PowerId>>(new Set())

  const what = MIX_WHAT.find((o) => o.id === whatId) ?? MIX_WHAT[0]
  const who = MIX_WHO.find((o) => o.id === whoId) ?? MIX_WHO[0]
  const vibe = MIX_VIBE.find((o) => o.id === vibeId) ?? MIX_VIBE[0]
  const color = MIX_COLORS.find((o) => o.id === colorId) ?? MIX_COLORS[0]
  const purpose = MIX_PURPOSE.find((o) => o.id === purposeId) ?? MIX_PURPOSE[0]
  const mixed = mixPrompt(what, who, vibe, color, purpose, need, powers)

  const togglePower = (id: PowerId) =>
    setPowers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const surpriseMix = () => {
    const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)]
    setWhatId(pick(MIX_WHAT).id)
    setWhoId(pick(MIX_WHO).id)
    setVibeId(pick(MIX_VIBE).id)
    setColorId(pick(MIX_COLORS).id)
    setPurposeId(pick(MIX_PURPOSE).id)
    setPowers(new Set(MIX_POWERS.filter(() => Math.random() < 0.35).map((p) => p.id)))
  }

  // the shelves already hold close matches for this mix — relevance, both ways
  const matches = useMemo(() => {
    const WHO_CATS: Record<string, CategoryId[]> = {
      me: ['words', 'hobby', 'school', 'helpers'],
      love: ['love'],
      family: ['family', 'helpers'],
      friends: ['helpers', 'hobby', 'school', 'thing'],
    }
    const byForm = pantry.filter((p) => p.form === what.id)
    const byPurpose = byForm.filter((p) => (purpose.cats as readonly string[]).includes(p.category))
    const byWho = byForm.filter((p) => (WHO_CATS[who.id] ?? []).includes(p.category))
    const pool = byPurpose.length ? byPurpose : byWho.length ? byWho : byForm
    return pool.slice(0, 3)
  }, [what.id, who.id, purpose])

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
        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            I want to make…
          </legend>
          <div className="flex flex-wrap gap-2">
            {MIX_WHAT.map((o) => (
              <Chip key={o.id} pressed={whatId === o.id} onClick={() => setWhatId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            for…
          </legend>
          <div className="flex flex-wrap gap-2">
            {MIX_WHO.map((o) => (
              <Chip key={o.id} pressed={whoId === o.id} onClick={() => setWhoId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            because…
          </legend>
          <div className="flex flex-wrap gap-2">
            {MIX_PURPOSE.map((o) => (
              <Chip key={o.id} pressed={purposeId === o.id} onClick={() => setPurposeId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-2 block font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            your need, in a sentence — optional but powerful
          </span>
          <input
            type="text"
            value={need}
            maxLength={240}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="e.g. customers keep asking my opening hours · I overspend on takeout…"
            className="w-full rounded-full border-[2.5px] border-ink bg-paper px-4 py-2.5 text-sm font-medium placeholder:text-ink-soft/70"
          />
        </label>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            feeling…
          </legend>
          <div className="flex flex-wrap gap-2">
            {MIX_VIBE.map((o) => (
              <Chip key={o.id} pressed={vibeId === o.id} onClick={() => setVibeId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            colored like…
          </legend>
          <div className="flex flex-wrap gap-2">
            {MIX_COLORS.map((o) => (
              <Chip key={o.id} pressed={colorId === o.id} onClick={() => setColorId(o.id)}>
                {o.dots.length > 0 && (
                  <span className="flex items-center gap-0.5" aria-hidden="true">
                    {o.dots.map((d) => (
                      <span key={d} className="h-3 w-3 rounded-full border border-ink/40" style={{ background: d }} />
                    ))}
                  </span>
                )}
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            extra powers — pick any
          </legend>
          <div className="flex flex-wrap gap-2">
            {MIX_POWERS.map((o) => (
              <Chip key={o.id} pressed={powers.has(o.id)} onClick={() => togglePower(o.id)}>
                {o.label}
                {powers.has(o.id) && <span aria-hidden="true">✓</span>}
              </Chip>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button type="button" onClick={surpriseMix} className="btn-pop px-4 py-1.5 text-sm">
            🎲 surprise mix
          </button>
        </div>

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

        {matches.length > 0 && (
          <div className="border-t-[2.5px] border-line pt-5">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
              already on the shelves — close matches
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {matches.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onJump(p.id)}
                  className="rounded-full border-[2.5px] border-ink bg-paper px-3.5 py-1.5 text-sm font-semibold transition-colors hover:bg-sun"
                >
                  <span aria-hidden="true">{p.emoji} </span>
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}

/* ─── The Pantry page ───────────────────────────────────────────────────── */

const OCCASIONS = ['birthday', 'thank you', 'school', 'travel', 'party', 'family']

export function PromptsPage() {
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')
  const [search, setSearch] = useState('')
  const [spotId, setSpotId] = useState<string | null>(null)
  const spotTimer = useRef<number | undefined>(undefined)

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return pantry.filter(
      (p) =>
        (filter === 'all' || p.category === filter) &&
        (!q || [p.title, p.what, categoryOf(p).label, ...p.tags].join(' ').toLowerCase().includes(q)),
    )
  }, [filter, search])

  // honor a deep link like /prompts/#plant-tracker
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' })
    }, 150)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => () => window.clearTimeout(spotTimer.current), [])

  const spotlight = (p: PantryPrompt | undefined, block: ScrollLogicalPosition = 'center') => {
    if (!p) return
    setSpotId(p.id)
    window.setTimeout(() => document.getElementById(p.id)?.scrollIntoView({ block }), 60)
    window.clearTimeout(spotTimer.current)
    spotTimer.current = window.setTimeout(() => setSpotId(null), 2600)
  }

  const surprise = () => spotlight(visible[Math.floor(Math.random() * visible.length)])

  const jumpFromMixer = (id: string) => {
    setFilter('all')
    setSearch('')
    spotlight(pantry.find((p) => p.id === id))
  }

  return (
    <SubpageShell
      page="prompts"
      eyebrow="the library"
      title="The Prompt Pantry"
      kicker={`${pantry.length} paste-ready prompts, organized by life — not by technology. Search it, browse it, or mix your own.`}
      pip={<Pip size={60} hat="chef" bob />}
    >
      <section className="px-5">
        <div className="mx-auto w-full max-w-6xl">
          <HowToStrip className="mt-12" />
          <p className="mt-6 text-center font-mono text-sm text-ink-soft">
            every prompt here starts in a brand-new empty folder — nothing on your computer is at risk.
          </p>

          {/* search + occasions */}
          <div className="mx-auto mt-12 max-w-xl">
            <label className="sr-only" htmlFor="pantry-search">
              Search the pantry
            </label>
            <input
              id="pantry-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="what's the occasion? try: birthday, exam, trip…"
              className="w-full rounded-full border-[3px] border-ink bg-paper px-5 py-3 font-mono text-sm shadow-pop placeholder:text-ink-soft/80"
            />
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setSearch(o)}
                  className="rounded-full border-2 border-ink bg-paper-deep px-3 py-1 font-mono text-xs font-bold transition-colors hover:bg-sun"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* shelf filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
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

          <p className="mt-4 text-center font-mono text-xs text-ink-soft" aria-live="polite">
            {visible.length === pantry.length
              ? `all ${pantry.length} prompts`
              : `${visible.length} of ${pantry.length} prompts`}
          </p>

          {/* the shelves */}
          <h2 className="sr-only">The shelves</h2>
          {visible.length === 0 ? (
            <div className="card-pop mx-auto mt-10 max-w-md p-6 text-center">
              <p className="font-display text-xl font-extrabold">Nothing on the shelves for “{search}”.</p>
              <p className="mt-2 text-ink-soft">The Mixer below can build exactly that — or clear the search.</p>
              <button type="button" onClick={() => setSearch('')} className="btn-pop mt-4 text-sm">
                ↺ clear the search
              </button>
            </div>
          ) : (
            <motion.div
              key={`${filter}-${search}`}
              variants={staggerKids}
              initial="hidden"
              animate="show"
              className="mt-10 grid items-stretch gap-7 sm:grid-cols-2 xl:grid-cols-3"
            >
              {visible.map((p, i) => (
                <div
                  key={p.id}
                  className={
                    spotId === p.id ? 'outline outline-4 outline-offset-4 outline-tangerine rounded-blob' : ''
                  }
                >
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
          )}

          <PromptMixer onJump={jumpFromMixer} />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-14 max-w-2xl text-center text-ink-soft"
          >
            New here? Take the{' '}
            <a
              href="../#test-drive"
              className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4"
            >
              test drive
            </a>{' '}
            first — it shows you exactly what happens after you paste.
          </motion.p>
        </div>
      </section>
    </SubpageShell>
  )
}
