import type { Locale } from '../../i18n/locale'

interface PromptsPageCopy {
  eyebrow: string
  title: string
  /** rendered as `${count} ${kickerTail}` */
  kickerTail: string
  safetyLine: string
  mixCta: string
  browseCta: string
  filterAria: string
  everything: string
  countAll: (n: number) => string
  countSome: (shown: number, total: number) => string
  surpriseMe: string
  shelvesSr: string
  classicBadge: string
  mixerTitle: string
  mixerSticker: string
  mixerSub: string
  legendWhat: string
  legendWho: string
  legendBecause: string
  needLabel: string
  needPlaceholder: string
  legendFeeling: string
  legendColors: string
  legendPowers: string
  surpriseMix: string
  mixedAria: string
  copyMixed: string
  pasteAdvice: string
  matchesHeader: string
  bottomA: string
  bottomLink: string
  bottomB: string
}

export const PAGE_COPY = {
  en: {
    eyebrow: 'the library',
    title: 'The Prompt Pantry',
    kickerTail: 'paste-ready prompts, organized by life — not by technology. Browse the shelves, or mix your own.',
    safetyLine: 'every prompt here starts in a brand-new empty folder — nothing on your computer is at risk.',
    mixCta: '🎛 Mix your own prompt ↓',
    browseCta: 'browse the shelves ↓',
    filterAria: 'Filter the shelves',
    everything: 'everything',
    countAll: (n) => `all ${n} prompts`,
    countSome: (shown, total) => `${shown} of ${total} prompts`,
    surpriseMe: '🎲 surprise me',
    shelvesSr: 'The shelves',
    classicBadge: 'the classic',
    mixerTitle: 'The Prompt Mixer',
    mixerSticker: 'build your own',
    mixerSub: 'No shelf had your idea? Mix a fresh prompt — every combination keeps the safety habits baked in.',
    legendWhat: 'I want to make…',
    legendWho: 'for…',
    legendBecause: 'because…',
    needLabel: 'your need, in a sentence — optional but powerful',
    needPlaceholder: 'e.g. customers keep asking my opening hours · I overspend on takeout…',
    legendFeeling: 'feeling…',
    legendColors: 'colored like…',
    legendPowers: 'extra powers — pick any',
    surpriseMix: '🎲 surprise mix',
    mixedAria: 'Your mixed prompt',
    copyMixed: 'Copy my mixed prompt',
    pasteAdvice: 'Before you paste it: add one sentence only you could write — the detail that makes it yours.',
    matchesHeader: 'already on the shelves — close matches',
    bottomA: 'New here? Take the ',
    bottomLink: 'test drive',
    bottomB: ' first — it shows you exactly what happens after you paste.',
  },
  fr: {
    eyebrow: 'la bibliothèque',
    title: 'La Réserve à Prompts',
    kickerTail: 'prompts prêts à coller, rangés par vie — pas par technologie. Parcours les étagères, ou compose le tien.',
    safetyLine: 'chaque prompt ici démarre dans un dossier vide tout neuf — rien sur ton ordinateur n’est en danger.',
    mixCta: '🎛 Compose ton propre prompt ↓',
    browseCta: 'parcourir les étagères ↓',
    filterAria: 'Filtrer les étagères',
    everything: 'tout',
    countAll: (n) => `les ${n} prompts`,
    countSome: (shown, total) => `${shown} prompts sur ${total}`,
    surpriseMe: '🎲 surprends-moi',
    shelvesSr: 'Les étagères',
    classicBadge: 'le classique',
    mixerTitle: 'Le Mixeur à Prompts',
    mixerSticker: 'à composer toi-même',
    mixerSub: 'Aucune étagère n’avait ton idée ? Compose un prompt tout frais — chaque combinaison garde les bons réflexes de sécurité intégrés.',
    legendWhat: 'Je veux faire…',
    legendWho: 'pour…',
    legendBecause: 'parce que…',
    needLabel: 'ton besoin, en une phrase — optionnel mais puissant',
    needPlaceholder: 'ex. les clients demandent sans arrêt mes horaires · je craque trop sur les plats à emporter…',
    legendFeeling: 'ambiance…',
    legendColors: 'aux couleurs de…',
    legendPowers: 'pouvoirs bonus — prends-en autant que tu veux',
    surpriseMix: '🎲 mix surprise',
    mixedAria: 'Ton prompt mixé',
    copyMixed: 'Copier mon prompt mixé',
    pasteAdvice: 'Avant de le coller : ajoute une phrase que toi seul·e pourrais écrire — le détail qui le rend vraiment tien.',
    matchesHeader: 'déjà sur les étagères — de proches cousins',
    bottomA: 'Nouveau par ici ? Fais d’abord le ',
    bottomLink: 'tour d’essai',
    bottomB: ' — il te montre exactement ce qui se passe après le collage.',
  },
} satisfies Record<Locale, PromptsPageCopy>
