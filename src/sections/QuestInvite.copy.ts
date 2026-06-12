import type { Locale } from '../i18n/locale'

interface QuestInviteCopy {
  pressStart: string
  title: string
  body: string
  cta: string
  sideTabA: string
  sideTabB: string
  dismissAria: string
}

export const QUEST_INVITE_COPY = {
  en: {
    pressStart: "▶ press start — pip's quest",
    title: 'Prefer to learn by playing?',
    body: 'Walk a tiny pixel valley, meet the Terminal in person, peek inside an agent office — and outsmart the Data Snatcher at the door. ~10 minutes, one boss, zero risk.',
    cta: 'Play the quest 🕹',
    sideTabA: 'play',
    sideTabB: "Pip's Quest",
    dismissAria: 'Hide the quest invitation',
  },
  fr: {
    pressStart: '▶ appuie sur start — la quête de pip',
    title: 'Tu préfères apprendre en jouant ?',
    body: 'Balade-toi dans une petite vallée en pixels, rencontre le Terminal en personne, jette un œil dans un bureau d’agents — et déjoue le Chapardeur de Données à la porte. ~10 minutes, un boss, zéro risque.',
    cta: 'Jouer à la quête 🕹',
    sideTabA: 'jouer à',
    sideTabB: 'la Quête de Pip',
    dismissAria: 'Masquer l’invitation au jeu',
  },
} satisfies Record<Locale, QuestInviteCopy>
