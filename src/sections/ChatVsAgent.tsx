import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { GlossaryTip } from '../components/GlossaryTip'
import { Squiggle } from '../components/Squiggle'
import { Pip } from '../components/Pip'
import { fadeUp, viewportOnce } from '../lib/motion'

const REQUEST = '“make a birthday page for my friend Maya”'

const CHAT_LINES = [
  "Sure! Here's how to make one:",
  '1. Install a code editor (like VS Code)',
  '2. Create a file called index.html',
  '3. Copy this code into it: <!doctype html>…',
  '4. Now create another file, style.css…',
  '5. Link it inside the <head> section…',
  '6. Open the file in your browser',
  '…and twelve more steps.',
]

const AGENT_LINES: Array<{ text: string; cls: string }> = [
  { text: '❯ make a birthday page for my friend Maya', cls: 'text-on-plum-dim' },
  { text: 'On it. Okay to create a folder called birthday-page?', cls: 'text-on-plum' },
  { text: '[ you tap Allow ✓ ]', cls: 'text-sun' },
  { text: '✓ folder created', cls: 'text-term-green' },
  { text: '✓ index.html written', cls: 'text-term-green' },
  { text: '✓ style.css written', cls: 'text-term-green' },
  { text: "✓ done — Maya's page is ready 🎂", cls: 'text-term-yellow' },
]

const chatStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}

const agentStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.7 } },
}

const lineIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 26 } },
}

export function ChatVsAgent() {
  return (
    <SectionShell
      id="chat-vs-agent"
      eyebrow="the difference"
      title="A chat answers. An agent does."
      kicker="Same message, two very different mornings."
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-12 max-w-md"
      >
        <div className="rounded-full border-[2.5px] border-dashed border-ink/50 bg-paper-deep/60 px-5 py-3 text-center font-mono text-sm">
          {REQUEST}
        </div>
        <p className="mt-2.5 text-center font-mono text-xs text-ink-soft">the same message, sent to two places ↓</p>
      </motion.div>

      <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
        {/* The chat: helpful words, homework for you */}
        <motion.div
          variants={chatStagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="card-pop p-5 md:-rotate-[0.6deg]"
        >
          <div className="mb-4 flex items-center gap-3 border-b-[3px] border-line pb-3.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border-[2.5px] border-ink bg-sky font-display text-base font-bold text-paper">
              C
            </span>
            <div>
              <p className="font-bold leading-tight">A chat</p>
              <p className="text-xs text-ink-soft">answers in words</p>
            </div>
          </div>
          <motion.div variants={lineIn} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md border-[2.5px] border-ink bg-sun px-3.5 py-2 text-sm font-medium">
            make a birthday page for my friend Maya
          </motion.div>
          <div className="mt-3 rounded-2xl rounded-bl-md border-[2.5px] border-line bg-paper-deep p-4">
            <ul className="space-y-1.5 text-sm leading-snug">
              {CHAT_LINES.map((line, i) => (
                <motion.li key={line} variants={lineIn} style={{ opacity: Math.max(0.35, 1 - i * 0.09) }}>
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.p variants={lineIn} className="mt-4 font-medium">
            Genuinely helpful. <span className="text-ink-soft">But every step is still yours to do.</span>
          </motion.p>
        </motion.div>

        {/* The agent: same message, the steps just… happen */}
        <motion.div
          variants={agentStagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="on-dark rounded-[1.4rem] border-[3px] border-ink bg-plum p-5 text-on-plum shadow-pop md:rotate-[0.6deg]"
        >
          <div className="mb-4 flex items-center gap-3 border-b-[3px] border-plum-line pb-3.5">
            <Pip size={36} tone="tangerine" />
            <div>
              <p className="font-bold leading-tight">An agent</p>
              <p className="text-xs text-on-plum-dim">does things — with your okay</p>
            </div>
          </div>
          <ul className="space-y-2.5 font-mono text-[0.85rem] leading-snug">
            {AGENT_LINES.map((line) => (
              <motion.li key={line.text} variants={lineIn} className={line.cls}>
                {line.text}
              </motion.li>
            ))}
          </ul>
          <motion.p variants={lineIn} className="mt-4 font-medium text-on-plum">
            It does the steps. <span className="text-on-plum-dim">You do the deciding.</span>
          </motion.p>
        </motion.div>
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-14 max-w-2xl text-center text-lg leading-relaxed"
      >
        That doer is an <GlossaryTip k="agent">agent</GlossaryTip>. The message you typed? That's a{' '}
        <GlossaryTip k="prompt">prompt</GlossaryTip> — you've been writing them all along. And the place agents often
        live, the <GlossaryTip k="terminal">terminal</GlossaryTip>, is just a text window. You'll meet one safely in a
        second.
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 text-center font-display text-2xl font-extrabold md:text-3xl"
      >
        Same message. Same skill.{' '}
        <span className="relative inline-block whitespace-nowrap px-2">
          New superpower.
          <Squiggle
            kind="circle"
            className="absolute -inset-x-1 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+0.5rem)] text-grape"
            strokeWidth={4}
            delay={0.35}
          />
        </span>
      </motion.p>
    </SectionShell>
  )
}
