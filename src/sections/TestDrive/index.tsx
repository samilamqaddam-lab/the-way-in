import { SectionShell } from '../../components/SectionShell'
import { Squiggle } from '../../components/Squiggle'
import { pick, useLocale } from '../../i18n/locale'
import { DriveWindow } from './DriveWindow'
import { TEST_DRIVE_COPY } from './copy'
import { classicMissions } from '../../data/missions'
import { classicMissionsFr } from '../../data/fr/missions'

/** The home-page Test Drive section: intro + the shared drive window with the classic missions. */
export function TestDrive() {
  const locale = useLocale()
  const t = TEST_DRIVE_COPY[locale]
  return (
    <SectionShell
      id="test-drive"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleA}
          <span className="relative inline-block whitespace-nowrap">
            {t.titleB}
            <Squiggle kind="underline" className="absolute -bottom-2 left-0 h-3 w-full text-tangerine" delay={0.4} />
          </span>
        </>
      }
      kicker={t.kicker}
    >
      <div className="mt-12">
        <DriveWindow
          missions={pick(locale, classicMissions, classicMissionsFr)}
          doneCta={() => ({ href: '#first-prompts', label: t.doneCta })}
          previewHref={(m) => (m.pantryId ? `./prompts/#${m.pantryId}` : null)}
        />
        <p className="mt-8 text-center">
          <a href="./missions/" className="btn-pop text-sm">
            {t.deckCta}
          </a>
        </p>
      </div>
    </SectionShell>
  )
}
