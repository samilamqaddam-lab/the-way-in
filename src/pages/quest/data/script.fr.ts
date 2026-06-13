import type { BossQuestion, DialogPage, DialogRun, ShardDef } from './script'

/**
 * French twin of data/script.ts — every word spoken in the quest, tu voice.
 * Tool facts stay verbatim-faithful to the verified list; ids are shared
 * with the English script so progress carries across languages.
 */

export const SHARDS_FR: ShardDef[] = [
  { id: 'language', emoji: '💬', title: 'Tu parles déjà la langue' },
  { id: 'terminal', emoji: '🖥️', title: 'La porte polyvalente' },
  { id: 'apps', emoji: '📱', title: 'Les portes faciles' },
  { id: 'orchestra', emoji: '🎼', title: 'Plein de mains, un seul chef — toi' },
  { id: 'safety', emoji: '🛡️', title: 'Demander d’abord, ne rien casser' },
]

const D = (id: string, pages: DialogPage[], extra?: Partial<DialogRun>): DialogRun => ({ id, pages, ...extra })

export const DIALOGS_FR: Record<string, DialogRun> = {
  /* ── le kiosque du Chat ──────────────────────────────────────────────── */
  bubbles: D(
    'bubbles',
    [
      { speaker: 'Chachapiti', tone: 'sun', text: 'Pip ! Te voilà. Moi, c’est Chachapiti — oui, comme le célèbre. On est, euh... des cousins éloignés. Ce kiosque, c’est le Chat. Tout le monde commence ici.' },
      { speaker: 'Chachapiti', tone: 'sun', text: 'Ici, tu demandes, et l’IA répond. Charmant. Mais en haut du chemin vivent les agents — des IA qui peuvent vraiment FAIRE des choses : créer des fichiers, construire des pages, réparer des trucs.', terms: ['agent'] },
      { speaker: 'Chachapiti', tone: 'sun', text: 'Et voici le secret qu’on ne dit jamais aux débutants : leur parler marche exactement comme me parler à moi. Tu parles déjà la langue.' },
      { speaker: 'Chachapiti', tone: 'sun', text: 'Prends cet éclat pour t’en souvenir. Maintenant va voir Termi au vieux bureau, en haut du chemin puis vers l’est !' },
    ],
    { grantsShard: 'language' },
  ),
  bubblesAfter: D('bubblesAfter', [
    { speaker: 'Chachapiti', tone: 'sun', text: 'La vallée est à toi ! Termi au nord-est, le Stand des Apps à l’ouest, le Bureau tout au nord. La grande porte quitte la vallée — mais elle a un... gardien.' },
  ]),

  /* ── Termi, le terminal ──────────────────────────────────────────────── */
  termi: D(
    'termi',
    [
      { speaker: 'Termi', tone: 'plum', text: '❯ oh ! de la visite. Je suis Termi — un terminal. Les gens me trouvent effrayant. Je suis littéralement une boîte de texte.', terms: ['terminal'] },
      { speaker: 'Termi', tone: 'plum', text: '❯ mon superpouvoir : je suis la porte la plus POLYVALENTE vers les agents. Je tourne sur n’importe quel ordinateur — PC ou Mac — sans app store.' },
      { speaker: 'Termi', tone: 'plum', text: '❯ tu as Claude Pro ? Claude Code tourne en moi. ChatGPT Plus ? Codex tourne en moi. Tu veux du gratuit ? OpenCode est gratuit et open source, et vit en moi aussi.', terms: ['openSource'] },
      { speaker: 'Termi', tone: 'plum', text: '❯ anecdote : je suis plus vieux que la souris d’ordinateur. Toujours là. Le curseur qui clignote en moi ? C’est ton cousin, au passage.' },
      { speaker: 'Termi', tone: 'plum', text: '❯ comment ça marche, simplement : tu tapes un message, l’agent répond, et avant de toucher à quoi que ce soit, il te demande d’abord. Le même chat, plus de muscles.' },
      { speaker: 'Termi', tone: 'plum', text: '❯ en toute honnêteté : installer un agent en moi prend UNE commande à copier-coller depuis son guide officiel. Cinq minutes, une fois. Ensuite, tu tapes son nom et on discute.', terms: ['command'] },
      { speaker: 'Termi', tone: 'plum', text: '❯ prends cet éclat. Et si tu préfères les jolis boutons — je ne me vexe pas. Va voir le Stand des Apps, côté ouest de la vallée.' },
    ],
    {
      grantsShard: 'terminal',
      links: [
        { label: 'Ce qu’est vraiment le terminal — cours accéléré MDN', url: 'https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Environment_setup/Command_line' },
        { label: 'La doc Claude Code (en anglais) — un agent en moi', url: 'https://code.claude.com/docs/en/overview' },
      ],
    },
  ),
  termiAfter: D('termiAfter', [
    { speaker: 'Termi', tone: 'plum', text: '❯ déjà de retour ? cligne une fois si je t’ai manqué. ...c’était un clignement. J’en suis sûr.' },
  ]),

  /* ── le Stand des Apps ───────────────────────────────────────────────── */
  vendor: D(
    'vendor',
    [
      { speaker: 'Pip du Stand', tone: 'sun', text: 'Approche, approche ! Je vends des PORTES — les faciles. Aujourd’hui en rayon : Claude Code, qui vit directement dans l’appli Claude, inclus dans Claude Pro.' },
      { speaker: 'Pip du Stand', tone: 'sun', text: 'Aussi en stock : Codex — l’agent d’OpenAI, sa propre appli, inclus dans ChatGPT Plus. Et note bien : de nouvelles portes arrivent chaque saison. Ce stand n’est jamais deux fois le même.' },
      { speaker: 'Pip du Stand', tone: 'sun', text: 'Les éditeurs chics comme Cursor et VS Code savent aussi faire tourner des agents — une belle route, pour plus tard. Et le sentier gratuit vers OpenCode commence juste au sud d’ici.' },
      { speaker: 'Pip du Stand', tone: 'sun', text: 'Le vrai secret du stand, offert par la maison : les outils changent. La compétence — dire ce que tu veux, décider quand on te demande — te suit partout. Prends un éclat !' },
    ],
    {
      grantsShard: 'apps',
      links: [
        { label: 'Claude Code', url: 'https://claude.com/product/claude-code' },
        { label: 'OpenAI Codex', url: 'https://developers.openai.com/codex' },
        { label: 'Quelle porte te va ? — le petit test', url: '../#pick-your-door' },
      ],
    },
  ),
  opencodeMarker: D(
    'opencodeMarker',
    [
      { speaker: 'Balise du sentier', tone: 'leaf', text: 'LE SENTIER GRATUIT — OpenCode : gratuit, open source, terminal uniquement. Apporte un abonnement Claude ou ChatGPT que tu as déjà, ou tes propres clés API.', terms: ['openSource', 'apiKey'] },
    ],
    { links: [{ label: 'OpenCode', url: 'https://opencode.ai' }] },
  ),

  /* ── la vallée ───────────────────────────────────────────────────────── */
  roamer: D(
    'roamer',
    [
      { speaker: 'Pip vagabond', tone: 'leaf', text: 'Salut ! Je marche sur cette route tous les jours et rien n’a jamais cassé. Tu veux savoir pourquoi ? Deux règles.' },
      { speaker: 'Pip vagabond', tone: 'leaf', text: 'Règle un : les agents demandent avant de toucher à quoi que ce soit. Tu dis oui ou non. « Non » marche toujours.' },
      { speaker: 'Pip vagabond', tone: 'leaf', text: 'Règle deux : entraîne-toi dans un dossier vide tout neuf. Vide, ça veut dire rien à perdre. Au pire ? Tu supprimes le dossier — comme si rien ne s’était passé.', terms: ['folder'] },
      { speaker: 'Pip vagabond', tone: 'leaf', text: 'Demander d’abord, ne rien casser. Garde-le en éclat — c’est celui que le gardien de la porte respecte le plus.' },
    ],
    {
      grantsShard: 'safety',
      links: [
        { label: 'Ton Premier Jour — la visite honnête', url: '../first-day/' },
        { label: 'Le décodeur — pour les moments bizarres', url: '../help/' },
      ],
    },
  ),
  mailbox: D('mailbox', [
    { speaker: 'Boîte aux lettres', tone: 'tangerine', text: 'Un prospectus à l’intérieur : « PREMIERS PROMPTS, GRATUITS — la Réserve à Prompts. Colle, réponds aux questions, possède un site web avant le goûter. » Ça sonne inventé. Ça ne l’est pas.', terms: ['prompt'] },
  ]),
  bench: D('bench', [
    { speaker: 'Plaque du banc', tone: 'ink', text: '« À la mémoire de chaque débutant qui croyait qu’il allait casser l’ordinateur. Il ne l’a pas cassé. » — la Vallée' },
  ]),
  officeDoorLocked: D('officeDoorLocked', [
    { speaker: '???', tone: 'plum', text: 'La porte du bureau est calée par un post-it : « Les déménageurs installent encore les bureaux — grande ouverture d’un jour à l’autre ! »' },
  ]),
  exitNeedShards: D('exitNeedShards', [
    { speaker: '???', tone: 'plum', text: 'Une voix suinte de derrière la porte : « Je ne vole que les collections COMPLÈTES, petit curseur. Reviens avec les cinq éclats. »' },
  ]),

  /* ── le Bureau des Agents ────────────────────────────────────────────── */
  chief: D(
    'chief',
    [
      { speaker: 'Le Chef', tone: 'tangerine', text: 'Bienvenue au bureau ! Ici, un agent principal — moi — découpe un gros travail en morceaux et confie chaque morceau à un agent ouvrier.' },
      { speaker: 'Le Chef', tone: 'tangerine', text: 'La recherche va au chercheur, les mots à la plume, les bugs au réparateur. Ils se passent le travail. Moi, je tiens le plan. L’humain garde le dernier mot.' },
      { speaker: 'Le Chef', tone: 'tangerine', text: 'C’est du niveau avancé — le grand bain. Des installations comme Hermes le rendent possible : gratuit, open source, auto-hébergé. Tu le fais tourner sur ta propre machine, quand tu seras prêt·e pour plus.', terms: ['openSource', 'selfHosted'] },
      { speaker: 'Le Chef', tone: 'tangerine', text: 'Mon conseil honnête : maîtrise UN agent d’abord. Le jour où un agent te semble facile, une équipe entière te semblera évidente. Prends cet éclat — et les ressources près de la porte.' },
    ],
    {
      grantsShard: 'orchestra',
      links: [
        { label: 'Hermes Agent — pour quand tu seras prêt·e', url: 'https://hermes-agent.nousresearch.com' },
        { label: 'Le décodeur — quand quelque chose semble bizarre', url: '../help/' },
      ],
    },
  ),
  workerResearch: D('workerResearch', [
    { speaker: 'Pip chercheur', tone: 'sky', text: 'Chut — je compare quatorze sources. Le Chef me donne les questions ; je rapporte les faits. Je ne devine jamais à voix haute. Enfin. Rarement.' },
  ]),
  workerWriter: D('workerWriter', [
    { speaker: 'Pip plume', tone: 'blush', text: 'Je transforme les faits du chercheur en mots que les humains aiment lire. L’astuce ? Des phrases courtes. Chaleureuses. Comme celles-ci.' },
  ]),
  workerFixer: D('workerFixer', [
    { speaker: 'Pip répare-tout', tone: 'grape', text: 'Le texte d’erreur rouge, c’est mon petit-déjeuner. Colle-moi une erreur et je ronronne. Anecdote : réparer, c’est la moitié du métier de tout agent — personne n’écrit parfait du premier coup.', terms: ['error'] },
  ]),
  runner: D('runner', [
    { speaker: 'Pip coursier', tone: 'sun', text: 'Je passe, je passe ! Des relais, des relais ! Les notes du chercheur vont à la plume, le brouillon de la plume part en relecture — du travail d’équipe, mais avec des numéros de version !' },
  ]),
  sleeper: D('sleeper', [
    { speaker: 'Pip qui dort', tone: 'sky', text: 'zzz... limite de débit... zzz... les agents ne fatiguent pas, mais chaque plan a son rythme de respiration... zzz... la sieste, c’est l’heure de la limite de débit...', terms: ['rateLimit'] },
  ]),
  sleeper2: D('sleeper2', [
    { speaker: 'Pip qui dort', tone: 'blush', text: 'zzz... cinq cents fichiers relus... zzz... réveillez-moi quand les humains décident... zzz...' },
  ]),
  cafeteria: D('cafeteria', [
    { speaker: 'Pip de la cafèt', tone: 'leaf', text: 'On ne boit pas de café. On ne peut pas boire de café. On respecte juste profondément l’ambiance d’une salle de pause.' },
  ]),
  cafeteria2: D('cafeteria2', [
    { speaker: 'Pip de la cafèt', tone: 'grape', text: 'La moitié de l’équipe travaille ensemble, certains travaillent seuls, deux dorment — et pourtant tout finit livré. Le Chef appelle ça « l’orchestration ». Moi, j’appelle ça mardi.', terms: ['orchestration'] },
  ]),
}

/* ── les questions du Chapardeur de Données ───────────────────────────── */

export const BOSS_QUESTIONS_FR: BossQuestion[] = [
  {
    q: 'Un agent demande : « Puis-je créer le dossier mon-premier-site ? » Tu fais quoi ?',
    options: [
      'Panique — il me pirate',
      'Je lis ce qu’il veut, puis je décide — « non » marche toujours',
      'Je clique toujours Autoriser sans lire, par politesse',
    ],
    correct: 1,
    why: 'Le moment demander-d’abord EST le système de sécurité. Tu le lis, tu décides. Refuser ne fait strictement rien — tu restes aux commandes.',
  },
  {
    q: 'Lequel de ces trucs a sa place dans un chat avec une IA ?',
    options: ['Ton mot de passe, pour le garder en lieu sûr', 'Ton numéro de carte bancaire, mais vite', 'Aucun des deux — les secrets restent hors de tout chat'],
    correct: 2,
    why: 'Les mots de passe et les numéros privés ne vont dans aucun chat — celui-ci ou un autre. Entraîne-toi dans un dossier vide, où il n’y a rien de sensible du tout.',
  },
  {
    q: 'Un débutant devrait-il brancher sa boîte mail sur un agent ?',
    options: [
      'Oui — puissance maximale tout de suite',
      'Non — un mail peut cacher des instructions sournoises destinées à l’IA (l’injection de prompt)',
      'Seulement le mardi',
    ],
    correct: 1,
    why: 'Le mail d’un inconnu peut contenir des instructions cachées que l’agent risque de lire comme des ordres. Garde ta boîte mail en dehors pendant que tu apprends — tu monteras en puissance plus tard, prudemment.',
    terms: ['promptInjection'],
  },
  {
    q: 'Quel modèle choisir pour un travail important ?',
    options: [
      'Le plus puissant auquel j’ai accès — moins de faits inventés, meilleur raisonnement',
      'Le plus faible — moins de puissance, moins de danger',
      'Peu importe, ils sont tous pareils',
    ],
    correct: 0,
    why: 'Les modèles plus puissants inventent moins de choses et suivent les consignes plus soigneusement — ça les rend aussi plus sûrs. Mais aucun modèle n’est magique : tu vérifies quand même le résultat.',
    terms: ['model'],
  },
  {
    q: 'L’agent fait quelque chose qui ne te plaît pas. Qu’est-ce qui est vrai ?',
    options: [
      'Tu dois attendre poliment qu’il finisse',
      'L’arrêter en plein travail casse ton ordinateur',
      'Tu peux l’arrêter à tout moment — tes fichiers restent comme ils étaient',
    ],
    correct: 2,
    why: 'Chaque outil a un bouton stop, et s’arrêter est toujours sans risque. Les agents demandent, tu approuves, tu peux tout stopper — l’humain garde le dernier mot. Toujours.',
  },
]
