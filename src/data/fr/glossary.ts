import type { GlossaryEntry, GlossaryKey } from '../glossary'

/** French twin of data/glossary.ts — same keys, one friendly sentence each. */
export const glossaryFr: Record<GlossaryKey, GlossaryEntry> = {
  agent: {
    term: 'agent',
    def: 'Une IA qui ne fait pas que répondre — elle peut vraiment faire des choses sur ton ordinateur, comme créer des fichiers. Et elle te demande toujours d’abord.',
  },
  prompt: {
    term: 'prompt',
    def: 'Le message que tu écris à une IA. Si tu as déjà discuté avec ChatGPT ou Claude, tu écris des prompts depuis le début.',
  },
  terminal: {
    term: 'terminal',
    def: 'Une simple fenêtre de texte où tu parles directement à ton ordinateur. Pas de boutons, juste des mots — c’est tout le secret.',
  },
  folder: {
    term: 'dossier',
    def: 'Une boîte sur ton ordinateur qui range des fichiers — comme Documents ou Photos. Tu en utilises depuis toujours.',
  },
  file: {
    term: 'fichier',
    def: 'Une chose enregistrée sur ton ordinateur — une page, une photo, une note. Un site web entier, c’est juste quelques fichiers dans un dossier.',
  },
  openSource: {
    term: 'open source',
    def: 'Un logiciel dont la recette est publique — chacun peut l’utiliser, la vérifier et l’améliorer gratuitement.',
  },
  apiKey: {
    term: 'clé API',
    def: 'Un mot de passe personnel qui permet à un outil d’utiliser un service d’IA. Tu ne paies que ce que tu consommes vraiment.',
  },
  selfHosted: {
    term: 'auto-hébergé',
    def: 'Tu le fais tourner sur ton propre ordinateur au lieu de laisser une entreprise s’en occuper. Contrôle total, un peu plus d’installation.',
  },
  command: {
    term: 'commande',
    def: 'Une instruction tapée pour ton ordinateur — comme “ouvre ce dossier”, mais en texte. Les agents demandent avant d’en lancer une.',
  },
  error: {
    term: 'erreur',
    def: 'L’ordinateur qui dit “je n’ai pas réussi”. C’est un message, pas un dégât — recolle-le à l’agent et il connaît souvent la solution.',
  },
  npm: {
    term: 'npm',
    def: 'Une immense bibliothèque gratuite de briques de code que les programmeurs partagent. Certains projets y piochent — tes premiers n’en ont pas besoin.',
  },
  localStorage: {
    term: 'localStorage',
    def: 'Le petit carnet de ton navigateur — il garde de petites choses, comme une liste, sur ton appareil uniquement.',
  },
  session: {
    term: 'session',
    def: 'Un moment passé avec ton agent — une conversation. La discussion se termine ; ton dossier et tes fichiers restent.',
  },
  browser: {
    term: 'navigateur',
    def: 'L’appli avec laquelle tu lis les sites web — Chrome, Safari, Firefox. Ce que tu construis s’ouvre directement dedans.',
  },
}
