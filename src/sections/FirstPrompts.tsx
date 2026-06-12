import { motion } from 'motion/react'
import { SectionShell } from '../components/SectionShell'
import { HowToStrip } from '../components/HowToStrip'
import { PromptCard } from '../components/PromptCard'
import { AboutMeThumb, PresentationThumb, WheelThumb } from '../components/PromptThumbs'
import { fadeUp, staggerKids, viewportOnce } from '../lib/motion'
import { pick, useLocale } from '../i18n/locale'
import { starterPrompts } from '../data/prompts'
import { starterPromptsFr } from '../data/fr/prompts'
import type { StarterPrompt } from '../data/prompts'
import { FIRST_PROMPTS_COPY } from './FirstPrompts.copy'

function thumbFor(id: StarterPrompt['id']) {
  if (id === 'about-me') return <AboutMeThumb />
  if (id === 'presentation') return <PresentationThumb />
  return <WheelThumb />
}

export function FirstPrompts() {
  const locale = useLocale()
  const t = FIRST_PROMPTS_COPY[locale]
  const prompts = pick(locale, starterPrompts, starterPromptsFr)
  return (
    <SectionShell id="first-prompts" eyebrow={t.eyebrow} title={t.title} kicker={t.kicker}>
      <HowToStrip className="mt-12" />

      <motion.div
        variants={staggerKids}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid items-stretch gap-7 lg:grid-cols-3"
      >
        {prompts.map((sp, i) => (
          <PromptCard key={sp.id} data={sp} thumb={thumbFor(sp.id)} rotate={[-0.7, 0.5, -0.4][i]} />
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-8 text-center"
      >
        <a href="./prompts/" className="btn-pop text-sm">
          {t.pantryCta}
        </a>
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-8 max-w-2xl text-center text-ink-soft"
      >
        {t.bottomA}
        <a href="#pick-your-door" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
          {t.bottomLink}
        </a>
      </motion.p>
    </SectionShell>
  )
}
