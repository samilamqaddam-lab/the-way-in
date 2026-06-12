import { motion } from 'motion/react'
import { SubpageShell } from '../../components/SubpageShell'
import { Pip } from '../../components/Pip'
import { fadeUp, staggerKids, viewportOnce } from '../../lib/motion'
import { useLocale } from '../../i18n/locale'
import { room } from '../../lib/links'
import { FIRST_DAY_COPY } from './Page.copy'
import type { MomentCopy } from './Page.copy'

interface MomentProps {
  n: number
  m: MomentCopy
  voices: { happening: string; youDo: string; breathe: string }
}

function Moment({ n, m, voices }: MomentProps) {
  return (
    <motion.li variants={fadeUp} className="relative pl-14 sm:pl-16">
      <span
        className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border-[3px] border-ink bg-sun font-display text-base font-extrabold shadow-pop-sm"
        aria-hidden="true"
      >
        {n}
      </span>
      <div className="card-pop overflow-hidden">
        <div className="border-b-[3px] border-ink bg-paper-deep px-5 py-4">
          <h2 className="font-display text-xl font-extrabold leading-snug md:text-2xl">
            <span aria-hidden="true">{m.emoji} </span>
            {m.title}
          </h2>
        </div>
        <div className="grid gap-5 p-5 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>{m.mock}</div>
          <div className="space-y-3.5 text-[0.95rem] leading-relaxed">
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-sky-deep">
                {voices.happening}
              </p>
              <p className="mt-1 text-ink-soft">{m.happening}</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-tangerine-deep">
                {voices.youDo}
              </p>
              <p className="mt-1 text-ink-soft">{m.youDo}</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-leaf-deep">
                {voices.breathe}
              </p>
              <p className="mt-1 text-ink-soft">{m.breathe}</p>
            </div>
            {m.extra && <div className="flex flex-wrap gap-2 pt-1">{m.extra}</div>}
          </div>
        </div>
      </div>
    </motion.li>
  )
}

export function FirstDayPage() {
  const t = FIRST_DAY_COPY[useLocale()]
  const voices = { happening: t.voiceHappening, youDo: t.voiceYouDo, breathe: t.voiceBreathe }
  return (
    <SubpageShell
      page="first-day"
      eyebrow={t.eyebrow}
      title={t.title}
      kicker={t.kicker}
      pip={<Pip size={60} mood="wink" bob />}
    >
      <section className="px-5">
        <motion.ol
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative mx-auto mt-12 grid w-full max-w-3xl gap-8"
        >
          <span className="absolute bottom-4 left-5 top-4 -z-10 w-[3px] rounded bg-line" aria-hidden="true" />
          {t.moments.map((m, i) => (
            <Moment key={m.emoji} n={i + 1} m={m} voices={voices} />
          ))}
        </motion.ol>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <p className="font-display text-2xl font-extrabold md:text-3xl">{t.outroTitle}</p>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t.outroBody}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a href="../#first-prompts" className="btn-pop btn-tangerine">
              {t.ctaPrompt}
            </a>
            <a href={room('help').fromSub} className="btn-pop">
              {t.ctaDecoder}
            </a>
          </div>
        </motion.div>
      </section>
    </SubpageShell>
  )
}
