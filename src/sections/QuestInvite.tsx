import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { fadeUp, popSpring, viewportOnce } from '../lib/motion'
import { GRIDS, spriteDataUrl } from '../pages/quest/engine/sprites'

function usePixelPip(scale = 6) {
  return useMemo(() => spriteDataUrl(GRIDS.pipDown, GRIDS.pipOnDark, scale), [scale])
}

/** The invite strip on the home scroll: learning, but as a tiny video game. */
export function QuestInvite() {
  const pip = usePixelPip(7)
  const snatcher = useMemo(() => spriteDataUrl(GRIDS.snatcherA, GRIDS.snatcherPalette, 5), [])
  return (
    <section id="quest-invite" className="px-5 py-10 md:py-14">
      <motion.a
        href="./quest/"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="on-dark mx-auto flex w-full max-w-4xl flex-col items-center gap-5 rounded-[1.6rem] border-[3px] border-ink bg-plum-deep p-6 text-on-plum shadow-pop-lg transition-transform duration-150 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:flex-row sm:gap-7 sm:p-8"
      >
        <span className="flex items-end gap-3" aria-hidden="true">
          <span className="inline-block rounded-xl border-2 border-ink bg-paper p-1.5">
            <img src={pip} alt="" style={{ imageRendering: 'pixelated', width: 54, display: 'block' }} />
          </span>
          <img src={snatcher} alt="" className="opacity-80" style={{ imageRendering: 'pixelated', width: 58 }} />
        </span>
        <span className="flex-1 text-center sm:text-left">
          <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sun">
            ▶ press start — pip's quest
          </span>
          <span className="mt-1.5 block font-display text-2xl font-extrabold leading-tight md:text-3xl">
            Prefer to learn by playing?
          </span>
          <span className="mt-1.5 block text-sm leading-snug text-on-plum-dim md:text-base">
            Walk a tiny pixel valley, meet the Terminal in person, peek inside an agent office — and outsmart the Data
            Snatcher at the door. ~10 minutes, one boss, zero risk.
          </span>
        </span>
        <span className="btn-pop btn-sun whitespace-nowrap">Play the quest 🕹</span>
      </motion.a>
    </section>
  )
}

/** Desktop-only side tab: the quest waves at you mid-scroll, dismissible. */
export function QuestSideTab() {
  const pip = usePixelPip(4)
  const [shown, setShown] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setShown(window.scrollY > window.innerHeight * 2.2))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (dismissed) return null
  return (
    <motion.div
      className="fixed left-0 top-[62%] z-40 hidden lg:block"
      initial={false}
      animate={shown ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
      transition={popSpring}
      style={{ pointerEvents: shown ? 'auto' : 'none' }}
    >
      <div className="flex items-center">
        <a
          href="./quest/"
          className="flex items-center gap-2 rounded-r-2xl border-[3px] border-l-0 border-ink bg-plum-deep py-2.5 pl-2.5 pr-3 text-on-plum shadow-pop"
        >
          <img src={pip} alt="" style={{ imageRendering: 'pixelated', width: 26 }} aria-hidden="true" />
          <span className="font-mono text-xs font-bold leading-tight">
            play
            <br />
            Pip's Quest
          </span>
        </a>
        <button
          type="button"
          aria-label="Hide the quest invitation"
          onClick={() => setDismissed(true)}
          className="ml-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-paper font-mono text-[0.65rem] font-bold shadow-pop-sm"
        >
          ✕
        </button>
      </div>
    </motion.div>
  )
}
