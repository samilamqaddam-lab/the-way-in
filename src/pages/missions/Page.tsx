import { useMemo } from 'react'
import { SubpageShell } from '../../components/SubpageShell'
import { Pip } from '../../components/Pip'
import { DriveWindow } from '../../sections/TestDrive/DriveWindow'
import { pick, useLocale } from '../../i18n/locale'
import { missions } from '../../data/missions'
import { missionsFr } from '../../data/fr/missions'
import type { Mission } from '../../data/missions'
import type { Locale } from '../../i18n/locale'

const COPY = {
  en: {
    eyebrow: 'play',
    title: 'The Mission Deck',
    kickerTail:
      'zero-risk test drives. Each one is a scripted replay — a little movie you click through. Nothing real runs, nothing on your device is touched.',
    makeReal: 'Make the real one ↗',
    browsePantry: 'Browse the Prompt Pantry ↗',
    bottomA: 'Every finished mission has a real twin in the ',
    bottomLink: 'Prompt Pantry',
    bottomB: ' — same idea, but yours, for real, in about twenty minutes.',
  },
  fr: {
    eyebrow: 'à jouer',
    title: 'Le Deck des Missions',
    kickerTail:
      'tours d’essai à zéro risque. Chacun est une rediffusion scénarisée — un petit film que tu fais avancer en cliquant. Rien de réel ne tourne, rien sur ton appareil n’est touché.',
    makeReal: 'Construire le vrai ↗',
    browsePantry: 'Explorer la Réserve à Prompts ↗',
    bottomA: 'Chaque mission terminée a un vrai jumeau dans la ',
    bottomLink: 'Réserve à Prompts',
    bottomB: ' — la même idée, mais à toi, pour de vrai, en une vingtaine de minutes.',
  },
} satisfies Record<Locale, Record<string, string>>

export function MissionsPage() {
  const locale = useLocale()
  const t = COPY[locale]
  const deck = pick(locale, missions, missionsFr)

  // honor share links like /missions/?m=flashcards
  const initialMissionId = useMemo(() => new URLSearchParams(window.location.search).get('m'), [])

  const doneCta = (mission: Mission) =>
    mission.pantryId
      ? { href: `../prompts/#${mission.pantryId}`, label: t.makeReal }
      : { href: '../prompts/', label: t.browsePantry }

  return (
    <SubpageShell
      page="missions"
      eyebrow={t.eyebrow}
      title={t.title}
      kicker={`${deck.length} ${t.kickerTail}`}
      pip={<Pip size={60} hat="hard" bob />}
    >
      <section className="px-5">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mt-12">
            <DriveWindow
              missions={deck}
              initialMissionId={initialMissionId}
              doneCta={doneCta}
              previewHref={(m) => (m.pantryId ? `../prompts/#${m.pantryId}` : null)}
            />
          </div>
          <p className="mx-auto mt-14 max-w-2xl text-center text-ink-soft">
            {t.bottomA}
            <a href="../prompts/" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
              {t.bottomLink}
            </a>
            {t.bottomB}
          </p>
        </div>
      </section>
    </SubpageShell>
  )
}
