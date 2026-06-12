import { useEffect, useState } from 'react'
import { useLocale } from '../i18n/locale'

/**
 * FR/EN pill. Computes the sibling page in the other tree with a RELATIVE
 * href, so it survives sub-path hosting like every other link on the site.
 */
export function LangToggle({ dark = false }: { dark?: boolean }) {
  const locale = useLocale()
  const [href, setHref] = useState<string | null>(null)

  useEffect(() => {
    const segments = window.location.pathname.split('/').filter(Boolean)
    const isFr = segments[0] === 'fr'
    const rest = isFr ? segments.slice(1) : segments
    // drop a trailing file segment like index.html, keep directory depth
    const dirs = rest.filter((s) => !s.includes('.'))
    const suffix = dirs.length ? dirs.join('/') + '/' : ''
    const target = isFr
      ? '../'.repeat(dirs.length + 1) + suffix // /fr/x/ → /x/
      : (dirs.length ? '../'.repeat(dirs.length) : './') + 'fr/' + suffix // /x/ → /fr/x/
    setHref(target + window.location.hash)
  }, [])

  if (!href) return null
  const base = 'rounded-full border-2 px-2 py-0.5 font-mono text-[0.65rem] font-bold'
  const activeCls = dark ? 'border-sun bg-sun text-ink' : 'border-ink bg-sun text-ink'
  const idleCls = dark
    ? 'border-plum-line text-on-plum-dim hover:border-sun hover:text-on-plum'
    : 'border-ink/40 text-ink-soft hover:border-ink hover:text-ink'

  return (
    <span className="inline-flex items-center gap-1" aria-label="Language">
      {locale === 'en' ? (
        <>
          <span className={`${base} ${activeCls}`} aria-current="true">
            EN
          </span>
          <a href={href} hrefLang="fr" lang="fr" className={`${base} ${idleCls}`} aria-label="Version française">
            FR
          </a>
        </>
      ) : (
        <>
          <a href={href} hrefLang="en" lang="en" className={`${base} ${idleCls}`} aria-label="English version">
            EN
          </a>
          <span className={`${base} ${activeCls}`} aria-current="true">
            FR
          </span>
        </>
      )}
    </span>
  )
}
