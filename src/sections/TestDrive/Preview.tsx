import { useEffect, useState } from 'react'
import { ConfettiBurst } from '../../components/ConfettiBurst'
import { BirthdayPreview } from './previews/BirthdayPreview'
import { QuizPreview } from './previews/QuizPreview'
import { RecipePreview } from './previews/RecipePreview'
import { FlashcardsPreview } from './previews/FlashcardsPreview'
import { BandPreview } from './previews/BandPreview'
import { PackingPreview } from './previews/PackingPreview'
import { HoneyPreview } from './previews/HoneyPreview'
import { PhotosPreview } from './previews/PhotosPreview'
import type { Mission } from '../../data/missions'

interface PreviewProps {
  missionId: Mission['id']
  folder: string
  stage: number
  burst: number
  /** when set, a small corner chip links to the matching starter prompt */
  href?: string | null
}

/**
 * A fake browser window. The "result" is a hand-built mockup — nothing is
 * executed. Once stages exist, a tiny pager lets you flip back through
 * every screen the agent has shown so far.
 */
export function Preview({ missionId, folder, stage, burst, href }: PreviewProps) {
  const [view, setView] = useState(stage)

  // follow the live build as it grows; the visitor can rewind any time
  useEffect(() => setView(stage), [stage])

  const shown = Math.max(1, Math.min(view, stage))

  return (
    <div className="overflow-hidden rounded-2xl border-[2.5px] border-plum-line bg-plum-deep">
      <div className="flex items-center gap-1.5 border-b-[2.5px] border-plum-line px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-blush" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-sun" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-leaf" aria-hidden="true" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-plum px-3 py-1 font-mono text-[0.65rem] text-on-plum-dim">
          your-computer/{folder}/index.html
        </span>
      </div>
      <div className="relative">
        {stage === 0 ? (
          <div className="flex min-h-52 items-center justify-center bg-plum-deep p-4">
            <p className="font-mono text-xs italic text-on-plum-dim">the page will appear here…</p>
          </div>
        ) : (
          <>
            {missionId === 'birthday' && <BirthdayPreview stage={shown} />}
            {missionId === 'quiz' && <QuizPreview stage={shown} />}
            {missionId === 'recipe' && <RecipePreview stage={shown} />}
            {missionId === 'flashcards' && <FlashcardsPreview stage={shown} />}
            {missionId === 'band' && <BandPreview stage={shown} />}
            {missionId === 'packing' && <PackingPreview stage={shown} />}
            {missionId === 'honey' && <HoneyPreview stage={shown} />}
            {missionId === 'photos' && <PhotosPreview stage={shown} />}
          </>
        )}

        {href && stage > 0 && (
          <a
            href={href}
            aria-label="Open the matching starter prompt in the Pantry"
            className="absolute right-1.5 top-1.5 rounded-full border-2 border-ink bg-paper/90 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-ink opacity-80 transition-opacity hover:opacity-100"
          >
            get this prompt ↗
          </a>
        )}

        {/* the pager — flip back through every screen seen so far */}
        {stage >= 2 && (
          <div
            className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border-2 border-ink bg-paper/90 px-1.5 py-0.5"
            role="group"
            aria-label="Browse the screens built so far"
          >
            <button
              type="button"
              onClick={() => setView((v) => Math.max(1, v - 1))}
              disabled={shown <= 1}
              aria-label="Previous screen"
              className="px-1 font-mono text-xs font-bold text-ink disabled:opacity-30"
            >
              ‹
            </button>
            {Array.from({ length: stage }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setView(n)}
                aria-label={`Screen ${n}`}
                aria-current={shown === n}
                className={`h-2.5 w-2.5 rounded-full border border-ink ${shown === n ? 'bg-tangerine' : 'bg-paper'}`}
              />
            ))}
            <button
              type="button"
              onClick={() => setView((v) => Math.min(stage, v + 1))}
              disabled={shown >= stage}
              aria-label="Next screen"
              className="px-1 font-mono text-xs font-bold text-ink disabled:opacity-30"
            >
              ›
            </button>
          </div>
        )}

        <ConfettiBurst trigger={burst} count={20} />
      </div>
    </div>
  )
}
