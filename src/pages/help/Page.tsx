import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SubpageShell } from '../../components/SubpageShell'
import { GlossaryTip } from '../../components/GlossaryTip'
import { CopyButton } from '../../components/CopyButton'
import { Pip } from '../../components/Pip'
import { fadeUp, popSpring, staggerKids, viewportOnce } from '../../lib/motion'
import { glossary } from '../../data/glossary'
import { mdnCommandLine } from '../../data/tools'

const HELP_DESK_PROMPT = `Please pause and explain what just happened like I'm completely new to this — what you did, what that message means, and what my options are now. Plain words, no jargon.`

function Accordion({ emoji, q, children }: { emoji: string; q: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <motion.div variants={fadeUp} className="card-pop overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3.5 p-5 text-left"
      >
        <span className="text-2xl" aria-hidden="true">
          {emoji}
        </span>
        <span className="flex-1 font-display text-lg font-bold leading-snug">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-bold transition-transform ${
            open ? 'rotate-45 bg-sun' : 'bg-paper'
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={popSpring}
            className="space-y-3 border-t-[2.5px] border-line px-5 pb-5 pt-4 leading-relaxed text-ink-soft [&_strong]:text-ink"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function HelpPage() {
  return (
    <SubpageShell
      page="help"
      eyebrow="the decoder"
      title="“It asked me something weird.”"
      kicker="Whatever just happened in your session, there's a calm answer here. Spoiler for every entry: nothing is broken."
      pip={<Pip size={60} look="ahead" bob />}
    >
      <section className="px-5">
        <motion.div
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-12 grid w-full max-w-3xl gap-4"
        >
          <Accordion emoji="🪪" q="It's asking permission for something">
            <p>
              That's not a warning — that's the system <strong>working</strong>. Agents ask before they create, change
              or run anything. “Allow” means it may do that one specific thing; “not now” means nothing happens at all.
            </p>
            <p>
              Unsure? Say no and ask: <em>“explain what you want to do and why, in plain words.”</em> You cannot lose
              anything by refusing.
            </p>
          </Accordion>

          <Accordion emoji="⌨️" q="It wants to run a command">
            <p>
              A <GlossaryTip k="command">command</GlossaryTip> is just a typed instruction — “make a folder”, “open
              this page”. Inside your empty practice folder, that's exactly what you hired the agent to do.
            </p>
            <p>
              If it ever wants to run something you don't understand, the magic sentence is:{' '}
              <em>“what will this command do?”</em> — it will happily explain before touching anything. Curious what
              commands really are?{' '}
              <a
                className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4"
                href={mdnCommandLine.url}
                target="_blank"
                rel="noreferrer"
              >
                MDN's gentle crash course ↗
              </a>
            </p>
          </Accordion>

          <Accordion emoji="🟥" q="Red text appeared — an error!">
            <p>
              An <GlossaryTip k="error">error</GlossaryTip> is the computer saying “I couldn't do that.” It's a
              message, not damage — nothing on your machine got hurt by it.
            </p>
            <p>
              The professional move (genuinely — it's what programmers do):{' '}
              <em>“this appeared: [paste the red text] — what does it mean and can you fix it?”</em> Fixing errors is
              half of an agent's job.
            </p>
          </Accordion>

          <Accordion emoji="📦" q="It said npm, Node, or “let's install something”">
            <p>
              <GlossaryTip k="npm">npm</GlossaryTip> is a giant free library of code building-blocks. Bigger projects
              borrow pieces from it; your first projects don't need to — that's why every starter prompt here says
              “no installs”.
            </p>
            <p>
              If an agent suggests installing something, it's not dangerous — it's just a bigger step than you need
              today. <em>“Let's do it without installing anything”</em> is a perfectly good reply, and it will adapt.
            </p>
          </Accordion>

          <Accordion emoji="🗂️" q="It made files I don't recognize">
            <p>
              Ask it: <em>“what is each file for, in simple words?”</em> — you'll get a friendly tour. Some projects
              include small helper files; that's normal, like the title page of a book.
            </p>
            <p>
              Everything lives inside your project <GlossaryTip k="folder">folder</GlossaryTip>. Nothing is hiding
              elsewhere on your computer.
            </p>
          </Accordion>

          <Accordion emoji="🚪" q="I closed everything — is my work gone?">
            <p>
              No. Your work is <GlossaryTip k="file">files</GlossaryTip> in your folder — it exists whether or not any
              chat window is open. The conversation may end; the folder doesn't.
            </p>
            <p>
              Next time, open your tool and say: <em>“let's continue with the project in the folder my-first-site.”</em>{' '}
              It will look inside and pick right up.
            </p>
          </Accordion>

          <Accordion emoji="🐌" q="It seems stuck, or it's taking forever">
            <p>
              Thinking pauses are normal — sometimes it's reading, planning, or double-checking. Give a big ask a
              minute or two.
            </p>
            <p>
              Every tool has a stop button, and stopping is always safe: your files stay as they are. Afterwards, ask{' '}
              <em>“where were we?”</em> and carry on.
            </p>
          </Accordion>

          <Accordion emoji="🔒" q="Is this safe? Is it private?">
            <p>
              Honest answer: the messages you type and the files in your project are sent to the AI company — that's
              how the agent thinks. Your <strong>other</strong> files aren't part of the conversation, and agents ask
              before touching anything at all.
            </p>
            <p>
              That's exactly why the empty practice folder is such a good trick: nothing sensitive is ever involved.
              And the one rule worth keeping forever: don't paste passwords or private numbers into any chat — this
              one, or any other.
            </p>
          </Accordion>

          <Accordion emoji="🧹" q="I want to start over">
            <p>
              Delete the project folder. That's it — it's like the whole experiment never happened. Your computer
              doesn't remember it, and no cleanup is needed anywhere else.
            </p>
            <p>
              You can even ask the agent: <em>“delete the project folder, let's start fresh.”</em> It will — after
              asking your permission first, naturally.
            </p>
          </Accordion>
        </motion.div>

        {/* the secret thesis */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="card-pop mx-auto mt-16 max-w-3xl bg-paper-deep p-6 text-center md:p-8"
        >
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">
            The best help desk is the agent itself.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Whatever just happened — confusion is a perfectly good prompt. Keep this one in your pocket:
          </p>
          <pre className="prompt-scroll mx-auto mt-5 max-w-xl whitespace-pre-wrap rounded-xl border-[2.5px] border-ink bg-paper p-3.5 text-left font-mono text-[0.78rem] leading-relaxed">
            {HELP_DESK_PROMPT}
          </pre>
          <CopyButton text={HELP_DESK_PROMPT} label="Copy the help-desk prompt" className="mx-auto mt-4 max-w-xl" />
        </motion.div>

        {/* the little dictionary */}
        <div className="mx-auto mt-20 w-full max-w-5xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center font-display text-2xl font-extrabold md:text-3xl"
          >
            The little dictionary
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-2 text-center text-ink-soft"
          >
            Every bit of jargon on this site, each in one friendly sentence.
          </motion.p>
          <motion.div
            variants={staggerKids}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Object.entries(glossary).map(([key, entry]) => (
              <motion.div key={key} variants={fadeUp} className="card-pop p-4">
                <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-tangerine-deep">
                  {entry.term}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{entry.def}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </SubpageShell>
  )
}
