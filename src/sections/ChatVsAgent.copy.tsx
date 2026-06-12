import type { ReactNode } from 'react'
import type { Locale } from '../i18n/locale'
import { GlossaryTip } from '../components/GlossaryTip'

interface ChatVsAgentCopy {
  eyebrow: string
  title: string
  kicker: string
  request: string
  sentLine: string
  /** the glossary-woven explainer paragraph */
  explainer: ReactNode
  punchPlain: string
  punchCircled: string
}

export const CHAT_VS_AGENT_COPY = {
  en: {
    eyebrow: 'the difference',
    title: 'A chat answers. An agent does.',
    kicker: 'Same message, two very different mornings. Watch — and when the agent asks, answer.',
    request: '“make a birthday page for my friend Maya”',
    sentLine: 'the same message, sent to two places ↓',
    explainer: (
      <>
        That builder is an <GlossaryTip k="agent">agent</GlossaryTip>. The message you typed? That's a{' '}
        <GlossaryTip k="prompt">prompt</GlossaryTip> — you've been writing them all along. And the place agents often
        live, the <GlossaryTip k="terminal">terminal</GlossaryTip>, is just a text window. You'll meet one safely in a
        second.
      </>
    ),
    punchPlain: 'It does the steps.',
    punchCircled: 'You do the deciding.',
  },
  fr: {
    eyebrow: 'la différence',
    title: 'Un chat répond. Un agent fait.',
    kicker: 'Le même message, deux histoires très différentes. Regarde — et quand l’agent te pose sa question, réponds.',
    request: '« fais une page d’anniversaire pour mon amie Maya »',
    sentLine: 'le même message, envoyé à deux endroits ↓',
    explainer: (
      <>
        Ce bâtisseur est un <GlossaryTip k="agent">agent</GlossaryTip>. Le message que tu as tapé ? C’est un{' '}
        <GlossaryTip k="prompt">prompt</GlossaryTip> — tu en écris depuis le début. Et là où vivent souvent les agents,
        le <GlossaryTip k="terminal">terminal</GlossaryTip>, c’est juste une fenêtre de texte. Tu vas en rencontrer un
        sans risque dans une seconde.
      </>
    ),
    punchPlain: 'Lui fait les étapes.',
    punchCircled: 'Toi, tu décides.',
  },
} satisfies Record<Locale, ChatVsAgentCopy>

export type TheaterPhase = 'idle' | 'send' | 'work' | 'decision' | 'finish' | 'done'

interface TheaterCopy {
  message: string
  chatTitle: string
  chatSub: string
  chatReply: string
  receipt: string[]
  receiptMore: string
  stepsForYou: string
  chatStamp: string
  agentTitle: string
  agentSub: string
  agentReply: string
  emptyLot: string
  banner: string
  confettiChip: string
  decisionKicker: string
  decisionQ: string
  optSun: string
  optBlush: string
  decisionNote: string
  builtA: string
  builtB: string
  colorSun: string
  colorBlush: string
  agentStamp: string
  replay: string
  narration: Record<TheaterPhase, string>
}

export const THEATER_COPY = {
  en: {
    message: 'make a birthday page for my friend Maya',
    chatTitle: 'Chat mode',
    chatSub: 'answers in words',
    chatReply: "Sure! Here's how:",
    receipt: [
      '1. Install a code editor',
      '2. New file: index.html',
      '3. Copy this HTML in',
      '4. New file: style.css',
      '5. Link the stylesheet',
      '6. Save everything',
      '7. Open it in a browser',
      '8. Fix what looks off',
      '9. Add a confetti library',
    ],
    receiptMore: '…plus 13 more steps',
    stepsForYou: 'steps for you:',
    chatStamp: 'your to-do list: 23 steps 📝',
    agentTitle: 'Agent mode',
    agentSub: "builds — and asks when it's your call",
    agentReply: "On it. I'll ask when it's your call.",
    emptyLot: 'empty lot — waiting for the okay…',
    banner: 'HAPPY BIRTHDAY, MAYA!',
    confettiChip: '🎉 confetti!',
    decisionKicker: 'quick one — your call',
    decisionQ: "Maya's favorite color?",
    optSun: '🌞 sunny yellow',
    optBlush: '🌸 bubblegum pink',
    decisionNote: 'agents pause for the parts only you know.',
    builtA: '✓ built — in ',
    builtB: ', your call',
    colorSun: 'sunny yellow',
    colorBlush: 'bubblegum pink',
    agentStamp: 'your to-do list: 1 decision 🎂',
    replay: '↺ replay the little show',
    narration: {
      idle: '',
      send: 'You send the same message to both: make a birthday page for my friend Maya.',
      work: 'The chat answers with a long to-do list for you. The agent starts building the page itself.',
      decision: "The agent pauses and asks: Maya's favorite color? Two buttons follow.",
      finish: 'You chose. The agent finishes the page in your color.',
      done: 'Result: the chat handed you 23 steps. The agent built the page — you made one decision.',
    },
  },
  fr: {
    message: 'fais une page d’anniversaire pour mon amie Maya',
    chatTitle: 'Mode chat',
    chatSub: 'répond avec des mots',
    chatReply: 'Bien sûr ! Voici comment :',
    receipt: [
      '1. Installe un éditeur',
      '2. Fichier : index.html',
      '3. Copie ce HTML dedans',
      '4. Fichier : style.css',
      '5. Relie la feuille CSS',
      '6. Enregistre tout',
      '7. Ouvre le navigateur',
      '8. Corrige ce qui cloche',
      '9. Ajoute les confettis',
    ],
    receiptMore: '…plus 13 autres étapes',
    stepsForYou: 'étapes pour toi :',
    chatStamp: 'ta liste de choses à faire : 23 étapes 📝',
    agentTitle: 'Mode agent',
    agentSub: 'construit — et demande quand c’est ton choix',
    agentReply: 'C’est parti. Je te demande dès que c’est ton choix.',
    emptyLot: 'terrain vide — en attente du feu vert…',
    banner: 'JOYEUX ANNIVERSAIRE, MAYA !',
    confettiChip: '🎉 confettis !',
    decisionKicker: 'petite question — à toi de voir',
    decisionQ: 'La couleur préférée de Maya ?',
    optSun: '🌞 jaune soleil',
    optBlush: '🌸 rose bonbon',
    decisionNote: 'les agents font pause pour ce qui dépend de toi.',
    builtA: '✓ construite — en ',
    builtB: ', ton choix',
    colorSun: 'jaune soleil',
    colorBlush: 'rose bonbon',
    agentStamp: 'ta liste de choses à faire : 1 décision 🎂',
    replay: '↺ rejouer le petit spectacle',
    narration: {
      idle: '',
      send: 'Tu envoies le même message aux deux : fais une page d’anniversaire pour mon amie Maya.',
      work: 'Le chat répond avec une longue liste de choses à faire, pour toi. L’agent commence à construire la page lui-même.',
      decision: 'L’agent s’arrête et demande : la couleur préférée de Maya ? Deux boutons suivent.',
      finish: 'Tu as choisi. L’agent termine la page dans ta couleur.',
      done: 'Résultat : le chat t’a tendu 23 étapes. L’agent a construit la page — tu as pris une décision.',
    },
  },
} satisfies Record<Locale, TheaterCopy>
