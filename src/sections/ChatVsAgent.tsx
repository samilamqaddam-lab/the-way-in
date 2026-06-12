import { motion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { GlossaryTip } from '../components/GlossaryTip'
import { Squiggle } from '../components/Squiggle'
import { fadeUp, viewportOnce } from '../lib/motion'
import { Theater } from './ChatVsAgentTheater'

const REQUEST = '“make a birthday page for my friend Maya”'

export function ChatVsAgent() {
  return (
    <SectionShell
      id="chat-vs-agent"
      eyebrow="the difference"
      title="A chat answers. An agent does."
      kicker="Same message, two very different mornings. Watch — and when the agent asks, answer."
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

      <Theater />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed"
      >
        That builder is an <GlossaryTip k="agent">agent</GlossaryTip>. The message you typed? That's a{' '}
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
        It does the steps.{' '}
        <span className="relative inline-block whitespace-nowrap px-2">
          You do the deciding.
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
