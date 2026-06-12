import { useMemo } from 'react'
import { SubpageShell } from '../../components/SubpageShell'
import { Pip } from '../../components/Pip'
import { DriveWindow } from '../../sections/TestDrive/DriveWindow'
import { missions } from '../../data/missions'
import type { Mission } from '../../data/missions'

function doneCta(mission: Mission) {
  return mission.pantryId
    ? { href: `../prompts/#${mission.pantryId}`, label: 'Make the real one ↗' }
    : { href: '../prompts/', label: 'Browse the Prompt Pantry ↗' }
}

export function MissionsPage() {
  // honor share links like /missions/?m=flashcards
  const initialMissionId = useMemo(() => new URLSearchParams(window.location.search).get('m'), [])

  return (
    <SubpageShell
      page="missions"
      eyebrow="play"
      title="The Mission Deck"
      kicker={`${missions.length} zero-risk test drives. Each one is a scripted replay — a little movie you click through. Nothing real runs, nothing on your device is touched.`}
      pip={<Pip size={60} hat="hard" bob />}
    >
      <section className="px-5">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mt-12">
            <DriveWindow
              missions={missions}
              initialMissionId={initialMissionId}
              doneCta={doneCta}
              previewHref={(m) => (m.pantryId ? `../prompts/#${m.pantryId}` : null)}
            />
          </div>
          <p className="mx-auto mt-14 max-w-2xl text-center text-ink-soft">
            Every finished mission has a real twin in the{' '}
            <a href="../prompts/" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
              Prompt Pantry
            </a>{' '}
            — same idea, but yours, for real, in about twenty minutes.
          </p>
        </div>
      </section>
    </SubpageShell>
  )
}
