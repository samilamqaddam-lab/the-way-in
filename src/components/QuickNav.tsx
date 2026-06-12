import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Pip } from './Pip'
import { popSpring } from '../lib/motion'
import { ROOMS, ROOM_EMOJI, roomLabel, roomTitle } from '../lib/links'
import { useLocale } from '../i18n/locale'
import type { Locale } from '../i18n/locale'

const LINKS = [
  { id: 'start', en: 'start', fr: 'départ' },
  { id: 'chat-vs-agent', en: 'chat vs agent', fr: 'chat vs agent' },
  { id: 'test-drive', en: 'test drive', fr: 'tour d’essai' },
  { id: 'no-fear', en: 'nothing breaks', fr: 'rien ne casse' },
  { id: 'pick-your-door', en: 'pick a tool', fr: 'choisir un outil' },
  { id: 'first-prompts', en: 'first prompts', fr: 'premiers prompts' },
  { id: 'send-off', en: 'the door', fr: 'la porte' },
]

const NAV_COPY = {
  en: {
    navAria: 'Sections and rooms',
    roomPrefix: 'Room:',
    onThisPage: 'on this page',
    theRooms: 'the rooms',
    menuAria: 'Section menu',
    closeAria: 'Close section menu',
  },
  fr: {
    navAria: 'Sections et pièces',
    roomPrefix: 'Pièce :',
    onThisPage: 'sur cette page',
    theRooms: 'les pièces',
    menuAria: 'Menu des sections',
    closeAria: 'Fermer le menu',
  },
} satisfies Record<Locale, Record<string, string>>

/**
 * Floating section nav: dots on desktop, a pocket menu on phones.
 * Appears once the visitor has scrolled past the hero.
 */
export function QuickNav() {
  const locale = useLocale()
  const t = NAV_COPY[locale]
  const [active, setActive] = useState('start')
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-42% 0px -52% 0px' },
    )
    for (const link of LINKS) {
      const el = document.getElementById(link.id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setVisible(window.scrollY > window.innerHeight * 0.55))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const hiddenStyle = visible ? undefined : ({ opacity: 0, pointerEvents: 'none' } as const)

  return (
    <>
      {/* Desktop: side dots for sections, tiny doors for the rooms */}
      <nav
        aria-label={t.navAria}
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-300 lg:flex"
        style={hiddenStyle}
      >
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-label={link[locale]}
            className="group relative flex h-5 w-5 items-center justify-center"
          >
            <span
              className={`h-3 w-3 rounded-full border-[2.5px] border-ink transition-colors ${
                active === link.id ? 'bg-tangerine' : 'bg-paper'
              }`}
            />
            <span className="card-pop pointer-events-none absolute right-7 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[0.7rem] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {link[locale]}
            </span>
          </a>
        ))}
        <span className="h-px w-4 bg-ink/30" aria-hidden="true" />
        {ROOMS.map((room) => (
          <a
            key={room.id}
            href={room.fromRoot}
            aria-label={`${t.roomPrefix} ${roomTitle(room, locale)}`}
            className="group relative flex h-6 w-5 items-center justify-center"
          >
            {/* a tiny door — because that's what the rooms are */}
            <span className="flex h-5 w-4 items-start justify-center rounded-t-md border-[2.5px] border-ink bg-paper pt-[1px] text-[0.5rem] leading-none transition-colors group-hover:bg-sun">
              <span aria-hidden="true">{ROOM_EMOJI[room.id] ?? '·'}</span>
            </span>
            <span className="card-pop pointer-events-none absolute right-7 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[0.7rem] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {roomTitle(room, locale)} ↗
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile: pocket menu */}
      <div className="fixed bottom-4 right-4 z-40 transition-opacity duration-300 lg:hidden" style={hiddenStyle}>
        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label={t.navAria}
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={popSpring}
              className="card-pop absolute bottom-16 right-0 flex max-h-[70vh] min-w-48 flex-col gap-1 overflow-y-auto p-2.5"
            >
              <span className="px-3.5 pt-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                {t.onThisPage}
              </span>
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-3.5 py-2 font-mono text-sm ${
                    active === link.id ? 'bg-sun font-bold' : ''
                  }`}
                >
                  {link[locale]}
                </a>
              ))}
              <span className="mt-1 border-t-2 border-line px-3.5 pt-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                {t.theRooms}
              </span>
              {ROOMS.map((room) => (
                <a key={room.id} href={room.fromRoot} className="rounded-full px-3.5 py-2 font-mono text-sm">
                  <span aria-hidden="true">{ROOM_EMOJI[room.id] ?? '·'} </span>
                  {roomLabel(room, locale)}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
        <button
          type="button"
          className="btn-pop h-14 w-14 rounded-full p-0"
          aria-expanded={open}
          aria-label={t.menuAria}
          onClick={() => setOpen((o) => !o)}
        >
          <Pip size={30} tone={open ? 'tangerine' : 'ink'} mood={open ? 'wink' : 'idle'} />
        </button>
      </div>
      {open && (
        <button
          type="button"
          aria-label={t.closeAria}
          className="fixed inset-0 z-30 cursor-default bg-transparent lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
