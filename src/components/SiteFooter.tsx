import { motion } from 'motion/react'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'
import { chatLinks, mdnCommandLine, tools } from '../data/tools'
import { HOME, ROOMS } from '../lib/links'

const linkCls =
  'underline decoration-plum-line decoration-2 underline-offset-4 transition-colors hover:text-sun hover:decoration-sun'

interface SiteFooterProps {
  /** which page family we're on — picks the right relative paths */
  from: 'root' | 'sub'
  /** current room id, to skip self-links in the explore column */
  current?: string
}

/** The shared link garden + honesty footer. Lives on plum, on every page. */
export function SiteFooter({ from, current }: SiteFooterProps) {
  const roomHref = (r: (typeof ROOMS)[number]) => (from === 'root' ? r.fromRoot : r.fromSub)
  return (
    <>
      <motion.div
        variants={staggerKids}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-20 grid gap-10 border-t-[2.5px] border-plum-line pt-12 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            keep exploring
          </h3>
          <ul className="space-y-2.5">
            {from === 'sub' && (
              <li>
                <a className={linkCls} href={HOME.fromSub}>
                  ← the way in
                </a>
              </li>
            )}
            {ROOMS.filter((r) => r.id !== current).map((r) => (
              <li key={r.id}>
                <a className={linkCls} href={roomHref(r)}>
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">the tools</h3>
          <ul className="space-y-2.5">
            {tools.map((tool) => (
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
                      · the docs
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            the chats you know
          </h3>
          <ul className="space-y-2.5">
            {chatLinks.map((link) => (
              <li key={link.name}>
                <a className={linkCls} href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-on-plum-dim">
            writing good messages there is the exact same skill.
          </p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
            when you get curious
          </h3>
          <a className={linkCls} href={mdnCommandLine.url} target="_blank" rel="noreferrer">
            {mdnCommandLine.name}
          </a>
          <p className="mt-3 text-xs leading-relaxed text-on-plum-dim">
            a gentle explainer of what the terminal really is — for whenever you feel like peeking behind the curtain.
          </p>
        </motion.div>
      </motion.div>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t-[2.5px] border-plum-line pt-7 font-mono text-xs text-on-plum-dim">
        <span>
          the·way·in{' '}
          <span className="text-sun" aria-hidden="true">
            ✳
          </span>
        </span>
        <span>No accounts. No tracking. Nothing for sale.</span>
        <span>Built with one of these tools, naturally.</span>
      </footer>
    </>
  )
}
