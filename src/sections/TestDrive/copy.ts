import type { Locale } from '../../i18n/locale'

interface TestDriveCopy {
  /* section intro (home) */
  eyebrow: string
  titleA: string
  titleB: string
  kicker: string
  doneCta: string
  deckCta: string
  /* annotation line under the window */
  noteDone: string
  noteSend: string
  noteTyping: string
  notePermission: string
  noteWatch: string
  noteFiddly: string
  /* window chrome */
  windowTitle: string
  replayBtn: string
  chooseBtn: string
  /* terminal */
  skipTyping: string
  yourMessage: string
  sendIt: string
  /* picker */
  playThis: string
  allPretend: string
  /* permission card */
  permKicker: string
  permReAsk: string
  allow: string
  deny: string
  permFootnote: string
  /* file tree */
  filesLabel: string
  startedEmpty: string
  emptyNote: string
  /* preview */
  computerSlug: string
  previewPlaceholder: string
  getPrompt: string
  getPromptAria: string
  pagerAria: string
  prevAria: string
  nextAria: string
  screenWord: string
}

export const TEST_DRIVE_COPY = {
  en: {
    eyebrow: 'feel it',
    titleA: 'Take one for a ',
    titleB: 'test drive.',
    kicker:
      'Pick a pretend mission and play the human. This is a scripted replay — a little movie you click through. Nothing real runs, and nothing on your device is touched. Promise.',
    doneCta: 'Get your real first prompt ↓',
    deckCta: '🎬 see all eight missions — the Mission Deck ↗',
    noteDone: "Now imagine it with your idea in the message. That's the whole move.",
    noteSend: 'Your message is pre-written — just send it.',
    noteTyping: 'Agents narrate as they go. (Feel free to skip the typing.)',
    notePermission: "Real agents always ask first. You're the boss.",
    noteWatch: 'Watch the side panes — the pretend folder is filling up.',
    noteFiddly: 'The agent is doing the fiddly part.',
    windowTitle: 'pretend agent — scripted replay',
    replayBtn: '↺ replay this mission',
    chooseBtn: 'choose another mission',
    skipTyping: 'skip the typing ▸▸',
    yourMessage: 'your message — already written for you',
    sendIt: 'Send it ▸',
    playThis: 'play this one ▸',
    allPretend: 'all of these are make-believe — the same moves as the real thing, with zero risk.',
    permKicker: 'permission needed — you decide',
    permReAsk: '(asking again — no rush)',
    allow: 'Allow ✓',
    deny: 'Not now',
    permFootnote: 'real agents always ask first — and “not now” always works.',
    filesLabel: 'files',
    startedEmpty: '— started empty',
    emptyNote: 'nothing here yet. an empty folder has nothing to lose.',
    computerSlug: 'your-computer',
    previewPlaceholder: 'the page will appear here…',
    getPrompt: 'get this prompt ↗',
    getPromptAria: 'Open the matching starter prompt in the Pantry',
    pagerAria: 'Browse the screens built so far',
    prevAria: 'Previous screen',
    nextAria: 'Next screen',
    screenWord: 'Screen',
  },
  fr: {
    eyebrow: 'à toi de jouer',
    titleA: 'Fais un petit ',
    titleB: 'tour d’essai.',
    kicker:
      'Choisis une mission pour de faux et joue le rôle de l’humain. C’est une rediffusion scénarisée — un petit film que tu fais avancer en cliquant. Rien de réel ne tourne, et rien sur ton appareil n’est touché. Promis.',
    doneCta: 'Récupère ton vrai premier prompt ↓',
    deckCta: '🎬 voir les huit missions — le Deck des Missions ↗',
    noteDone: 'Maintenant, imagine le même film avec ton idée dans le message. C’est tout le geste.',
    noteSend: 'Ton message est déjà écrit — tu n’as qu’à l’envoyer.',
    noteTyping: 'Les agents racontent ce qu’ils font. (Tu peux sauter la frappe.)',
    notePermission: 'Les vrais agents demandent toujours d’abord. C’est toi qui commandes.',
    noteWatch: 'Regarde les panneaux d’à côté — le dossier pour de faux se remplit.',
    noteFiddly: 'L’agent fait la partie pénible.',
    windowTitle: 'agent pour de faux — rediffusion scénarisée',
    replayBtn: '↺ rejouer cette mission',
    chooseBtn: 'choisir une autre mission',
    skipTyping: 'sauter la frappe ▸▸',
    yourMessage: 'ton message — déjà écrit pour toi',
    sendIt: 'Envoyer ▸',
    playThis: 'jouer celle-ci ▸',
    allPretend: 'tout ça, c’est pour de faux — les mêmes gestes que la vraie vie, avec zéro risque.',
    permKicker: 'permission demandée — tu décides',
    permReAsk: '(il redemande — pas de stress)',
    allow: 'Autoriser ✓',
    deny: 'Pas maintenant',
    permFootnote: 'un vrai agent demande toujours d’abord — et “pas maintenant” marche toujours.',
    filesLabel: 'fichiers',
    startedEmpty: '— vide au départ',
    emptyNote: 'rien ici pour l’instant. un dossier vide n’a rien à perdre.',
    computerSlug: 'ton-ordi',
    previewPlaceholder: 'la page apparaîtra ici…',
    getPrompt: 'prendre ce prompt ↗',
    getPromptAria: 'Ouvrir le prompt correspondant dans la Réserve',
    pagerAria: 'Parcourir les écrans déjà construits',
    prevAria: 'Écran précédent',
    nextAria: 'Écran suivant',
    screenWord: 'Écran',
  },
} satisfies Record<Locale, TestDriveCopy>
