import type { Tool } from '../tools'

/**
 * French twin of data/tools.ts. Names, URLs and cost facts stay verbatim
 * from the verified source list — only the words around them change.
 */
export const toolsFr: Tool[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    by: 'par Anthropic',
    url: 'https://claude.com/product/claude-code',
    docsUrl: 'https://code.claude.com/docs/en/overview',
    docsLabel: 'lire la doc (en anglais)',
    lives: 'Une appli sympa — ou le terminal. Au choix.',
    cost: 'Inclus dans Claude Pro',
    costTone: 'included',
    blurb: 'L’agent de code d’Anthropic. Tu décris la chose ; il construit la chose — et il demande avant de toucher à quoi que ce soit.',
    goodIf: 'Parfait si tu discutes déjà avec Claude, ou si tu veux le départ le plus doux.',
    waysIn: [
      { kind: 'app', label: 'Dans l’appli Claude', note: 'Télécharge l’appli Claude, connecte-toi — Claude Code est juste là. Le départ le plus doux.' },
      { kind: 'terminal', label: 'Dans le terminal', note: 'Une commande d’installation à copier-coller depuis le guide officiel. Cinq minutes, une seule fois.' },
    ],
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    by: 'par OpenAI',
    url: 'https://developers.openai.com/codex',
    lives: 'Directement dans ChatGPT — ou le terminal.',
    cost: 'Inclus dans ChatGPT Plus',
    costTone: 'included',
    blurb: 'L’agent de code d’OpenAI. Si ChatGPT est déjà ta maison, celui-ci vit sous le même toit.',
    goodIf: 'Parfait si ChatGPT Plus fait déjà partie de ta vie.',
    waysIn: [
      { kind: 'inside', label: 'Dans ChatGPT', note: 'Déjà dans le ChatGPT que tu connais — rien de plus à installer.' },
      { kind: 'app', label: 'En appli à part', note: 'Une appli Codex séparée, à télécharger et connecter avec ton compte ChatGPT.' },
      { kind: 'terminal', label: 'Dans le terminal', note: 'Une commande d’installation depuis le guide officiel, et il vit aussi dans ton terminal.' },
    ],
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    by: 'open source',
    url: 'https://opencode.ai',
    lives: 'Le terminal. (Plus accueillant qu’il n’y paraît — promis.)',
    cost: 'Gratuit & open source',
    costTone: 'free',
    blurb: 'Un agent de code gratuit. L’outil ne coûte rien — tu apportes l’IA : un abonnement Claude ou ChatGPT que tu as déjà, ou tes propres clés API.',
    goodIf: 'Parfait si tu préfères ne pas ajouter un abonnement de plus.',
    waysIn: [
      { kind: 'terminal', label: 'Dans le terminal', note: 'Terminal uniquement : une commande d’installation depuis son site, puis connecte-toi avec l’IA que tu apportes.' },
    ],
  },
  {
    id: 'hermes',
    name: 'Hermes Agent',
    by: 'par Nous Research',
    url: 'https://hermes-agent.nousresearch.com',
    lives: 'Ton propre ordinateur, entièrement à toi.',
    cost: 'Gratuit, open source, auto-hébergé',
    costTone: 'free',
    blurb: 'Un agent gratuit et open source que tu fais tourner toi-même. Liberté maximale, un peu plus d’installation.',
    goodIf: 'Pour le jour où tu en voudras plus. Il sera encore là.',
    forLater: true,
    waysIn: [
      {
        kind: 'self',
        label: 'Auto-hébergé, sur ta machine',
        note: 'Une autre espèce d’animal : tu fais tourner tout l’agent toi-même, en suivant son guide. De la vraie installation — et de la vraie liberté. Pour plus tard.',
      },
    ],
  },
]

/** Les agents vivent aussi dans des éditeurs et d’autres terminaux — une route pour plus tard. */
export const moreWaysInFr = [
  {
    name: 'Cursor',
    url: 'https://cursor.com',
    note: 'Un éditeur de code avec des agents intégrés — populaire chez celles et ceux qui écrivent déjà du code.',
  },
  {
    name: 'VS Code',
    url: 'https://code.visualstudio.com',
    note: 'L’éditeur gratuit de Microsoft ; Claude Code, Codex et d’autres s’y branchent directement.',
  },
  {
    name: 'Gemini CLI',
    url: 'https://github.com/google-gemini/gemini-cli',
    note: 'L’agent de terminal gratuit de Google — la même idée, propulsée par Gemini.',
  },
]

export const chatLinksFr = [
  { name: 'Claude', url: 'https://claude.ai' },
  { name: 'ChatGPT', url: 'https://chatgpt.com' },
]

/** La page MDN existe en français — vérifiée. */
export const mdnCommandLineFr = {
  name: 'MDN : cours accéléré sur la ligne de commande',
  url: 'https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Environment_setup/Command_line',
}
