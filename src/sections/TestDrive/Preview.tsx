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
  /** when set, the preview itself links to the matching starter prompt */
  href?: string | null
}

/**
 * A fake browser window. The "result" is a hand-built mockup — no iframe,
 * no rendering of generated code, nothing executed. Theater, on purpose.
 */
export function Preview({ missionId, folder, stage, burst, href }: PreviewProps) {
  const body = (
    <>
      {missionId === 'birthday' && <BirthdayPreview stage={stage} />}
      {missionId === 'quiz' && <QuizPreview stage={stage} />}
      {missionId === 'recipe' && <RecipePreview stage={stage} />}
      {missionId === 'flashcards' && <FlashcardsPreview stage={stage} />}
      {missionId === 'band' && <BandPreview stage={stage} />}
      {missionId === 'packing' && <PackingPreview stage={stage} />}
      {missionId === 'honey' && <HoneyPreview stage={stage} />}
      {missionId === 'photos' && <PhotosPreview stage={stage} />}
    </>
  )
  const linked = href && stage > 0
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
        ) : linked ? (
          <a href={href} className="group block" aria-label="Open the matching starter prompt in the Pantry">
            {body}
            <span className="absolute right-1.5 top-1.5 rounded-full border-2 border-ink bg-paper/90 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-ink opacity-80 transition-opacity group-hover:opacity-100">
              get this prompt ↗
            </span>
          </a>
        ) : (
          body
        )}
        <ConfettiBurst trigger={burst} count={20} />
      </div>
    </div>
  )
}
