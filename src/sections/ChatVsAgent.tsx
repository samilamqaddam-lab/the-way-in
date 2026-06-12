import { motion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { Squiggle } from '../components/Squiggle'
import { fadeUp, viewportOnce } from '../lib/motion'
import { useLocale } from '../i18n/locale'
import { Theater } from './ChatVsAgentTheater'
import { CHAT_VS_AGENT_COPY } from './ChatVsAgent.copy'

export function ChatVsAgent() {
  const t = CHAT_VS_AGENT_COPY[useLocale()]
  return (
    <SectionShell id="chat-vs-agent" eyebrow={t.eyebrow} title={t.title} kicker={t.kicker}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-12 max-w-md"
      >
        <div className="rounded-full border-[2.5px] border-dashed border-ink/50 bg-paper-deep/60 px-5 py-3 text-center font-mono text-sm">
          {t.request}
        </div>
        <p className="mt-2.5 text-center font-mono text-xs text-ink-soft">{t.sentLine}</p>
      </motion.div>

      <Theater />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed"
      >
        {t.explainer}
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 text-center font-display text-2xl font-extrabold md:text-3xl"
      >
        {t.punchPlain}{' '}
        <span className="relative inline-block whitespace-nowrap px-2">
          {t.punchCircled}
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
