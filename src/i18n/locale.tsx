import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type Locale = 'en' | 'fr'

/** The locale is declared by each HTML entry (`<html lang>`), never guessed. */
export function detectLocale(): Locale {
  return document.documentElement.lang.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

const LocaleContext = createContext<Locale>('en')

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}

/** Pick the right twin of a data module. */
export function pick<T>(locale: Locale, en: T, fr: T): T {
  return locale === 'fr' ? fr : en
}
