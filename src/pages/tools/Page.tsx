import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { SubpageShell } from '../../components/SubpageShell'
import { GlossaryTip } from '../../components/GlossaryTip'
import { Sticker } from '../../components/Sticker'
import { Pip } from '../../components/Pip'
import { fadeUp, staggerKids, viewportOnce } from '../../lib/motion'
import { pick, useLocale } from '../../i18n/locale'
import { moreWaysIn, tools } from '../../data/tools'
import { moreWaysInFr, toolsFr } from '../../data/fr/tools'
import type { WayIn } from '../../data/tools'
import type { Locale } from '../../i18n/locale'
import { room } from '../../lib/links'

const KIND_META: Record<WayIn['kind'], { icon: string; chip: string }> = {
  app: { icon: '📱', chip: 'bg-sun' },
  inside: { icon: '💬', chip: 'bg-blush' },
  terminal: { icon: '⌨️', chip: 'bg-sky' },
  self: { icon: '🏠', chip: 'bg-grape text-paper' },
}

interface ToolsCopy {
  eyebrow: string
  title: string
  kicker: string
  legend: Record<WayIn['kind'], string>
  setupTruth: ReactNode
  wordOnWord: ReactNode
  laterSticker: string
  visitSite: string
  setupGuide: string
  editorsTitle: string
  editorsSticker: string
  editorsBody: string
  editorsFoot: string
  bottomA: string
  bottomFirstDay: string
  bottomB: string
  bottomDecoder: string
  bottomC: string
}

const COPY = {
  en: {
    eyebrow: 'orientation',
    title: 'The Toolshed',
    kicker:
      'Every door to an agent in one place — as an app, inside an app you already have, or in the terminal — with honest notes on what setup takes.',
    legend: { app: 'its own app', inside: 'inside an app you have', terminal: 'the terminal', self: 'self-hosted' },
    setupTruth: (
      <>
        The setup truth, once for everything: <strong className="text-ink">apps</strong> are a download and a sign-in.{' '}
        <strong className="text-ink">Terminal</strong> tools are one copy-paste{' '}
        <GlossaryTip k="command">command</GlossaryTip> from their official guide — about five minutes, once, then you
        just type the tool's name. Nothing here needs you to know how to code.
      </>
    ),
    wordOnWord: (
      <>
        A word on the word: out in the wild, “agent” covers many kinds of AI-that-does-things — browsing, research,
        automations. The ones here are the <em>building</em> kind (you'll see them called “coding agents”) — the
        friendliest place to start, and everything you learn transfers.
      </>
    ),
    laterSticker: 'for later',
    visitSite: 'Visit site ↗',
    setupGuide: 'official setup guide ↗',
    editorsTitle: 'Editors & beyond',
    editorsSticker: 'a road for later',
    editorsBody:
      "Agents also live inside code editors and other terminals. You don't need any of these to start — but when you're curious where the road continues:",
    editorsFoot: 'tools change fast — the skill (say what you want, decide when asked) moves with you.',
    bottomA: 'Picked a door? See ',
    bottomFirstDay: 'Your First Day',
    bottomB: ' for what happens next, and keep ',
    bottomDecoder: 'the decoder',
    bottomC: ' in your pocket.',
  },
  fr: {
    eyebrow: 'orientation',
    title: 'La Cabane à Outils',
    kicker:
      'Toutes les portes vers un agent au même endroit — en appli, dans une appli que tu as déjà, ou dans le terminal — avec des notes honnêtes sur ce que demande l’installation.',
    legend: { app: 'son appli à lui', inside: 'dans une appli que tu as', terminal: 'le terminal', self: 'auto-hébergé' },
    setupTruth: (
      <>
        La vérité sur l’installation, une fois pour toutes : les <strong className="text-ink">applis</strong>, c’est un
        téléchargement et une connexion. Les outils <strong className="text-ink">terminal</strong>, c’est une{' '}
        <GlossaryTip k="command">commande</GlossaryTip> à copier-coller depuis leur guide officiel — environ cinq
        minutes, une seule fois, puis tu tapes juste le nom de l’outil. Rien ici ne demande de savoir coder.
      </>
    ),
    wordOnWord: (
      <>
        Un mot sur le mot : dans la nature, « agent » recouvre plein d’IA-qui-font-des-choses — navigation, recherche,
        automatisations. Ceux d’ici sont du genre <em>bâtisseur</em> (tu les verras appelés « agents de code ») —
        l’endroit le plus accueillant pour commencer, et tout ce que tu y apprends voyage avec toi.
      </>
    ),
    laterSticker: 'pour plus tard',
    visitSite: 'Voir le site ↗',
    setupGuide: 'guide d’installation officiel ↗',
    editorsTitle: 'Éditeurs & au-delà',
    editorsSticker: 'une route pour plus tard',
    editorsBody:
      'Les agents vivent aussi dans des éditeurs de code et d’autres terminaux. Tu n’as besoin d’aucun d’eux pour commencer — mais quand la curiosité te prendra de savoir où continue la route :',
    editorsFoot: 'les outils changent vite — la compétence (dire ce que tu veux, décider quand on te demande) te suit partout.',
    bottomA: 'Une porte choisie ? Va voir ',
    bottomFirstDay: 'Ton Premier Jour',
    bottomB: ' pour la suite, et garde ',
    bottomDecoder: 'le décodeur',
    bottomC: ' dans ta poche.',
  },
} satisfies Record<Locale, ToolsCopy>

export function ToolsPage() {
  const locale = useLocale()
  const t = COPY[locale]
  const localTools = pick(locale, tools, toolsFr)
  const editors = pick(locale, moreWaysIn, moreWaysInFr)
  return (
    <SubpageShell page="tools" eyebrow={t.eyebrow} title={t.title} kicker={t.kicker} pip={<Pip size={60} hat="hard" look="left" bob />}>
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
            {(['app', 'inside', 'terminal', 'self'] as const).map((kind) => (
              <span key={kind} className={`rounded-full border-2 border-ink px-3 py-1 ${KIND_META[kind].chip}`}>
                {KIND_META[kind].icon} {t.legend[kind]}
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
            {t.setupTruth}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-4 max-w-2xl text-center text-sm text-ink-soft"
          >
            {t.wordOnWord}
          </motion.p>

          {/* tool cards with ways-in */}
          <motion.div
            variants={staggerKids}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid items-stretch gap-6 md:grid-cols-2"
          >
            {localTools.map((tool, i) => (
              <motion.article
                key={tool.id}
                variants={fadeUp}
                className="card-pop relative flex flex-col gap-3.5 p-6 pt-7"
                style={{ rotate: `${[-0.6, 0.5, -0.4, 0.7][i]}deg` }}
              >
                {tool.forLater && (
                  <Sticker color="grape" rotate={6} className="absolute -top-3.5 right-5">
                    {t.laterSticker}
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
                    {t.visitSite}
                  </a>
                  {tool.docsUrl && (
                    <a
                      className="font-mono text-xs underline decoration-2 underline-offset-4 hover:text-tangerine-deep"
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.setupGuide}
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
              <h2 className="font-display text-2xl font-extrabold">{t.editorsTitle}</h2>
              <Sticker color="grape" rotate={3}>
                {t.editorsSticker}
              </Sticker>
            </div>
            <p className="mt-2 text-ink-soft">{t.editorsBody}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {editors.map((m) => (
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
            <p className="mt-4 font-mono text-xs text-ink-soft">{t.editorsFoot}</p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-12 max-w-2xl text-center text-ink-soft"
          >
            {t.bottomA}
            <a href={room('first-day').fromSub} className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
              {t.bottomFirstDay}
            </a>
            {t.bottomB}
            <a href={room('help').fromSub} className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
              {t.bottomDecoder}
            </a>
            {t.bottomC}
          </motion.p>
        </div>
      </section>
    </SubpageShell>
  )
}
