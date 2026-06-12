import type { ReactNode } from 'react'

/** Little mock windows shared by the first-day moments (and their copy file). */

export function MiniWindow({ tone, title, children }: { tone: 'light' | 'dark'; title: string; children: ReactNode }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`overflow-hidden rounded-xl border-[2.5px] ${
        dark ? 'on-dark border-ink bg-plum text-on-plum' : 'border-ink bg-white'
      }`}
    >
      <div className={`flex items-center gap-1.5 border-b-2 px-3 py-2 ${dark ? 'border-plum-line' : 'border-line'}`}>
        <span className="h-2 w-2 rounded-full bg-blush" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
        <span className={`ml-1 truncate font-mono text-[0.62rem] ${dark ? 'text-on-plum-dim' : 'text-neutral-600'}`}>
          {title}
        </span>
      </div>
      <div className="space-y-1.5 p-3.5 text-left font-mono text-[0.72rem] leading-relaxed">{children}</div>
    </div>
  )
}

export function YouLine({ children }: { children: ReactNode }) {
  return (
    <p className="ml-auto w-fit max-w-[90%] rounded-lg rounded-br-sm border-2 border-ink bg-sun px-2.5 py-1.5 font-sans text-[0.78rem] font-medium text-ink">
      {children}
    </p>
  )
}
