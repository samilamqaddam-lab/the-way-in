import type { ReactNode } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { LangToggle } from './LangToggle'
import { Pip } from './Pip'
import { SiteFooter } from './SiteFooter'
import { Wordmark } from './Wordmark'
import { fadeUp, staggerKids } from '../lib/motion'
import { HOME, ROOMS, roomLabel } from '../lib/links'
import { pick, useLocale } from '../i18n/locale'
import type { RoomId } from '../lib/links'

interface SubpageShellProps {
  page: RoomId
  eyebrow: string
  title: ReactNode
  kicker?: ReactNode
  /** page-flavored mascot; defaults to plain bobbing Pip */
  pip?: ReactNode
  children: ReactNode
}

/** Shared frame for the four rooms: header nav, page hero, footer garden. */
export function SubpageShell({ page, eyebrow, title, kicker, pip, children }: SubpageShellProps) {
  const locale = useLocale()
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link btn-pop" href="#content">
        {pick(locale, 'Skip to content', 'Aller au contenu')}
      </a>
      <div className="grain" aria-hidden="true" />

      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 pt-6">
        <a href={HOME.fromSub} className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-sm font-bold tracking-tight">
          <span aria-hidden="true">←</span> <Wordmark />
        </a>
        <div className="flex min-w-0 max-w-full items-center gap-3">
          <nav aria-label={pick(locale, 'Rooms', 'Pièces')} className="flex min-w-0 gap-2 overflow-x-auto pb-1">
            {ROOMS.map((r) => (
              <a
                key={r.id}
                href={r.id === page ? undefined : r.fromSub}
                aria-current={r.id === page ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-3.5 py-1.5 font-mono text-xs font-bold ${
                  r.id === page ? 'bg-sun' : 'bg-paper hover:bg-paper-deep'
                }`}
              >
                {roomLabel(r, locale)}
              </a>
            ))}
          </nav>
          <LangToggle />
        </div>
      </header>

      <motion.div
        variants={staggerKids}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl px-5 pt-14 text-center md:pt-20"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          {pip ?? <Pip size={56} bob />}
        </motion.div>
        <motion.p variants={fadeUp} className="eyebrow mb-4 mt-5">
          <span className="text-tangerine" aria-hidden="true">
            ✳{' '}
          </span>
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-balance font-display text-[clamp(2.4rem,7.5vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.015em]"
        >
          {title}
        </motion.h1>
        {kicker && (
          <motion.p variants={fadeUp} className="mt-5 text-lg text-ink-soft md:text-xl">
            {kicker}
          </motion.p>
        )}
      </motion.div>

      <main id="content">{children}</main>

      <section className="on-dark mt-24 border-t-[3px] border-ink bg-plum px-5 pb-10 text-on-plum">
        <div className="mx-auto w-full max-w-5xl">
          <SiteFooter from="sub" current={page} />
        </div>
      </section>
    </MotionConfig>
  )
}
