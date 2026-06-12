/**
 * Cross-page links, always relative so `base: './'` portability survives
 * any static host or sub-path. Use `fromRoot` on the home page and
 * `fromSub` on any of the four rooms.
 */

export type RoomId = 'prompts' | 'missions' | 'first-day' | 'help' | 'quest' | 'tools'

export interface Room {
  id: RoomId
  label: string
  title: string
  fromRoot: string
  fromSub: string
}

export const ROOMS: Room[] = [
  {
    id: 'prompts',
    label: 'prompt pantry',
    title: 'The Prompt Pantry',
    fromRoot: './prompts/',
    fromSub: '../prompts/',
  },
  {
    id: 'missions',
    label: 'mission deck',
    title: 'The Mission Deck',
    fromRoot: './missions/',
    fromSub: '../missions/',
  },
  {
    id: 'first-day',
    label: 'your first day',
    title: 'Your First Day',
    fromRoot: './first-day/',
    fromSub: '../first-day/',
  },
  {
    id: 'help',
    label: 'help',
    title: 'It Asked Me Something Weird',
    fromRoot: './help/',
    fromSub: '../help/',
  },
  {
    id: 'tools',
    label: 'toolshed',
    title: 'The Toolshed',
    fromRoot: './tools/',
    fromSub: '../tools/',
  },
  {
    id: 'quest',
    label: "pip's quest 🕹",
    title: "Pip's Quest",
    fromRoot: './quest/',
    fromSub: '../quest/',
  },
]

export const HOME = { fromRoot: './', fromSub: '../' }

export function room(id: RoomId): Room {
  const found = ROOMS.find((r) => r.id === id)
  if (!found) throw new Error(`unknown room: ${id}`)
  return found
}
