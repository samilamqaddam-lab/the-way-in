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
}

/**
 * A fake browser window. The "result" is a hand-built mockup — no iframe,
 * no rendering of generated code, nothing executed. Theater, on purpose.
 */
export function Preview({ missionId, folder, stage, burst }: PreviewProps) {
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
            {missionId === 'birthday' && <BirthdayPreview stage={stage} />}
            {missionId === 'quiz' && <QuizPreview stage={stage} />}
            {missionId === 'recipe' && <RecipePreview stage={stage} />}
            {missionId === 'flashcards' && <FlashcardsPreview stage={stage} />}
            {missionId === 'band' && <BandPreview stage={stage} />}
            {missionId === 'packing' && <PackingPreview stage={stage} />}
            {missionId === 'honey' && <HoneyPreview stage={stage} />}
            {missionId === 'photos' && <PhotosPreview stage={stage} />}
          </>
        )}
        <ConfettiBurst trigger={burst} count={20} />
      </div>
    </div>
  )
}
