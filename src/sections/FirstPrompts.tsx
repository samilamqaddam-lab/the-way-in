import { motion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { HowToStrip } from '../components/HowToStrip'
import { PromptCard } from '../components/PromptCard'
import { AboutMeThumb, PresentationThumb, WheelThumb } from '../components/PromptThumbs'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'
import { starterPrompts } from '../data/prompts'
import type { StarterPrompt } from '../data/prompts'

function thumbFor(id: StarterPrompt['id']) {
  if (id === 'about-me') return <AboutMeThumb />
  if (id === 'presentation') return <PresentationThumb />
  return <WheelThumb />
}

export function FirstPrompts() {
  return (
    <SectionShell
      id="first-prompts"
      eyebrow="take-away"
      title="Leave with something to make."
      kicker="Three first builds, written for you. Copy one, paste it into your tool, answer its questions — about fifteen minutes later, you've made a real thing."
    >
      <HowToStrip className="mt-12" />

      <motion.div
        variants={staggerKids}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid items-stretch gap-7 lg:grid-cols-3"
      >
        {starterPrompts.map((sp, i) => (
          <PromptCard key={sp.id} data={sp} thumb={thumbFor(sp.id)} rotate={[-0.7, 0.5, -0.4][i]} />
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-10 max-w-2xl text-center text-ink-soft"
      >
        Make them yours — change the folder names, the questions, anything. The agent rolls with it. And if you don't
        have a tool yet,{' '}
        <a href="#pick-your-door" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
          pick your door ↑
        </a>
      </motion.p>
    </SectionShell>
  )
}
