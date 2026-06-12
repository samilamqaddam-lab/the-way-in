import type { Locale } from '../i18n/locale'

interface HeroCopy {
  eyebrow: string
  /** headline, split so the squiggle can underline the second half */
  headA: string
  headB: string
  sub: string
  ctaPrimary: string
  ctaSecondary: string
  finePrint: string
  scrollHint: string
  marquee: string[]
  marqueeSr: string
}

export const HERO_COPY = {
  en: {
    eyebrow: 'a free little guide to AI agents',
    headA: 'You can already do ',
    headB: 'the hard part.',
    sub: "An agent is the AI that doesn't just answer — it builds the thing. If you've ever written a good message to ChatGPT or Claude, you already speak its language. This site walks you through the door, and nothing here can break.",
    ctaPrimary: 'Take the test drive ↓',
    ctaSecondary: 'or learn it by playing 🕹',
    finePrint: 'free · no signup · ~10 minutes · you leave with a ready-to-paste prompt',
    scrollHint: "scroll — the door's this way",
    marquee: [
      'a birthday page for a best friend',
      'a chore wheel for the kids',
      'a poem book for grandma',
      'a fan page for a football club',
      'a study timer',
      'a recipe card that never gets lost',
      'a countdown to vacation',
      'a tiny quiz for friends',
    ],
    marqueeSr: 'Things beginners made recently:',
  },
  fr: {
    eyebrow: 'un petit guide gratuit des agents IA',
    headA: 'Tu sais déjà faire ',
    headB: 'le plus dur.',
    sub: 'Un agent, c’est l’IA qui ne se contente pas de répondre — elle construit la chose. Si tu as déjà écrit un bon message à ChatGPT ou Claude, tu parles déjà sa langue. Ce site t’ouvre la porte, et rien ici ne peut casser.',
    ctaPrimary: 'Fais le tour d’essai ↓',
    ctaSecondary: 'ou apprends en jouant 🕹',
    finePrint: 'gratuit · sans compte · ~10 minutes · tu repars avec un prompt prêt à coller',
    scrollHint: 'fais défiler — la porte est par là',
    marquee: [
      'une page d’anniversaire pour une meilleure amie',
      'une roue des corvées pour les enfants',
      'un recueil de poèmes pour mamie',
      'une page de fan pour un club de foot',
      'un minuteur de révisions',
      'une fiche recette qui ne se perd jamais',
      'un compte à rebours des vacances',
      'un petit quiz pour les copains',
    ],
    marqueeSr: 'Ce que des débutants ont fabriqué récemment :',
  },
} satisfies Record<Locale, HeroCopy>
