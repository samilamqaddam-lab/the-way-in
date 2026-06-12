import type { Locale } from '../i18n/locale'

interface FirstPromptsCopy {
  eyebrow: string
  title: string
  kicker: string
  pantryCta: string
  bottomA: string
  bottomLink: string
}

export const FIRST_PROMPTS_COPY = {
  en: {
    eyebrow: 'take-away',
    title: 'Leave with something to make.',
    kicker:
      "Three first builds, written for you. Copy one, paste it into your tool, answer its questions — about fifteen minutes later, you've made a real thing.",
    pantryCta: '🧺 browse the whole Prompt Pantry — budgets, businesses, gifts & more ↗',
    bottomA:
      "Make them yours — change the folder names, the questions, anything. The agent rolls with it. And if you don't have a tool yet, ",
    bottomLink: 'pick your door ↑',
  },
  fr: {
    eyebrow: 'à emporter',
    title: 'Repars avec quelque chose à construire.',
    kicker:
      'Trois premières constructions, écrites pour toi. Copies-en une, colle-la dans ton outil, réponds à ses questions — environ quinze minutes plus tard, tu as fabriqué un vrai truc.',
    pantryCta: '🧺 explorer toute la Réserve à Prompts — budgets, business, cadeaux & plus ↗',
    bottomA:
      'Fais-les tiens — change les noms de dossiers, les questions, tout ce que tu veux. L’agent suit. Et si tu n’as pas encore d’outil, ',
    bottomLink: 'choisis ta porte ↑',
  },
} satisfies Record<Locale, FirstPromptsCopy>
