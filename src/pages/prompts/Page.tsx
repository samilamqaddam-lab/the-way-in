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
import { pick, useLocale } from '../../i18n/locale'
import { categories, categoryOf, pantry } from '../../data/pantry'
import { categoriesFr, pantryFr } from '../../data/fr/pantry'
import type { CategoryId, PantryPrompt } from '../../data/pantry'
import { MIXER } from './mixer'
import type { PowerId } from './mixer'
import { PAGE_COPY } from './Page.copy'

/* ─── The Prompt Mixer ──────────────────────────────────────────────────── */

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
  const locale = useLocale()
  const t = PAGE_COPY[locale]
  const M = MIXER[locale]
  const shelves = pick(locale, pantry, pantryFr)

  const [whatId, setWhatId] = useState<string>('page')
  const [whoId, setWhoId] = useState<string>('love')
  const [vibeId, setVibeId] = useState<string>('cozy')
  const [colorId, setColorId] = useState<string>('sunset')
  const [purposeId, setPurposeId] = useState<string>('joy')
  const [need, setNeed] = useState('')
  const [powers, setPowers] = useState<Set<PowerId>>(new Set())

  const what = M.what.find((o) => o.id === whatId) ?? M.what[0]
  const who = M.who.find((o) => o.id === whoId) ?? M.who[0]
  const vibe = M.vibe.find((o) => o.id === vibeId) ?? M.vibe[0]
  const color = M.colors.find((o) => o.id === colorId) ?? M.colors[0]
  const purpose = M.purpose.find((o) => o.id === purposeId) ?? M.purpose[0]
  const mixed = M.compose({ what, who, vibe, color, purpose, need, powers })

  const togglePower = (id: PowerId) =>
    setPowers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const surpriseMix = () => {
    const pickOne = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)]
    setWhatId(pickOne(M.what).id)
    setWhoId(pickOne(M.who).id)
    setVibeId(pickOne(M.vibe).id)
    setColorId(pickOne(M.colors).id)
    setPurposeId(pickOne(M.purpose).id)
    setPowers(new Set(M.powers.filter(() => Math.random() < 0.35).map((p) => p.id)))
  }

  // the shelves already hold close matches for this mix — relevance, both ways
  const matches = useMemo(() => {
    const WHO_CATS: Record<string, CategoryId[]> = {
      me: ['words', 'hobby', 'school', 'helpers'],
      love: ['love'],
      family: ['family', 'helpers'],
      friends: ['helpers', 'hobby', 'school', 'thing'],
    }
    const byForm = shelves.filter((p) => p.form === what.id)
    const byPurpose = byForm.filter((p) => (purpose.cats as readonly string[]).includes(p.category))
    const byWho = byForm.filter((p) => (WHO_CATS[who.id] ?? []).includes(p.category))
    const pool = byPurpose.length ? byPurpose : byWho.length ? byWho : byForm
    return pool.slice(0, 3)
  }, [shelves, what.id, who.id, purpose])

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      id="mixer"
      aria-labelledby="mixer-title"
      className="card-pop mx-auto mt-20 max-w-3xl scroll-mt-24 overflow-hidden"
    >
      <div className="border-b-[3px] border-ink bg-paper-deep px-6 py-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="mixer-title" className="font-display text-2xl font-extrabold md:text-3xl">
            {t.mixerTitle}
          </h2>
          <Sticker color="grape" rotate={3}>
            {t.mixerSticker}
          </Sticker>
        </div>
        <p className="mt-2 text-ink-soft">{t.mixerSub}</p>
      </div>

      <div className="grid gap-6 p-6 md:p-8">
        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {t.legendWhat}
          </legend>
          <div className="flex flex-wrap gap-2">
            {M.what.map((o) => (
              <Chip key={o.id} pressed={whatId === o.id} onClick={() => setWhatId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {t.legendWho}
          </legend>
          <div className="flex flex-wrap gap-2">
            {M.who.map((o) => (
              <Chip key={o.id} pressed={whoId === o.id} onClick={() => setWhoId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {t.legendBecause}
          </legend>
          <div className="flex flex-wrap gap-2">
            {M.purpose.map((o) => (
              <Chip key={o.id} pressed={purposeId === o.id} onClick={() => setPurposeId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-2 block font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {t.needLabel}
          </span>
          <input
            type="text"
            value={need}
            maxLength={240}
            onChange={(e) => setNeed(e.target.value)}
            placeholder={t.needPlaceholder}
            className="w-full rounded-full border-[2.5px] border-ink bg-paper px-4 py-2.5 text-sm font-medium placeholder:text-ink-soft/70"
          />
        </label>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {t.legendFeeling}
          </legend>
          <div className="flex flex-wrap gap-2">
            {M.vibe.map((o) => (
              <Chip key={o.id} pressed={vibeId === o.id} onClick={() => setVibeId(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {t.legendColors}
          </legend>
          <div className="flex flex-wrap gap-2">
            {M.colors.map((o) => (
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
            {t.legendPowers}
          </legend>
          <div className="flex flex-wrap gap-2">
            {M.powers.map((o) => (
              <Chip key={o.id} pressed={powers.has(o.id)} onClick={() => togglePower(o.id)}>
                {o.label}
                {powers.has(o.id) && <span aria-hidden="true">✓</span>}
              </Chip>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button type="button" onClick={surpriseMix} className="btn-pop px-4 py-1.5 text-sm">
            {t.surpriseMix}
          </button>
        </div>

        <div className="relative">
          <pre
            aria-label={t.mixedAria}
            className="prompt-scroll max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl border-[2.5px] border-ink bg-paper-deep p-3.5 font-mono text-[0.78rem] leading-relaxed"
          >
            {mixed}
          </pre>
          <div className="pointer-events-none absolute inset-x-0.5 bottom-0.5 h-8 rounded-b-xl bg-gradient-to-t from-paper-deep to-transparent" />
        </div>
        <CopyButton text={mixed} label={t.copyMixed} />
        <p className="text-center text-sm text-ink-soft">{t.pasteAdvice}</p>

        {matches.length > 0 && (
          <div className="border-t-[2.5px] border-line pt-5">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
              {t.matchesHeader}
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

export function PromptsPage() {
  const locale = useLocale()
  const t = PAGE_COPY[locale]
  const shelves = pick(locale, pantry, pantryFr)
  const cats = pick(locale, categories, categoriesFr)

  const [filter, setFilter] = useState<CategoryId | 'all'>('all')
  const [spotId, setSpotId] = useState<string | null>(null)
  const spotTimer = useRef<number | undefined>(undefined)

  const visible = useMemo(
    () => (filter === 'all' ? shelves : shelves.filter((p) => p.category === filter)),
    [shelves, filter],
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
    spotlight(shelves.find((p) => p.id === id))
  }

  return (
    <SubpageShell
      page="prompts"
      eyebrow={t.eyebrow}
      title={t.title}
      kicker={`${shelves.length} ${t.kickerTail}`}
      pip={<Pip size={60} hat="chef" bob />}
    >
      <section className="px-5">
        <div className="mx-auto w-full max-w-6xl">
          <HowToStrip className="mt-12" />
          <p className="mt-6 text-center font-mono text-sm text-ink-soft">{t.safetyLine}</p>

          {/* two ways in: browse, or jump straight to the mixer */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#mixer" className="btn-pop btn-tangerine">
              {t.mixCta}
            </a>
            <a href="#shelves" className="btn-pop">
              {t.browseCta}
            </a>
          </div>

          {/* the shelf toolbar — one quiet control, not confetti */}
          <div
            id="shelves"
            className="mx-auto mt-12 flex max-w-3xl scroll-mt-24 flex-wrap items-center justify-center gap-1.5 rounded-2xl border-2 border-line bg-paper-deep/60 p-2"
            role="group"
            aria-label={t.filterAria}
          >
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`rounded-full border-2 px-3 py-1 font-mono text-[0.7rem] font-bold ${
                filter === 'all' ? 'border-ink bg-sun' : 'border-transparent hover:border-ink/40'
              }`}
            >
              {t.everything}
            </button>
            {cats.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={`rounded-full border-2 px-3 py-1 font-mono text-[0.7rem] font-bold ${
                  filter === c.id ? 'border-ink bg-sun' : 'border-transparent hover:border-ink/40'
                }`}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          <p className="mt-3 text-center font-mono text-xs text-ink-soft" aria-live="polite">
            {visible.length === shelves.length ? t.countAll(shelves.length) : t.countSome(visible.length, shelves.length)}{' '}
            ·{' '}
            <button type="button" onClick={surprise} className="underline decoration-dotted underline-offset-2 hover:text-ink">
              {t.surpriseMe}
            </button>
          </p>

          {/* the shelves */}
          <h2 className="sr-only">{t.shelvesSr}</h2>
          <motion.div
            key={filter}
            variants={staggerKids}
            initial="hidden"
            animate="show"
            className="mt-10 grid items-stretch gap-7 sm:grid-cols-2 xl:grid-cols-3"
          >
            {visible.map((p, i) => (
              <div
                key={p.id}
                className={spotId === p.id ? 'outline outline-4 outline-offset-4 outline-tangerine rounded-blob' : ''}
              >
                <PromptCard
                  data={p}
                  anchorId={p.id}
                  badge={p.classic ? t.classicBadge : undefined}
                  thumb={<EmojiThumb emoji={p.emoji} tint={categoryOf(p).tint} />}
                  rotate={[-0.6, 0.5, -0.4, 0.7][i % 4]}
                />
              </div>
            ))}
          </motion.div>

          <PromptMixer onJump={jumpFromMixer} />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-14 max-w-2xl text-center text-ink-soft"
          >
            {t.bottomA}
            <a
              href="../#test-drive"
              className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4"
            >
              {t.bottomLink}
            </a>
            {t.bottomB}
          </motion.p>
        </div>
      </section>
    </SubpageShell>
  )
}
