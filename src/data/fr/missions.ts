import type { Mission } from '../missions'

/**
 * French twin of data/missions.ts — pure theater, tu voice.
 * Same ids and pantryIds; folders and every line speak French.
 * Real-world file names (index.html, style.css…) stay as they are.
 */

const CLOSING =
  'C’était une session d’agent complète. Tu as tapé un message et pris une décision — l’agent a fait toute la frappe dans les fichiers. C’est ça, le métier.'

export const missionsFr: Mission[] = [
  {
    id: 'birthday',
    emoji: '🎂',
    label: 'Une page d’anniversaire',
    tagline: 'pour quelqu’un que tu aimes bien',
    folder: 'page-anniversaire',
    pantryId: 'birthday-page',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais une petite page d’anniversaire pour mon amie Maya — grande et joyeuse, avec des confettis si possible 🎉',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'J’adore. Voici mon petit plan : une page, un grand message, trois belles choses sur Maya, et un bouton à confettis. Avant de créer quoi que ce soit, il me faut ton accord.',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé page-anniversaire ?',
        detail: 'Il démarre complètement vide. Rien d’autre sur cet ordinateur n’est touché.',
        denyReply:
          'Pas de souci — je n’ai rien créé. Rien ne se passe jamais sans ton accord. Prends ton temps ; je redemanderai.',
        allowNote: 'Dossier page-anniversaire créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'j’écris la page' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'la page elle-même' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'les couleurs & la mise en page' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'confetti.js', note: 'la partie fun' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé — trois petits fichiers, une page joyeuse. Tu préfères des cœurs à la place des confettis ? Dis-le, c’est tout. C’est vraiment comme ça que ça marche.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'quiz',
    emoji: '❓',
    label: 'Un petit quiz',
    tagline: 'que tes amis peuvent faire',
    folder: 'quiz-copains',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais un petit quiz « Tu me connais vraiment ? » — trois questions que je peux changer plus tard, avec un score à la fin.',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'Chouette. Le plan : un écran titre, trois questions à deux réponses chacune, et un score à la fin. Je garde tes questions dans leur propre petit fichier pour qu’elles restent faciles à changer. D’abord, ton accord :',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé quiz-copains ?',
        detail: 'Tout neuf et vide. Le reste de cet ordinateur n’est pas concerné.',
        denyReply:
          'Aucun problème — rien n’a été créé. C’est toi qui commandes ici ; je ne bouge que quand tu le dis. Quand tu veux.',
        allowNote: 'Dossier quiz-copains créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'j’écris le quiz' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'la page du quiz' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'questions.js', note: 'tes 3 questions vivent ici' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'le look' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé. Et pour changer une question plus tard, tu n’auras qu’à me dire la nouvelle — tu n’auras jamais besoin d’ouvrir les fichiers toi-même.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'recipe',
    emoji: '🍋',
    label: 'Une fiche recette',
    tagline: 'pour un plat de famille',
    folder: 'recettes-famille',
    pantryId: 'recipe-book',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais une page fiche-recette pour le gâteau au citron de ma grand-mère — avec une case à cocher pour chaque étape, pour cuisiner en suivant.',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'Adorable. Le plan : une page chaleureuse — le titre, les ingrédients, et des étapes à cocher au fur et à mesure. Facile à lire avec les mains pleines de farine. Ton accord d’abord :',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé recettes-famille ?',
        detail: 'Il démarre vide. Tes photos, tes fichiers et tout le reste ne bougent pas.',
        denyReply:
          'Bien sûr — il ne s’est rien passé. Dire non est toujours permis, et ça marche toujours. Je redemanderai quand tu seras prêt·e.',
        allowNote: 'Dossier recettes-famille créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'j’écris la fiche recette' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'la fiche recette' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'un look chaud et lisible' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'cook-mode.js', note: 'retient tes cases cochées' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé — et il se souvient des étapes cochées, même si tu fermes la page. Le gâteau au citron de mamie est en sécurité dans son dossier.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'flashcards',
    emoji: '📚',
    label: 'Une appli de cartes',
    tagline: 'pour la semaine d’examen',
    folder: 'cartes-revision',
    pantryId: 'flashcards',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais-moi des cartes de révision pour mon examen de biologie — je retourne la carte pour voir la réponse, et garde un score pour savoir si je progresse.',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'Bon plan. Je construis : une carte à la fois, tape pour la retourner, des boutons « acquis » et « pas encore », et un score à la fin. Tes questions ont leur propre petit fichier, faciles à changer. D’abord, ton accord :',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé cartes-revision ?',
        detail: 'Tout frais, tout vide — tes vraies notes et tes fichiers ne sont pas concernés.',
        denyReply:
          'Tout va bien — rien n’a été créé. Tu as le droit d’y réfléchir. L’examen n’est pas aujourd’hui, et je ne bouge que sur ton ordre.',
        allowNote: 'Dossier cartes-revision créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'j’écris l’entraîneur' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'l’entraîneur' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'cards.js', note: 'tes questions vivent ici' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'un look calme pour réviser' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé. Ajouter la carte numéro onze plus tard, c’est une phrase : « ajoute une carte sur la photosynthèse. » C’est tout.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'band',
    emoji: '🎸',
    label: 'Une page de groupe',
    tagline: 'pour tes légendes du garage',
    folder: 'page-groupe',
    pantryId: 'my-thing',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais une page pour mon groupe, The Kitchen Cats — bruyante, style affiche, avec nos trois prochains concerts dessus.',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'The Kitchen Cats. Excellent nom. Le plan : votre nom en énorme comme une affiche, une ligne d’ambiance, et la liste des concerts — dans son propre fichier pour que la mise à jour soit indolore. Ton accord d’abord :',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé page-groupe ?',
        detail: 'Tout neuf, complètement vide. Vos fichiers de musique restent là où ils vivent.',
        denyReply: 'Pas de stress — il ne s’est rien passé. Même le rock attend un oui. Redemande-moi quand tu veux.',
        allowNote: 'Dossier page-groupe créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'je monte le son' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'l’affiche' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'shows.js', note: 'ta liste de concerts' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'le look bruyant' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé — et quand vous décrochez le concert numéro quatre, donne-moi juste la date et la salle. L’affiche se réorganise autour.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'packing',
    emoji: '✈️',
    label: 'Une liste de valise',
    tagline: 'qui se souvient vraiment',
    folder: 'liste-valise',
    pantryId: 'packing-list',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais une check-list de valise pour mes voyages — et fais-la se souvenir de ce que je coche, parce que j’oublie toujours mon chargeur.',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'Le chargeur. C’est toujours le chargeur. Le plan : une check-list par catégories, des cases satisfaisantes, ton chargeur épinglé en haut avec un petit ⚠️, et elle se souvient de tout entre les visites. Ton accord d’abord :',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé liste-valise ?',
        detail: 'Il démarre vide. Tes photos et tes documents ne font pas partie du voyage.',
        denyReply:
          'Bien sûr — rien n’a été créé. « Pas maintenant » marche à tous les coups. Je serai là quand tu seras prêt·e.',
        allowNote: 'Dossier liste-valise créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'je plie les chaussettes' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'la check-list' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'un look voyage bien rangé' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'remember.js', note: 'retient tes cases' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé — tes cases sont sauvegardées sur ton appareil, et un bouton « nouveau voyage » remet tout à zéro, sauf tes indispensables personnels.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'honey',
    emoji: '🍯',
    label: 'Une petite vitrine',
    tagline: 'pour tes pots de miel',
    folder: 'stand-miel',
    pantryId: 'my-thing',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais une petite page pour mon miel — trois sortes de pots, les prix, et où me trouver au marché du samedi.',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'Adorable petite affaire. Le plan : une page-vitrine chaleureuse — le nom de ton miel en haut, les trois pots en cartes avec les prix, et une carte « me trouver » pour le marché. Ton accord d’abord :',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé stand-miel ?',
        detail: 'Complètement vide au départ. Rien d’autre sur cet ordinateur n’est touché.',
        denyReply:
          'Aucun souci — il ne s’est rien passé. Les abeilles ont pris des années ; ceci peut bien attendre une minute. Redemande quand tu veux.',
        allowNote: 'Dossier stand-miel créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'je range les pots' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'la vitrine' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'jars.js', note: 'tes pots & tes prix' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'un look doré et chaud' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé — et quand la récolte de printemps arrive, dis-moi le nouveau pot et son prix. La vitrine se réarrange toute seule.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'photos',
    emoji: '🖼️',
    label: 'Un mur de photos',
    tagline: 'pour les préférées de mamie',
    folder: 'mur-photos',
    pantryId: 'collection',
    beats: [
      {
        kind: 'youSend',
        text: 'Fais une page mur-de-photos pour ma grand-mère — de grandes images, de grandes légendes, facile à parcourir sur sa tablette.',
      },
      { kind: 'agentThink', label: 'je lis ton message' },
      {
        kind: 'agentSay',
        text: 'Quel bon petit-enfant. Le plan : un mur-galerie avec de la place pour ses photos préférées, de grandes légendes lisibles, et rien de compliqué — grand et doux, fait pour une tablette posée sur une table de cuisine. Ton accord d’abord :',
      },
      {
        kind: 'askPermission',
        question: 'Créer un nouveau dossier vide nommé mur-photos ?',
        detail: 'Il démarre vide — ses vraies photos seront copiées dedans plus tard, seulement celles que tu choisis.',
        denyReply:
          'C’est très bien — rien n’a été créé. Mamie approuverait ta prudence. Je redemanderai quand tu seras prêt·e.',
        allowNote: 'Dossier mur-photos créé — vide et sans risque',
      },
      { kind: 'agentThink', label: 'j’accroche les cadres' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'le mur' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'un look galerie' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'captions.js', note: 'les histoires sous chaque photo' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Terminé — dépose ses photos dans le dossier et elles apparaissent dans leurs cadres. Les légendes restent exactement comme elle te les raconte.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
]

/** Le trio d’accueil — une affaire, un jeu, un trésor de famille. */
const HOME_IDS: Array<Mission['id']> = ['band', 'quiz', 'recipe']
export const classicMissionsFr = HOME_IDS.map((id) => {
  const m = missionsFr.find((x) => x.id === id)
  if (!m) throw new Error(`missing home mission ${id}`)
  return m
})
