import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { CopyButton } from './CopyButton'
import { Sticker } from './Sticker'
import { fadeUp } from '../lib/motion'

export interface PromptCardData {
  title: string
  forWho: string
  time: string
  what: string
  prompt: string
}

interface PromptCardProps {
  data: PromptCardData
  thumb: ReactNode
  /** optional anchor id so other pages can deep-link to this card */
  anchorId?: string
  badge?: string
  rotate?: number
}

/** A paste-ready prompt as a recipe card: thumb, meta, scrollable text, one-click copy. */
export function PromptCard({ data, thumb, anchorId, badge, rotate = 0 }: PromptCardProps) {
  return (
    <motion.article
      id={anchorId}
      variants={fadeUp}
      className="card-pop relative flex scroll-mt-24 flex-col overflow-hidden"
      style={rotate ? { rotate: `${rotate}deg` } : undefined}
    >
      {badge && (
        <Sticker color="tangerine" rotate={-4} className="absolute left-4 top-4 z-10">
          {badge}
        </Sticker>
      )}
      <div className="h-36 border-b-[3px] border-ink" aria-hidden="true">
        {thumb}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-xl font-extrabold leading-tight">{data.title}</h3>
          <span className="rounded-full border-2 border-ink bg-paper-deep px-2.5 py-0.5 font-mono text-[0.68rem] font-bold">
            {data.forWho}
          </span>
          <span className="rounded-full border-2 border-ink bg-paper-deep px-2.5 py-0.5 font-mono text-[0.68rem] font-bold">
            {data.time}
          </span>
        </header>
        <p className="text-sm leading-snug text-ink-soft">{data.what}</p>
        <div className="relative">
          <pre
            aria-label={`Starter prompt: ${data.title}`}
            className="prompt-scroll max-h-52 overflow-y-auto whitespace-pre-wrap rounded-xl border-[2.5px] border-ink bg-paper-deep p-3.5 font-mono text-[0.78rem] leading-relaxed"
          >
            {data.prompt}
          </pre>
          <div className="pointer-events-none absolute inset-x-0.5 bottom-0.5 h-8 rounded-b-xl bg-gradient-to-t from-paper-deep to-transparent" />
        </div>
        <CopyButton text={data.prompt} className="mt-auto" />
      </div>
    </motion.article>
  )
}
