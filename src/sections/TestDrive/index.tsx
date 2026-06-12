import { SectionShell } from '../../components/SectionShell'
import { Squiggle } from '../../components/Squiggle'
import { DriveWindow } from './DriveWindow'
import { classicMissions } from '../../data/missions'

/** The home-page Test Drive section: intro + the shared drive window with the classic missions. */
export function TestDrive() {
  return (
    <SectionShell
      id="test-drive"
      eyebrow="feel it"
      title={
        <>
          Take one for a{' '}
          <span className="relative inline-block whitespace-nowrap">
            test drive.
            <Squiggle kind="underline" className="absolute -bottom-2 left-0 h-3 w-full text-tangerine" delay={0.4} />
          </span>
        </>
      }
      kicker="Pick a pretend mission and play the human. This is a scripted replay — a little movie you click through. Nothing real runs, and nothing on your device is touched. Promise."
    >
      <div className="mt-12">
        <DriveWindow
          missions={classicMissions}
          doneCta={() => ({ href: '#first-prompts', label: 'Get your real first prompt ↓' })}
          previewHref={(m) => (m.pantryId ? `./prompts/#${m.pantryId}` : null)}
        />
        <p className="mt-8 text-center">
          <a href="./missions/" className="btn-pop text-sm">
            🎬 see all eight missions — the Mission Deck ↗
          </a>
        </p>
      </div>
    </SectionShell>
  )
}
