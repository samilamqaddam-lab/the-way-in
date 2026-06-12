import { motion } from 'motion/react'
import { LangToggle } from './LangToggle'
import { Wordmark } from './Wordmark'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'
import { chatLinks, mdnCommandLine, tools } from '../data/tools'
import { chatLinksFr, mdnCommandLineFr, toolsFr } from '../data/fr/tools'
import { HOME, ROOMS, roomTitle } from '../lib/links'
import { pick, useLocale } from '../i18n/locale'
import type { Locale } from '../i18n/locale'

const linkCls =
  'underline decoration-plum-line decoration-2 underline-offset-4 transition-colors hover:text-sun hover:decoration-sun'

const FOOTER_COPY = {
  en: {
    srTitle: 'Around the site',
    explore: 'keep exploring',
    backHome: '← the way in',
    theTools: 'the tools',
    theDocs: '· the docs',
    chatsYouKnow: 'the chats you know',
    chatNote: 'writing good messages there is the exact same skill.',
    curious: 'when you get curious',
    mdnNote: 'a gentle explainer of what the terminal really is — for whenever you feel like peeking behind the curtain.',
    honesty: 'No accounts. No tracking. Nothing for sale.',
    builtWith: 'Built with one of these tools, naturally.',
  },
  fr: {
    srTitle: 'Autour du site',
    explore: 'continuer l’exploration',
    backHome: '← the way in',
    theTools: 'les outils',
    theDocs: '· la doc',
    chatsYouKnow: 'les chats que tu connais',
    chatNote: 'écrire de bons messages là-bas, c’est exactement la même compétence.',
    curious: 'quand la curiosité te prend',
    mdnNote: 'une explication douce de ce qu’est vraiment le terminal — pour le jour où tu voudras regarder derrière le rideau.',
    honesty: 'Pas de compte. Pas de tracking. Rien à vendre.',
    builtWith: 'Construit avec l’un de ces outils, forcément.',
  },
} satisfies Record<Locale, Record<string, string>>

interface SiteFooterProps {
  /** which page family we're on — picks the right relative paths */
  from: 'root' | 'sub'
  /** current room id, to skip self-links in the explore column */
  current?: string
}

/** The shared link garden + honesty footer. Lives on plum, on every page. */
export function SiteFooter({ from, current }: SiteFooterProps) {
  const locale = useLocale()
  const t = FOOTER_COPY[locale]
  const localTools = pick(locale, tools, toolsFr)
  const localChats = pick(locale, chatLinks, chatLinksFr)
  const mdn = pick(locale, mdnCommandLine, mdnCommandLineFr)
  const roomHref = (r: (typeof ROOMS)[number]) => (from === 'root' ? r.fromRoot : r.fromSub)
  return (
    <>
      <h2 className="sr-only">{t.srTitle}</h2>
      <motion.div
        variants={staggerKids}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-20 grid gap-10 border-t-[2.5px] border-plum-line pt-12 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            {t.explore}
          </h3>
          <ul className="space-y-2.5">
            {from === 'sub' && (
              <li>
                <a className={linkCls} href={HOME.fromSub}>
                  {t.backHome}
                </a>
              </li>
            )}
            {ROOMS.filter((r) => r.id !== current).map((r) => (
              <li key={r.id}>
                <a className={linkCls} href={roomHref(r)}>
                  {roomTitle(r, locale)}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            {t.theTools}
          </h3>
          <ul className="space-y-2.5">
            {localTools.map((tool) => (
              <li key={tool.id}>
                <a className={linkCls} href={tool.url} target="_blank" rel="noreferrer">
                  {tool.name}
                </a>
                {tool.docsUrl && (
                  <>
                    {' '}
                    <a
                      className="font-mono text-xs text-on-plum-dim underline decoration-plum-line underline-offset-4 hover:text-sun"
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.theDocs}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            {t.chatsYouKnow}
          </h3>
          <ul className="space-y-2.5">
            {localChats.map((link) => (
              <li key={link.name}>
                <a className={linkCls} href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-on-plum-dim">{t.chatNote}</p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            {t.curious}
          </h3>
          <a className={linkCls} href={mdn.url} target="_blank" rel="noreferrer">
            {mdn.name}
          </a>
          <p className="mt-3 text-xs leading-relaxed text-on-plum-dim">{t.mdnNote}</p>
        </motion.div>
      </motion.div>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t-[2.5px] border-plum-line pt-7 font-mono text-xs text-on-plum-dim">
        <Wordmark dark />
        <span>{t.honesty}</span>
        <span>{t.builtWith}</span>
        <LangToggle dark />
      </footer>
    </>
  )
}
