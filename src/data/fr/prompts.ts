import type { StarterPrompt } from '../prompts'

/**
 * French twin of data/prompts.ts. Same safety grammar, native French:
 * questions d’abord, dossier vide nommé sans accents, fichiers simples,
 * aucune installation, parfait sur téléphone, explications à la fin.
 */
export const starterPromptsFr: StarterPrompt[] = [
  {
    id: 'about-me',
    title: 'Une page sur toi',
    forWho: 'pour toi',
    time: '~15 min',
    what: 'Un site chaleureux d’une page sur qui tu es et ce que tu aimes. Ton petit coin d’internet.',
    prompt: `Salut ! Je débute complètement — sois mon guide bienveillant autant que mon bâtisseur. Avant d’écrire la moindre ligne de code, pose-moi cinq questions rapides, une à la fois : mon prénom, trois choses que j’aime ou qui occupent mon temps, ma couleur préférée, l’ambiance que je veux (cosy, audacieuse, minimaliste...), et si je veux un moyen pour qu’on puisse me contacter.

Ensuite, crée un nouveau dossier vide nommé "mon-premier-site" et travaille uniquement dedans. Construis un site d’une seule page « à propos de moi » en HTML, CSS et JavaScript simples — aucune installation, aucun framework, tout dans ce seul dossier. Rends-le personnel, pas corporate : un grand titre accueillant, une courte intro avec mes vraies réponses, une section pour les trois choses que j’aime, et un petit pied de page. Assure-toi que ce soit superbe sur téléphone.

Quand tu as fini, explique-moi ce que fait chaque fichier avec des mots simples, dis-moi comment ouvrir le site dans mon navigateur, et propose trois petites modifications que je pourrais te demander ensuite.`,
  },
  {
    id: 'presentation',
    title: 'Une mini-présentation',
    forWho: 'à partager',
    time: '~15 min',
    what: 'Un site-diaporama sur quelque chose que tu aimes — à feuilleter comme des diapos, directement dans le navigateur.',
    prompt: `Je veux faire un petit site de présentation sur quelque chose que j’aime — demande-moi d’abord le sujet. Je suis novice, alors avance pas à pas et ne suppose jamais que je connais un mot technique. Demande-moi, une question à la fois : le sujet, pour qui c’est, les trois à cinq idées principales que je veux faire passer, et l’ambiance (joueuse, calme, spectaculaire).

Ensuite, crée un nouveau dossier vide nommé "ma-presentation" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis des diapos plein écran que je fais défiler avec les flèches du clavier sur ordinateur, et en tapotant ou balayant sur téléphone, avec un petit point de progression pour chaque diapo. Une grande idée par diapo, du texte large et lisible, des transitions rapides et fluides. Termine par une dernière diapo avec mon nom, en signature.

Quand c’est terminé, dis-moi comment l’ouvrir, puis montre-moi comment changer moi-même le texte d’une diapo.`,
  },
  {
    id: 'tiny-app',
    title: 'Une petite appli du quotidien',
    forWho: 'pour tes proches',
    time: '~20 min',
    what: 'Une roue de décision colorée pour les moments « on mange quoi ce soir ? ». Ta première vraie appli — elle retient même ta liste.',
    prompt: `Construisons ma première petite appli : une roue de décision pour les moments « on mange quoi ce soir ? » ou « qui commence ? ». Je débute totalement — sois patient et explique les choses au fur et à mesure. Demande-moi d’abord à quoi elle va surtout me servir et comment elle doit s’appeler.

Ensuite, crée un nouveau dossier vide nommé "ma-petite-appli" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, et tout doit marcher complètement hors ligne. L’appli : je peux taper une liste d’options, en ajouter ou en retirer, puis appuyer sur un gros bouton TOURNER pour lancer une roue colorée qui s’arrête sur l’une d’elles, avec une petite célébration. Sauvegarde ma liste dans le navigateur avec localStorage pour qu’elle soit encore là demain, et ajoute une petite note dans l’appli disant que ma liste ne quitte jamais mon appareil. Des gros boutons, une lecture facile, impeccable sur téléphone.

Quand tu as fini, explique-moi avec des mots simples comment marche la sauvegarde, et donne-moi trois idées de choses à ajouter ensuite.`,
  },
]
