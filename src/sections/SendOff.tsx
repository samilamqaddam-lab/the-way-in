import { motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { fadeUp, staggerKids, staggerKidsSlow, viewportOnce } from '../lib/motion'
import { chatLinks, mdnCommandLine, tools } from '../data/tools'

const CHECKLIST = [
  'You know what an agent is — a doer, not just an answerer.',
  "You've felt a session: message → permission → result.",
  'You know which tool fits your pocket.',
  'Your first prompt is one paste away.',
]

const linkCls =
  'underline decoration-plum-line decoration-2 underline-offset-4 transition-colors hover:text-sun hover:decoration-sun'

export function SendOff() {
  return (
    <section id="send-off" className="on-dark relative overflow-x-clip border-t-[3px] border-ink bg-plum px-5 py-24 text-on-plum md:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <motion.header
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4 !text-on-plum-dim">
            <span className="text-sun" aria-hidden="true">
              ✳{' '}
            </span>
            the secret
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2.3rem,7vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.015em]"
          >
            The wall was a door
            <br />
            the whole time.
          </motion.h2>
        </motion.header>

        {/* the door, opening */}
        <div className="mx-auto mt-14 w-44 [perspective:900px]" aria-hidden="true">
          <div className="relative h-60">
            <div className="absolute inset-0 rounded-t-full border-[3px] border-ink bg-sun" />
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
              <Pip size={62} tone="ink" mood="cheer" />
            </div>
            <motion.div
              className="absolute inset-0 origin-left rounded-t-full border-[3px] border-ink bg-plum-deep"
              initial={{ rotateY: 0 }}
              whileInView={{ rotateY: -82 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 110, damping: 17, delay: 0.35 }}
            >
              <span className="absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sun" />
            </motion.div>
          </div>
        </div>

        <motion.ul
          variants={staggerKidsSlow}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-14 max-w-md space-y-4 text-left"
        >
          {CHECKLIST.map((item) => (
            <motion.li key={item} variants={fadeUp} className="flex items-start gap-3.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-leaf text-sm font-bold text-paper">
                ✓
              </span>
              <span className="leading-snug">{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 text-center"
        >
          <p className="font-display text-xl font-bold leading-snug md:text-2xl">
            Open a tool. Paste a prompt.
            <br />
            Make a thing for someone you like.
          </p>
          <a href="#first-prompts" className="btn-pop btn-sun mt-6">
            Grab a prompt again ↑
          </a>
        </motion.div>

        <motion.div
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 grid gap-10 border-t-[2.5px] border-plum-line pt-12 text-[0.95rem] sm:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-on-plum-dim">
              the tools
            </h3>
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
              a gentle explainer of what the terminal really is — for whenever you feel like peeking behind the
              curtain.
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
      </div>
    </section>
  )
}
