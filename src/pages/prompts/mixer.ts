import type { Locale } from '../../i18n/locale'
import type { CategoryId } from '../../data/pantry'

/**
 * The Prompt Mixer's options and sentence templates, per language.
 * Option ids are shared across locales (they live in component state and
 * drive the shelf-matching); labels, phrases and the composed prompt are
 * native to each language — a template per language, never a word-swap.
 */

export interface MixOption {
  id: string
  label: string
  phrase: string
}

export interface MixWho extends MixOption {
  slug: string
}

export interface MixColor {
  id: string
  label: string
  dots: readonly string[]
  phrase: string
}

export interface MixPurpose {
  id: string
  label: string
  phrase: string
  cats: readonly CategoryId[]
}

export type PowerId = 'remembers' | 'offline' | 'surprise' | 'readable' | 'printable'

export interface MixPower {
  id: PowerId
  label: string
}

interface ComposeArgs {
  what: MixOption
  who: MixWho
  vibe: MixOption
  color: MixColor
  purpose: MixPurpose
  need: string
  powers: Set<PowerId>
}

export interface MixerDef {
  what: readonly MixOption[]
  who: readonly MixWho[]
  vibe: readonly MixOption[]
  colors: readonly MixColor[]
  purpose: readonly MixPurpose[]
  powers: readonly MixPower[]
  compose: (a: ComposeArgs) => string
}

/* ─── English ───────────────────────────────────────────────────────────── */

const EN: MixerDef = {
  what: [
    { id: 'page', label: 'a page', phrase: 'a one-page website' },
    { id: 'app', label: 'a little app', phrase: 'a tiny app' },
    { id: 'slides', label: 'a slideshow', phrase: 'a slideshow site I can flip through like slides' },
  ],
  who: [
    { id: 'me', label: 'me', phrase: 'myself', slug: 'me' },
    { id: 'love', label: 'someone I love', phrase: 'someone I love', slug: 'someone-special' },
    { id: 'family', label: 'my family', phrase: 'my family', slug: 'the-family' },
    { id: 'friends', label: 'my friends', phrase: 'my friends', slug: 'the-crew' },
  ],
  vibe: [
    { id: 'cozy', label: 'cozy', phrase: 'cozy and warm' },
    { id: 'fun', label: 'loud & fun', phrase: 'loud, colorful and fun' },
    { id: 'calm', label: 'clean & calm', phrase: 'clean, calm and uncluttered' },
    { id: 'fancy', label: 'a little fancy', phrase: 'elegant and a little fancy' },
  ],
  colors: [
    { id: 'sunset', label: 'warm sunset', dots: ['#F4581C', '#FF7E9D', '#FFC83D'], phrase: 'warm sunset oranges and pinks' },
    { id: 'garden', label: 'fresh garden', dots: ['#1F9D5B', '#7BE0A2', '#FFF6E0'], phrase: 'fresh garden greens' },
    { id: 'sea', label: 'sea & sky', dots: ['#2D8CFF', '#8FC2FF', '#F5EDE0'], phrase: 'calm sea-and-sky blues' },
    { id: 'candy', label: 'candy pop', dots: ['#FF7E9D', '#6C4DF4', '#FFC83D'], phrase: 'bright candy-shop colors' },
    { id: 'pastel', label: 'soft pastels', dots: ['#FFD9CF', '#D9E8FF', '#DFF5E7'], phrase: 'soft, dreamy pastels' },
    { id: 'inkpaper', label: 'ink & paper', dots: ['#1B1611', '#FBF5EB'], phrase: 'simple ink-on-paper black and cream' },
    { id: 'agent', label: "✨ agent's pick", dots: [], phrase: '' },
  ],
  purpose: [
    { id: 'joy', label: '✨ just for joy', phrase: "It's just for joy.", cats: ['hobby', 'words'] },
    { id: 'celebration', label: '🎉 a celebration', phrase: "It's for a celebration.", cats: ['love'] },
    {
      id: 'business',
      label: '💼 my business',
      phrase: "It's for my small business — it should feel trustworthy and clear.",
      cats: ['thing'],
    },
    {
      id: 'money',
      label: '📊 money & plans',
      phrase: "It's for keeping my money or my plans organized.",
      cats: ['helpers'],
    },
    { id: 'learning', label: '📚 learning', phrase: "It's for learning or teaching something.", cats: ['school'] },
  ],
  powers: [
    { id: 'remembers', label: '🧠 remembers things' },
    { id: 'offline', label: '✈️ works offline' },
    { id: 'surprise', label: '🎉 a hidden surprise' },
    { id: 'readable', label: '👓 big & readable' },
    { id: 'printable', label: '🖨️ print-friendly' },
  ],
  compose({ what, who, vibe, color, purpose, need, powers }) {
    const folder = `my-${what.id}-for-${who.slug}`
    const colorLine =
      color.id === 'agent' ? ' Pick colors you think fit — surprise me.' : ` Lean its colors toward ${color.phrase}.`
    const needLine = need.trim() ? ` In my own words, the need is: ${need.trim().slice(0, 240)}` : ''
    const needPunct = needLine && !/[.!?]$/.test(needLine) ? '.' : ''

    let build = `Then create a new empty folder called "${folder}" and work only inside it, using plain HTML, CSS and JavaScript — no installs, no frameworks. Make it look great on a phone.`
    if (powers.has('offline')) build += ' It should work completely offline once opened.'
    if (powers.has('readable'))
      build += ' Make all the text big and easy on tired eyes — generous sizes, strong contrast, nothing cramped.'
    if (powers.has('printable')) build += ' It should also look tidy when printed.'
    build += powers.has('remembers')
      ? ' It should remember things between visits — save them in the browser with localStorage, and add a small note that my data never leaves my device.'
      : ' If anything needs to be saved (like a list), use localStorage and add a small note that my data never leaves my device.'
    if (powers.has('surprise'))
      build +=
        " Hide one small, tasteful surprise in it — a confetti moment or a tiny easter egg — and tell me where it is after you're done."

    return `Hi! I'm brand new to this — please be my friendly guide as well as my builder. I want to make ${what.phrase} for ${who.phrase}, with a ${vibe.phrase} feel.${colorLine} ${purpose.phrase}${needLine}${needPunct}

Before you write any code, ask me four to six short questions, one at a time, to sharpen exactly what it should say and contain — the names, the details that matter, and anything only I would know. If my description above is vague, your questions are how we fix that together.

${build}

When you're done, explain what each file does in simple words, show me how to open it in my browser, and suggest three small changes I could ask you for next.`
  },
}

/* ─── Français ──────────────────────────────────────────────────────────── */

const FR_FOLDER_WHAT: Record<string, string> = {
  page: 'ma-page',
  app: 'ma-petite-appli',
  slides: 'mon-diaporama',
}

const FR: MixerDef = {
  what: [
    { id: 'page', label: 'une page', phrase: 'un site d’une seule page' },
    { id: 'app', label: 'une petite appli', phrase: 'une petite appli' },
    { id: 'slides', label: 'un diaporama', phrase: 'un site-diaporama que je feuillette comme des diapos' },
  ],
  who: [
    { id: 'me', label: 'moi', phrase: 'moi-même', slug: 'moi' },
    { id: 'love', label: 'quelqu’un que j’aime', phrase: 'quelqu’un que j’aime', slug: 'quelquun-de-special' },
    { id: 'family', label: 'ma famille', phrase: 'ma famille', slug: 'la-famille' },
    { id: 'friends', label: 'mes amis', phrase: 'mes amis', slug: 'la-bande' },
  ],
  vibe: [
    { id: 'cozy', label: 'cosy', phrase: 'cosy et chaleureuse' },
    { id: 'fun', label: 'pétante & fun', phrase: 'pétante, colorée et fun' },
    { id: 'calm', label: 'nette & calme', phrase: 'nette, calme et épurée' },
    { id: 'fancy', label: 'un peu chic', phrase: 'élégante et un peu chic' },
  ],
  colors: [
    { id: 'sunset', label: 'coucher de soleil', dots: ['#F4581C', '#FF7E9D', '#FFC83D'], phrase: 'des orangés et des roses de coucher de soleil' },
    { id: 'garden', label: 'jardin frais', dots: ['#1F9D5B', '#7BE0A2', '#FFF6E0'], phrase: 'des verts frais de jardin' },
    { id: 'sea', label: 'mer & ciel', dots: ['#2D8CFF', '#8FC2FF', '#F5EDE0'], phrase: 'des bleus calmes de mer et de ciel' },
    { id: 'candy', label: 'bonbons pop', dots: ['#FF7E9D', '#6C4DF4', '#FFC83D'], phrase: 'des couleurs vives de confiserie' },
    { id: 'pastel', label: 'pastels doux', dots: ['#FFD9CF', '#D9E8FF', '#DFF5E7'], phrase: 'des pastels doux et rêveurs' },
    { id: 'inkpaper', label: 'encre & papier', dots: ['#1B1611', '#FBF5EB'], phrase: 'un simple noir encre sur crème, façon papier' },
    { id: 'agent', label: '✨ au choix de l’agent', dots: [], phrase: '' },
  ],
  purpose: [
    { id: 'joy', label: '✨ juste pour la joie', phrase: 'C’est juste pour la joie.', cats: ['hobby', 'words'] },
    { id: 'celebration', label: '🎉 une fête', phrase: 'C’est pour une fête.', cats: ['love'] },
    {
      id: 'business',
      label: '💼 mon activité',
      phrase: 'C’est pour ma petite activité — ça doit inspirer confiance et rester clair.',
      cats: ['thing'],
    },
    {
      id: 'money',
      label: '📊 sous & projets',
      phrase: 'C’est pour garder mon argent ou mes projets en ordre.',
      cats: ['helpers'],
    },
    { id: 'learning', label: '📚 apprendre', phrase: 'C’est pour apprendre ou enseigner quelque chose.', cats: ['school'] },
  ],
  powers: [
    { id: 'remembers', label: '🧠 retient les choses' },
    { id: 'offline', label: '✈️ marche hors ligne' },
    { id: 'surprise', label: '🎉 une surprise cachée' },
    { id: 'readable', label: '👓 grand & lisible' },
    { id: 'printable', label: '🖨️ joli à imprimer' },
  ],
  compose({ what, who, vibe, color, purpose, need, powers }) {
    const folder = `${FR_FOLDER_WHAT[what.id] ?? 'mon-projet'}-pour-${who.slug}`
    const colorLine =
      color.id === 'agent'
        ? ' Choisis les couleurs qui te semblent justes — surprends-moi.'
        : ` Oriente ses couleurs vers ${color.phrase}.`
    const needLine = need.trim() ? ` Avec mes mots à moi, le besoin : ${need.trim().slice(0, 240)}` : ''
    const needPunct = needLine && !/[.!?…]$/.test(needLine) ? '.' : ''

    let build = `Ensuite, crée un nouveau dossier vide nommé "${folder}" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, aucun framework. Assure-toi que ce soit superbe sur téléphone.`
    if (powers.has('offline')) build += ' Tout doit marcher complètement hors ligne une fois ouvert.'
    if (powers.has('readable'))
      build += ' Mets tout le texte en grand, doux pour les yeux fatigués — des tailles généreuses, un contraste fort, rien de serré.'
    if (powers.has('printable')) build += ' Il faut aussi que ça reste propre à l’impression.'
    build += powers.has('remembers')
      ? ' Il doit retenir les choses d’une visite à l’autre — sauvegarde-les dans le navigateur avec localStorage, et ajoute une petite note disant que mes données ne quittent jamais mon appareil.'
      : ' Si quelque chose doit être sauvegardé (comme une liste), utilise localStorage et ajoute une petite note disant que mes données ne quittent jamais mon appareil.'
    if (powers.has('surprise'))
      build +=
        ' Caches-y une petite surprise de bon goût — un moment confettis ou un mini easter egg — et dis-moi où elle est quand tu as fini.'

    return `Salut ! Je débute complètement — sois mon guide bienveillant autant que mon bâtisseur. Je veux faire ${what.phrase} pour ${who.phrase}, avec une ambiance ${vibe.phrase}.${colorLine} ${purpose.phrase}${needLine}${needPunct}

Avant d’écrire le moindre code, pose-moi quatre à six questions courtes, une à la fois, pour préciser exactement ce que ça doit dire et contenir — les prénoms, les détails qui comptent, et tout ce que personne d’autre que moi ne sait. Si ma description est vague, tes questions sont notre façon d’arranger ça ensemble.

${build}

Quand tu as fini, explique-moi ce que fait chaque fichier avec des mots simples, montre-moi comment l’ouvrir dans mon navigateur, et propose trois petites modifications que je pourrais te demander ensuite.`
  },
}

export const MIXER = { en: EN, fr: FR } satisfies Record<Locale, MixerDef>
