import type { Locale } from '../i18n/locale'

interface SendOffCopy {
  eyebrow: string
  titleA: string
  titleB: string
  checklist: string[]
  finalA: string
  finalB: string
  cta: string
  decoderA: string
  decoderLink: string
  decoderB: string
}

export const SEND_OFF_COPY = {
  en: {
    eyebrow: 'the secret',
    titleA: 'The door was open',
    titleB: 'the whole time.',
    checklist: [
      'You know what an agent is — a doer, not just an answerer.',
      "You've felt a session: message → permission → result.",
      'You know which tool fits your pocket.',
      'Your first prompt is one paste away.',
    ],
    finalA: 'Open a tool. Paste a prompt.',
    finalB: 'Make a thing for someone you like.',
    cta: 'Grab a prompt again ↑',
    decoderA: 'and keep ',
    decoderLink: '🛟 the decoder',
    decoderB: ' in your pocket — for the weird moments.',
  },
  fr: {
    eyebrow: 'le secret',
    titleA: 'La porte était ouverte',
    titleB: 'depuis le début.',
    checklist: [
      'Tu sais ce qu’est un agent — un faiseur, pas juste un répondeur.',
      'Tu as senti une session : message → permission → résultat.',
      'Tu sais quel outil va avec ton budget.',
      'Ton premier prompt est à un coller près.',
    ],
    finalA: 'Ouvre un outil. Colle un prompt.',
    finalB: 'Fabrique un truc pour quelqu’un que tu aimes bien.',
    cta: 'Reprendre un prompt ↑',
    decoderA: 'et garde ',
    decoderLink: '🛟 le décodeur',
    decoderB: ' dans ta poche — pour les moments bizarres.',
  },
} satisfies Record<Locale, SendOffCopy>
