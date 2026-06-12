/** Tiny hand-built mockup thumbnails for prompt cards. */

import { pick, useLocale } from '../i18n/locale'

export function AboutMeThumb() {
  return (
    <div className="flex h-full items-center justify-center gap-4 bg-[#FFE8D6]">
      <span
        className="grid h-12 w-12 place-items-center rounded-full border-[2.5px] border-ink bg-tangerine text-xl"
        aria-hidden="true"
      >
        🙂
      </span>
      <div className="space-y-1.5">
        <span className="block h-2.5 w-24 rounded-full bg-ink" />
        <span className="block h-2 w-16 rounded-full bg-ink/50" />
        <span className="mt-2 flex gap-1">
          <span className="h-3.5 w-9 rounded-full border-2 border-ink bg-sun" />
          <span className="h-3.5 w-9 rounded-full border-2 border-ink bg-blush" />
          <span className="h-3.5 w-9 rounded-full border-2 border-ink bg-sky" />
        </span>
      </div>
    </div>
  )
}

export function PresentationThumb() {
  return (
    <div className="relative flex h-full items-center justify-center bg-[#EDE8FF]">
      <span className="absolute h-20 w-32 -rotate-6 rounded-lg border-[2.5px] border-ink bg-white shadow-pop-sm" />
      <span className="absolute h-20 w-32 rotate-3 rounded-lg border-[2.5px] border-ink bg-sun shadow-pop-sm" />
      <span className="relative grid h-20 w-32 place-items-center rounded-lg border-[2.5px] border-ink bg-white shadow-pop-sm">
        <span className="block h-2.5 w-20 rounded-full bg-ink" />
        <span className="absolute bottom-2 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
        </span>
      </span>
    </div>
  )
}

export function WheelThumb() {
  const locale = useLocale()
  return (
    <div className="flex h-full items-center justify-center gap-4 bg-[#E4F6EC]">
      <span className="relative inline-block">
        <span
          className="block h-20 w-20 rounded-full border-[3px] border-ink shadow-pop-sm"
          style={{
            background:
              'conic-gradient(#F4581C 0 60deg, #FFC83D 60deg 140deg, #2D8CFF 140deg 215deg, #FF7E9D 215deg 290deg, #1F9D5B 290deg 360deg)',
          }}
        />
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-sm" aria-hidden="true">
          ▼
        </span>
      </span>
      <span className="rounded-full border-[2.5px] border-ink bg-tangerine px-3.5 py-1.5 text-xs font-bold text-paper shadow-pop-sm">
        {pick(locale, 'SPIN!', 'TOURNE !')}
      </span>
    </div>
  )
}

/** Generic thumb for Pantry prompts: a big emoji on a tinted dotted field. */
export function EmojiThumb({ emoji, tint }: { emoji: string; tint: string }) {
  return (
    <div className={`dot-grid flex h-full items-center justify-center ${tint}`}>
      <span
        className="grid h-16 w-16 place-items-center rounded-2xl border-[2.5px] border-ink bg-paper text-3xl shadow-pop-sm"
        aria-hidden="true"
      >
        {emoji}
      </span>
    </div>
  )
}
