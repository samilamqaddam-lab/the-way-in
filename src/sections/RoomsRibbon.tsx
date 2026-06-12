import { ROOMS, ROOM_EMOJI, roomLabel } from '../lib/links'
import { pick, useLocale } from '../i18n/locale'

/** One quiet line under the hero — the whole house, implicitly. */
export function RoomsRibbon() {
  const locale = useLocale()
  return (
    <nav
      aria-label={pick(locale, 'The rooms', 'Les pièces')}
      className="px-5 pb-2 pt-6 text-center font-mono text-[0.72rem] leading-relaxed text-ink-soft"
    >
      <span className="mr-1.5">{pick(locale, 'more rooms in this house:', 'les autres pièces de la maison :')}</span>
      {ROOMS.map((r, i) => (
        <span key={r.id} className="whitespace-nowrap">
          <a href={r.fromRoot} className="underline decoration-dotted underline-offset-4 transition-colors hover:text-ink">
            <span aria-hidden="true">{ROOM_EMOJI[r.id]} </span>
            {roomLabel(r, locale)}
          </a>
          {i < ROOMS.length - 1 && <span aria-hidden="true"> · </span>}
        </span>
      ))}
    </nav>
  )
}
