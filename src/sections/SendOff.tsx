import { motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { SiteFooter } from '../components/SiteFooter'
import { fadeUp, staggerKids, staggerKidsSlow, viewportOnce } from '../lib/motion'

const CHECKLIST = [
  'You know what an agent is — a doer, not just an answerer.',
  "You've felt a session: message → permission → result.",
  'You know which tool fits your pocket.',
  'Your first prompt is one paste away.',
]

export function SendOff() {
  return (
    <section id="send-off" className="on-dark relative overflow-x-clip border-t-[3px] border-ink bg-plum px-5 py-16 text-on-plum md:py-24">
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

        <SiteFooter from="root" />
      </div>
    </section>
  )
}
