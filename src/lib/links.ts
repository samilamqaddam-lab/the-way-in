/**
 * Cross-page links, always relative so `base: './'` portability survives
 * any static host or sub-path. Use `fromRoot` on the home page and
 * `fromSub` on any of the four rooms.
 */

import type { Locale } from '../i18n/locale'

export type RoomId = 'prompts' | 'missions' | 'first-day' | 'help' | 'quest' | 'tools'

export interface Room {
  id: RoomId
  label: string
  labelFr: string
  title: string
  titleFr: string
  fromRoot: string
  fromSub: string
}

export const ROOMS: Room[] = [
  {
    id: 'prompts',
    label: 'prompt pantry',
    labelFr: 'réserve à prompts',
    title: 'The Prompt Pantry',
    titleFr: 'La Réserve à Prompts',
    fromRoot: './prompts/',
    fromSub: '../prompts/',
  },
  {
    id: 'missions',
    label: 'mission deck',
    labelFr: 'deck des missions',
    title: 'The Mission Deck',
    titleFr: 'Le Deck des Missions',
    fromRoot: './missions/',
    fromSub: '../missions/',
  },
  {
    id: 'first-day',
    label: 'your first day',
    labelFr: 'ton premier jour',
    title: 'Your First Day',
    titleFr: 'Ton Premier Jour',
    fromRoot: './first-day/',
    fromSub: '../first-day/',
  },
  {
    id: 'help',
    label: 'help',
    labelFr: 'à l’aide',
    title: 'It Asked Me Something Weird',
    titleFr: 'Il m’a demandé un truc bizarre',
    fromRoot: './help/',
    fromSub: '../help/',
  },
  {
    id: 'tools',
    label: 'toolshed',
    labelFr: 'cabane à outils',
    title: 'The Toolshed',
    titleFr: 'La Cabane à Outils',
    fromRoot: './tools/',
    fromSub: '../tools/',
  },
  {
    id: 'quest',
    label: "pip's quest 🕹",
    labelFr: 'quête de pip 🕹',
    title: "Pip's Quest",
    titleFr: 'La Quête de Pip',
    fromRoot: './quest/',
    fromSub: '../quest/',
  },
]

export const roomLabel = (r: Room, locale: Locale) => (locale === 'fr' ? r.labelFr : r.label)
export const roomTitle = (r: Room, locale: Locale) => (locale === 'fr' ? r.titleFr : r.title)

export const HOME = { fromRoot: './', fromSub: '../' }

/** one icon per room — the joystick belongs to the game, nothing else */
export const ROOM_EMOJI: Record<RoomId, string> = {
  prompts: '🧺',
  missions: '🎬',
  'first-day': '🌅',
  help: '🛟',
  tools: '🧰',
  quest: '🕹',
}

export function room(id: RoomId): Room {
  const found = ROOMS.find((r) => r.id === id)
  if (!found) throw new Error(`unknown room: ${id}`)
  return found
}
