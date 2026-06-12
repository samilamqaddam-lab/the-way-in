import { motion } from 'motion/react'
import { SubpageShell } from '../../components/SubpageShell'
import { GlossaryTip } from '../../components/GlossaryTip'
import { Sticker } from '../../components/Sticker'
import { Pip } from '../../components/Pip'
import { fadeUp, staggerKids, viewportOnce } from '../../lib/motion'
import { moreWaysIn, tools } from '../../data/tools'
import type { WayIn } from '../../data/tools'
import { room } from '../../lib/links'

const KIND_META: Record<WayIn['kind'], { icon: string; chip: string }> = {
  app: { icon: '📱', chip: 'bg-sun' },
  inside: { icon: '💬', chip: 'bg-blush' },
  terminal: { icon: '⌨️', chip: 'bg-sky' },
  self: { icon: '🏠', chip: 'bg-grape text-paper' },
}

export function ToolsPage() {
  return (
    <SubpageShell
      page="tools"
      eyebrow="orientation"
      title="The Toolshed"
      kicker="Every door to an agent in one place — as an app, inside an app you already have, or in the terminal — with honest notes on what setup takes."
      pip={<Pip size={60} hat="hard" look="left" bob />}
    >
      <section className="px-5">
        <div className="mx-auto w-full max-w-5xl">
          {/* the legend */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-center font-mono text-[0.7rem] font-bold"
          >
            {(
              [
                ['app', 'its own app'],
                ['inside', 'inside an app you have'],
                ['terminal', 'the terminal'],
                ['self', 'self-hosted'],
              ] as const
            ).map(([kind, label]) => (
              <span key={kind} className={`rounded-full border-2 border-ink px-3 py-1 ${KIND_META[kind].chip}`}>
                {KIND_META[kind].icon} {label}
              </span>
            ))}
          </motion.div>

          {/* the honest setup truth, once */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-6 max-w-2xl text-center text-ink-soft"
          >
            The setup truth, once for everything: <strong className="text-ink">apps</strong> are a download and a
            sign-in. <strong className="text-ink">Terminal</strong> tools are one copy-paste{' '}
            <GlossaryTip k="command">command</GlossaryTip> from their official guide — about five minutes, once, then
            you just type the tool's name. Nothing here needs you to know how to code.
          </motion.p>

          {/* tool cards with ways-in */}
          <motion.div
            variants={staggerKids}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid items-stretch gap-6 md:grid-cols-2"
          >
            {tools.map((tool, i) => (
              <motion.article
                key={tool.id}
                variants={fadeUp}
                className="card-pop relative flex flex-col gap-3.5 p-6 pt-7"
                style={{ rotate: `${[-0.6, 0.5, -0.4, 0.7][i]}deg` }}
              >
                {tool.forLater && (
                  <Sticker color="grape" rotate={6} className="absolute -top-3.5 right-5">
                    for later
                  </Sticker>
                )}
                <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-display text-2xl font-extrabold leading-tight">{tool.name}</h2>
                  <span className="font-mono text-xs text-ink-soft">{tool.by}</span>
                  <span
                    className={`ml-auto rounded-full border-2 border-ink px-2.5 py-0.5 text-xs font-bold ${
                      tool.costTone === 'included' ? 'bg-sun' : 'bg-leaf text-ink'
                    }`}
                  >
                    {tool.cost}
                  </span>
                </header>

                <ul className="space-y-2.5">
                  {tool.waysIn.map((way) => (
                    <li key={way.label} className="flex items-start gap-3 rounded-xl border-2 border-line bg-paper-deep/60 p-3">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink text-base ${KIND_META[way.kind].chip}`}
                        aria-hidden="true"
                      >
                        {KIND_META[way.kind].icon}
                      </span>
                      <span>
                        <span className="block text-sm font-bold leading-snug">{way.label}</span>
                        <span className="block text-sm leading-snug text-ink-soft">{way.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-1">
                  <a className="btn-pop btn-ink text-sm" href={tool.url} target="_blank" rel="noreferrer">
                    Visit site ↗
                  </a>
                  {tool.docsUrl && (
                    <a
                      className="font-mono text-xs underline decoration-2 underline-offset-4 hover:text-tangerine-deep"
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      official setup guide ↗
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* editors & beyond */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="card-pop mx-auto mt-12 max-w-3xl bg-paper-deep p-6 md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold">Editors & beyond</h2>
              <Sticker color="grape" rotate={3}>
                a road for later
              </Sticker>
            </div>
            <p className="mt-2 text-ink-soft">
              Agents also live inside code editors and other terminals. You don't need any of these to start — but
              when you're curious where the road continues:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {moreWaysIn.map((m) => (
                <li key={m.name} className="rounded-xl border-2 border-line bg-paper p-3.5">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline decoration-tangerine decoration-2 underline-offset-4"
                  >
                    {m.name} ↗
                  </a>
                  <p className="mt-1 text-sm leading-snug text-ink-soft">{m.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-ink-soft">
              tools change fast — the skill (say what you want, decide when asked) moves with you.
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-12 max-w-2xl text-center text-ink-soft"
          >
            Picked a door? See{' '}
            <a href={room('first-day').fromSub} className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
              Your First Day
            </a>{' '}
            for what happens next, and keep{' '}
            <a href={room('help').fromSub} className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
              the decoder
            </a>{' '}
            in your pocket.
          </motion.p>
        </div>
      </section>
    </SubpageShell>
  )
}
