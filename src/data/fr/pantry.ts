import { starterPromptsFr } from './prompts'
import type { CategoryId, PantryCategory, PantryPrompt, PromptForm } from '../pantry'

/**
 * French twin of data/pantry.ts. Same ids (deep links survive the language
 * toggle), same forms, same safety grammar: questions d’abord, dossier vide
 * tout neuf, HTML/CSS/JS simples sans installation, parfait sur téléphone,
 * explications à la fin. Tout ce qui sauvegarde passe par localStorage et
 * le dit honnêtement.
 */

export const categoriesFr: PantryCategory[] = [
  { id: 'love', label: 'pour quelqu’un que tu aimes', emoji: '💛', tint: 'bg-blush/30' },
  { id: 'family', label: 'maison & famille', emoji: '🏡', tint: 'bg-sun/30' },
  { id: 'school', label: 'école & révisions', emoji: '📚', tint: 'bg-sky/20' },
  { id: 'hobby', label: 'tes passions', emoji: '🎨', tint: 'bg-grape/15' },
  { id: 'helpers', label: 'petits coups de main', emoji: '🧮', tint: 'bg-leaf/20' },
  { id: 'words', label: 'tes mots', emoji: '✍️', tint: 'bg-paper-deep' },
  { id: 'thing', label: 'le truc que tu fais', emoji: '🎪', tint: 'bg-tangerine/15' },
]

type RawPrompt = Omit<PantryPrompt, 'form' | 'tags'>

const fresh: RawPrompt[] = [
  // ─── pour quelqu’un que tu aimes ─────────────────────────────────────────
  {
    id: 'birthday-page',
    category: 'love',
    emoji: '🎂',
    title: 'La page d’anniversaire',
    forWho: 'pour la star du jour',
    time: '~15 min',
    what: 'La première construction classique — une grande page joyeuse pour le jour de quelqu’un, bouton à confettis inclus.',
    prompt: `Salut ! Je débute complètement — sois mon guide bienveillant autant que mon bâtisseur. L’anniversaire de quelqu’un approche et je veux lui faire une page. Avant d’écrire le moindre code, demande-moi, une question à la fois : son prénom, comment on se connaît, trois choses que j’aime sincèrement chez cette personne, si une blague privée est la bienvenue, et sa couleur préférée.

Ensuite, crée un nouveau dossier vide nommé "page-anniversaire" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, aucun framework. Construis une seule page joyeuse : un immense titre d’anniversaire avec son prénom, les trois choses que j’aime en petites cartes chaleureuses, et un gros bouton qui lance des confettis quand on appuie. Joyeux mais pas chaotique, et parfait sur téléphone — c’est là qu’elle l’ouvrira.

Quand tu as fini, explique-moi ce que fait chaque fichier avec des mots simples, dis-moi comment l’ouvrir dans mon navigateur, et donne-moi trois idées pour le rendre encore plus à son image.`,
  },
  {
    id: 'thank-you',
    category: 'love',
    emoji: '💐',
    title: 'Une page de merci',
    forWho: 'pour une belle âme',
    time: '~15 min',
    what: 'Un merci d’une page, qui vient du cœur — comme une carte, mais qui vit pour toujours et se fait défiler.',
    prompt: `Salut ! Je débute complètement — sois mon guide bienveillant autant que mon bâtisseur. Je veux faire une page de remerciement pour quelqu’un qui le mérite. Avant d’écrire le moindre code, demande-moi, une question à la fois : pour qui c’est, ce que cette personne a fait, trois petits moments ou détails dont je me souviens, sa couleur préférée, et le ton (chaleureux, drôle, ou autorisé-à-faire-pleurer).

Ensuite, crée un nouveau dossier vide nommé "page-merci" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, aucun framework. Construis une seule page : un grand merci en titre avec son prénom, un court paragraphe avec mes mots, les trois moments en petites cartes douces, et une signature de moi. Que ça ressemble à un câlin, pas à une carte d’entreprise — et que ce soit superbe sur téléphone.

Quand tu as fini, explique-moi ce que fait chaque fichier avec des mots simples, dis-moi comment l’ouvrir dans mon navigateur, et propose trois petites touches qu’on pourrait ajouter ensuite.`,
  },
  {
    id: 'our-story',
    category: 'love',
    emoji: '💞',
    title: '« Notre histoire jusqu’ici »',
    forWho: 'pour ta personne',
    time: '~20 min',
    what: 'Une frise de vous deux à faire défiler — de la première rencontre à maintenant, qui finit sur « à suivre… ».',
    prompt: `Salut ! Je suis tout nouveau dans la construction de choses — sois patient et explique au fur et à mesure. Je veux faire une page-frise sur moi et quelqu’un d’important pour moi. Demande-moi d’abord, une question à la fois : qui nous sommes, cinq à huit moments qui valent la peine d’être retenus (avec des dates approximatives — « été 2019 » suffit), une blague privée que j’accepte d’inclure, et une couleur qui nous ressemble.

Ensuite, crée un nouveau dossier vide nommé "notre-histoire" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis une frise verticale que je fais défiler : chaque moment est une petite carte avec sa date, en alternance douce des deux côtés sur grand écran, empilée simplement sur téléphone. Termine la frise par une dernière carte qui dit juste « à suivre… ». Garde mes mots exactement comme je te les donne — ils comptent.

Quand c’est terminé, montre-moi comment l’ouvrir, puis comment je te demanderais d’ajouter le moment numéro neuf, un jour.`,
  },
  {
    id: 'baby-hello',
    category: 'love',
    emoji: '👶',
    title: 'Une page de bienvenue bébé',
    forWho: 'pour le tout nouvel humain',
    time: '~15 min',
    what: 'Une page douce pour une toute nouvelle arrivée — le prénom, l’histoire, et une liste de « premières fois » à remplir.',
    prompt: `Bonjour ! Je suis novice, alors guide-moi avec douceur. Un bébé vient d’arriver dans notre monde et je veux faire une petite page de bienvenue. Demande-moi d’abord, une question à la fois : le prénom du bébé, la date d’arrivée, ce que je veux raconter de mignon au monde (le poids et l’heure sont optionnels — seulement si je les propose), qui nous voulons remercier, et si l’ambiance est pastel tout doux ou confettis éclatants.

Ensuite, crée un nouveau dossier vide nommé "coucou-bebe" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis une page toute douce : un grand « coucou, [prénom] » en titre, une petite carte de détails, une ligne de remerciement, et une liste vide des « premières fois » (premier sourire, premier rire, premiers pas) avec de la place pour noter les dates plus tard. Téléphone d’abord — c’est là que la famille la verra.

Après, explique les fichiers simplement et montre-moi comment j’ajouterais « premier rire » quand ça arrivera.`,
  },
  {
    id: 'get-well',
    category: 'love',
    emoji: '🍵',
    title: 'Une page bon rétablissement',
    forWho: 'pour un ami qui se remet',
    time: '~15 min',
    what: 'Une page remonte-moral avec une liste « quand tu iras mieux » et un bouton qui sert un sourire tout frais.',
    prompt: `Salut ! Je débute complètement — explique les choses au fur et à mesure. Quelqu’un qui compte pour moi est patraque et je veux lui construire une petite page remonte-moral. Demande-moi d’abord, une question à la fois : son prénom, notre lien, trois choses qu’on fera ensemble quand ça ira mieux, si les blagues sont bienvenues ou s’il faut rester doux, et une couleur qu’il ou elle adore.

Ensuite, crée un nouveau dossier vide nommé "bon-retablissement" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, et tout marche hors ligne. Construis une seule page : un titre chaleureux, la liste « quand tu iras mieux, on… » en trois cartes, et un gros bouton « encore un sourire » qui montre à chaque pression un nouveau petit compliment ou une mini-blague (écris-en 8 avec moi d’abord). Du grand texte, doux pour des yeux fatigués, superbe sur téléphone.

Quand tu as fini, explique les fichiers avec des mots simples et comment je peux changer les blagues moi-même, juste en te le demandant.`,
  },

  // ─── maison & famille ────────────────────────────────────────────────────
  {
    id: 'shopping-list',
    category: 'family',
    emoji: '🛒',
    title: 'La liste de courses du foyer',
    forWho: 'pour l’équipe du frigo',
    time: '~20 min',
    what: 'Une liste partagée, agréable au pouce, qui se souvient d’elle-même — ajoute, coche, et ne perds plus jamais le papier.',
    prompt: `Construisons ma première appli utile : la liste de courses de la maison. Je débute complètement, alors sois patient et explique au fur et à mesure. Demande-moi d’abord : comment on appelle notre foyer, et dix choses qu’on rachète encore et encore (pour que la liste démarre utile, pas vide).

Ensuite, crée un nouveau dossier vide nommé "liste-famille" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, et tout doit marcher complètement hors ligne. L’appli : je tape un article et je l’ajoute, je tape dessus pour le cocher (il file dans une section « c’est pris »), un geste pour le retirer, et un bouton « vider les c’est-pris ». Sauvegarde tout avec localStorage pour que la liste survive à la fermeture du navigateur, et mets une petite note honnête dans le pied de page : « cette liste vit uniquement sur cet appareil ». Des gros boutons, lisible dans un supermarché bondé, parfait sur téléphone.

Quand tu as fini, explique avec des mots simples comment marche la sauvegarde, et donne-moi trois idées pour la version deux.`,
  },
  {
    id: 'recipe-book',
    category: 'family',
    emoji: '🍲',
    title: 'Le livre de recettes de famille',
    forWho: 'pour la table familiale',
    time: '~25 min',
    what: 'Un petit site qui garde les recettes à ne jamais perdre — avec des étapes à cocher en cuisinant.',
    prompt: `Je veux protéger nos recettes de famille en les transformant en petit site web. Je débute complètement — guide-moi avec douceur. D’abord, demande-moi deux recettes pour commencer : pour chacune, son nom, de qui elle vient, les ingrédients avec les quantités, et les étapes. Pose une question à la fois, que je puisse retrouver les détails.

Ensuite, crée un nouveau dossier vide nommé "livre-recettes-famille" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis une page de couverture qui liste les recettes comme la table des matières d’un livre, et une page chaleureuse et lisible par recette : de qui elle vient tout en haut, les ingrédients en liste propre, les étapes avec des cases à cocher pendant que je cuisine. Facile à lire avec les mains pleines de farine ; adorable sur un téléphone calé contre le pot de farine.

Quand c’est terminé, explique les fichiers simplement — et surtout, montre-moi comment on ajoutera la recette numéro trois dimanche prochain.`,
  },
  {
    id: 'potluck',
    category: 'family',
    emoji: '🥗',
    title: 'Le planificateur d’auberge espagnole',
    forWho: 'pour le grand rassemblement',
    time: '~20 min',
    what: '« Qui apporte quoi » sans le chaos du groupe — des créneaux pour les plats, des prénoms à côté.',
    prompt: `Aide-moi à organiser un repas de groupe sans quarante messages dans la conversation. Je débute dans la construction de choses, alors explique au fur et à mesure. Demande-moi d’abord : l’occasion et la date, combien de personnes environ, et les créneaux qu’il nous faut (entrées, plats, desserts, boissons, extras comme les assiettes).

Ensuite, crée un nouveau dossier vide nommé "auberge-espagnole" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, entièrement hors ligne. Construis une page joyeuse : l’occasion en grand titre, puis chaque créneau en carte où je peux taper un plat et le prénom de qui l’apporte, plus un badge « il en manque ! » sur les créneaux vides. Sauvegarde tout avec localStorage et ajoute la note honnête : « ce plan vit uniquement sur cet appareil — je ferai passer mon téléphone ». De grosses zones tactiles ; ça servira en pleine conversation, à plein volume.

Quand tu as fini, explique comment marche la sauvegarde et propose trois petits extras pour la prochaine fois.`,
  },

  // ─── école & révisions ───────────────────────────────────────────────────
  {
    id: 'flashcards',
    category: 'school',
    emoji: '🃏',
    title: 'Des cartes qui t’interrogent',
    forWho: 'pour la saison des examens',
    time: '~25 min',
    what: 'Ton propre entraîneur à cartes : mélange, retourne, note-toi, garde une série.',
    prompt: `Construisons mon outil de révision personnel : des cartes qui m’interrogent. Je débute complètement — explique les choses simplement au fur et à mesure. Demande-moi d’abord : la matière, puis dix paires question-réponse (propose de m’aider à préciser celles qui sont floues), et si je veux un look sérieux ou quelque chose de plus joueur.

Ensuite, crée un nouveau dossier vide nommé "mes-cartes" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, ça marche hors ligne. L’appli : une carte à la fois, je tape pour passer de la question à la réponse, des boutons « acquis » et « pas encore », un bouton mélange, et un petit score en fin de série. Garde mes cartes dans leur propre fichier pour qu’elles soient faciles à changer, sauvegarde ma meilleure série avec localStorage, et ajoute la note que mes progrès ne quittent jamais mon appareil. Du texte grand et lisible — je serai fatigué·e en m’en servant.

Quand c’est terminé, explique les fichiers avec des mots simples et montre-moi comment ajouter la carte numéro onze, juste en te le demandant.`,
  },
  {
    id: 'explainer',
    category: 'school',
    emoji: '💡',
    title: 'Un site qui explique un sujet',
    forWho: 'pour partager ce que tu sais',
    time: '~20 min',
    what: 'Transforme un truc que tu comprends en explication sympa à faire défiler — avec un mini-quiz à la fin.',
    prompt: `Je veux transformer quelque chose que je comprends en petit site qui l’explique aux autres. Je débute complètement dans la construction — sois mon guide. Demande-moi d’abord, une question à la fois : le sujet, qui doit le comprendre à la fin (ma classe ? mon grand-père ?), les quatre à six grandes idées avec mes propres mots, et l’ambiance (joueuse, calme, spectaculaire).

Ensuite, crée un nouveau dossier vide nommé "explique-moi" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis une page sympa qui se déroule : un grand titre, une section claire par idée avec un petit intertitre et mes mots rangés (mais toujours les miens), et tout à la fin un mini-quiz de trois questions avec un retour juste/faux immédiat, juste pour le plaisir. Du texte large et lisible, superbe sur téléphone.

Quand tu as fini, explique les fichiers simplement, et dis-moi comment je remplacerais plus tard la formulation de la section deux par une meilleure.`,
  },
  {
    id: 'exam-countdown',
    category: 'school',
    emoji: '⏳',
    title: 'Compte à rebours d’examen + plan de bataille',
    forWho: 'pour le futur toi, plus calme',
    time: '~25 min',
    what: 'Un grand compte à rebours honnête et un plan jour par jour que tu peux vraiment cocher.',
    prompt: `Aide-moi à arrêter de scroller et à commencer à me préparer : je veux une page de compte à rebours d’examen avec un plan de révision. Je débute — explique tout simplement. Demande-moi d’abord, une question à la fois : le nom et la date de l’examen, les chapitres à couvrir, ceux qui me font le plus peur, et combien de jours par semaine je vais honnêtement réviser.

Ensuite, crée un nouveau dossier vide nommé "plan-examen" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, ça marche hors ligne. Construis : un grand compte à rebours en direct (jours et heures) tout en haut, puis une check-list jour par jour qui répartit mes chapitres sur le temps restant — les chapitres qui font peur plus tôt, et répétés. Chaque élément a sa case ; sauvegarde mes coches avec localStorage pour que la progression survive, avec la note que tout reste sur mon appareil. Cocher doit faire du bien. Des couleurs calmes — cette page doit faire baisser mon pouls, pas le monter.

Quand c’est terminé, explique comment le plan est réparti, et comment te demander de le remélanger si je prends du retard.`,
  },

  // ─── tes passions ────────────────────────────────────────────────────────
  {
    id: 'collection',
    category: 'hobby',
    emoji: '🗃️',
    title: 'Une vitrine de collection',
    forWho: 'pour les passionnés comme toi',
    time: '~20 min',
    what: 'Un fier petit musée pour ce que tu collectionnes — avec un compteur et une couronne sur ton préféré.',
    prompt: `Je collectionne quelque chose et ça mérite un musée. Je débute complètement dans les sites web — guide-moi pas à pas. Demande-moi d’abord, une question à la fois : ce que je collectionne, six à dix pièces pour commencer (le nom plus une ligne sur chacune — d’où elle vient, pourquoi elle compte), laquelle est mon joyau, et l’ambiance (galerie épurée ou cabinet de curiosités douillet).

Ensuite, crée un nouveau dossier vide nommé "ma-collection" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis : un grand titre avec le compte de pièces en direct, une grille de cartes (le nom + sa petite histoire d’une ligne, avec un emplacement discret où une photo pourra venir plus tard), et un petit badge couronne sur la préférée. Garde les pièces dans leur propre fichier pour que les ajouts restent faciles. Superbe sur téléphone, parce que c’est ce que je montrerai à table.

Après, explique les fichiers simplement et montre-moi comment la pièce numéro onze rejoindra le musée.`,
  },
  {
    id: 'club-page',
    category: 'hobby',
    emoji: '🏆',
    title: 'L’équipe & le planning du club',
    forWho: 'pour ta bande',
    time: '~20 min',
    what: 'Qui on est, quand on se retrouve, ce qui arrive — une page qui répond à tout le groupe.',
    prompt: `Notre club répond sans arrêt aux trois mêmes questions dans la conversation de groupe — construisons la page qui y répond pour toujours. Je débute, alors explique au fur et à mesure. Demande-moi d’abord : le nom du club et ce qu’on fait, les membres et leurs rôles (capitaine, ministre du goûter…), quand et où on se retrouve, et nos deux ou trois prochains événements.

Ensuite, crée un nouveau dossier vide nommé "notre-club" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis une seule page : le nom du club en grand et fier, un trombinoscope de cartes membres avec leurs rôles, une carte « on se retrouve » avec le jour, l’heure et le lieu, et la liste des événements à venir avec leurs dates. Facile à lire sur téléphone, et assez propre pour être imprimée pour le panneau d’affichage.

Quand c’est terminé, explique chaque fichier avec des mots simples, et montre-moi comment mettre à jour la liste des événements le mois prochain, juste en demandant.`,
  },
  {
    id: 'plant-tracker',
    category: 'hobby',
    emoji: '🪴',
    title: 'Le carnet de soin des plantes',
    forWho: 'pour les copines à feuilles',
    time: '~25 min',
    what: 'Une carte par plante, un bouton « arrosée aujourd’hui », et un gentil rappel quand l’une a soif.',
    prompt: `Mes plantes méritent mieux que ma mémoire — construisons-leur un carnet de soin. Je débute complètement, alors sois patient et explique au fur et à mesure. Demande-moi d’abord : les noms de mes plantes (les surnoms sont bienvenus), tous les combien chacune veut de l’eau, et où chacune vit dans la maison.

Ensuite, crée un nouveau dossier vide nommé "carnet-plantes" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, entièrement hors ligne. L’appli : une carte par plante avec son nom, son coin, et « arrosée il y a X jours », plus un gros bouton « arrosée aujourd’hui ! ». Quand une plante dépasse son rythme, sa carte prend gentiment soif (changement de couleur, emoji qui flétrit — sois joueur, pas culpabilisant). Sauvegarde tout dans localStorage avec une petite note disant que mes données de plantes ne quittent jamais mon appareil. Téléphone d’abord, compatible gants de jardin.

Quand tu as fini, explique comment marche le compte des jours, et comment j’ajouterai une nouvelle plante après mon prochain achat impulsif.`,
  },

  // ─── petits coups de main ────────────────────────────────────────────────
  {
    id: 'split-bill',
    category: 'helpers',
    emoji: '🧾',
    title: 'Le partageur d’addition',
    forWho: 'pour la fin du dîner',
    time: '~15 min',
    what: 'Le total, le nombre, le pourboire — de grands chiffres sympathiques et zéro calcul de serviette.',
    prompt: `Construis-moi la petite appli qui met fin aux maths de fin de dîner : un partageur d’addition. Je débute complètement, alors explique les choses simplement. Demande-moi d’abord : est-ce qu’on donne des pourboires dans mon pays (et les pourcentages habituels), et est-ce que mes amis partagent parfois inégalement (« je n’ai pris qu’une salade… ») ?

Ensuite, crée un nouveau dossier vide nommé "partage-addition" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, ça marche complètement hors ligne. L’appli : j’entre le total, je tape plus/moins pour le nombre de personnes, je choisis un pourboire (les boutons qu’on aura décidés, plus « sans pourboire »), et je vois la part de chacun en chiffres énormes et sympathiques. Si on a dit que l’inégal compte, ajoute une option simple « une personne paie X de plus » — reste simple. Des gros boutons qui marchent dans un restaurant sombre, sur téléphone.

Quand c’est terminé, explique les fichiers avec des mots simples et propose trois petites améliorations que je pourrais demander.`,
  },
  {
    id: 'packing-list',
    category: 'helpers',
    emoji: '🧳',
    title: 'La liste de valise qui se souvient',
    forWho: 'pour chaque départ',
    time: '~20 min',
    what: 'Coche, ajoute tes indispensables, remets à zéro pour la prochaine aventure — n’oublie plus jamais le chargeur.',
    prompt: `J’oublie toujours une chose en voyage — construis-moi une liste de valise qui se souvient. Je débute ; explique au fur et à mesure. Demande-moi d’abord : les genres de voyages que je fais (week-end, plage, famille…), et les trois choses que j’ai personnellement déjà oubliées.

Ensuite, crée un nouveau dossier vide nommé "liste-valise" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, entièrement hors ligne. L’appli : une check-list de départ raisonnable groupée par catégories (vêtements, salle de bain, tech, papiers), des cases à cocher satisfaisantes, une zone « ajoute ton propre article », et mes trois oublis personnels épinglés tout en haut avec un petit ⚠️. Un bouton « nouveau voyage » décoche tout mais garde mes articles à moi. Sauvegarde tout avec localStorage et note honnêtement que la liste vit uniquement sur mon appareil.

Quand tu as fini, explique comment marche la mémoire, et comment je te demanderais une version « camping » plus tard.`,
  },
  {
    id: 'budget-tracker',
    category: 'helpers',
    emoji: '💰',
    title: 'Le carnet de budget de poche',
    forWho: 'pour le futur toi',
    time: '~25 min',
    what: 'Où part l’argent ? Une petite appli privée qui le sait — catégories, totaux du mois, zéro jugement.',
    prompt: `Construisons quelque chose de vraiment utile : mon carnet de budget personnel. Je débute complètement — sois patient et explique au fur et à mesure. Demande-moi d’abord, une question à la fois : ma devise, mes quatre à six catégories de dépenses (nourriture, transport, plaisir…), si je veux une ligne de budget mensuel par catégorie, et si les chiffres doivent être célébrés ou rester calmes et neutres.

Ensuite, crée un nouveau dossier vide nommé "mon-budget" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, entièrement hors ligne. L’appli : j’ajoute une dépense en deux gestes (montant + catégorie), je vois le total du mois par catégorie et en tout, avec une barre simple par catégorie qui se remplit vers ma ligne de budget si j’en ai fixé une. Un sélecteur de mois pour regarder en arrière. Sauvegarde tout avec localStorage et écris-le clairement sur la page : « tes chiffres ne quittent jamais cet appareil ». De grands chiffres lisibles, agréable sur téléphone.

Quand tu as fini, explique la sauvegarde avec des mots simples, et propose trois améliorations dont j’aurai peut-être envie le mois prochain.`,
  },
  {
    id: 'landing-page',
    category: 'thing',
    emoji: '💼',
    title: 'Une page d’accueil pour ton activité',
    forWho: 'pour tes clients',
    time: '~25 min',
    what: 'La version un peu plus officielle : ce que tu fais, pourquoi toi, comment te joindre — claire et digne de confiance.',
    prompt: `J’ai une petite activité et il lui faut une vraie page d’accueil — claire et digne de confiance, pas tape-à-l’œil. Je débute complètement dans les sites web, alors sois mon guide autant que mon bâtisseur. Demande-moi d’abord, une question à la fois : le nom de l’activité et ce que je fais vraiment, qui est mon client typique, les trois choses que je veux le plus faire passer, comment on peut me joindre ou acheter (et « appelez-moi » ou « passez à la boutique », ça compte), mes horaires ou disponibilités si c’est pertinent, et le sentiment que ça doit donner (chaleureux, professionnel, joueur).

Ensuite, crée un nouveau dossier vide nommé "ma-page-pro" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, aucun framework. Construis une page unique et propre : un titre clair qui dit ce que je fais, les trois choses en sections bien rangées, un bloc « me joindre » impossible à rater, et un pied de page simple. Pas de faux avis, pas d’énergie photo-de-banque — honnête et lisible, superbe sur téléphone, parce que c’est là que les clients me trouveront.

Quand c’est terminé, explique chaque fichier simplement, montre-moi comment l’ouvrir, et liste trois améliorations qui vaudront le coup une fois la première version au point.`,
  },
  {
    id: 'recipe-scaler',
    category: 'helpers',
    emoji: '⚖️',
    title: 'Le multiplicateur de recettes',
    forWho: 'pour les maths de cuisine',
    time: '~15 min',
    what: 'Une recette pour 4 quand vous êtes 7 ? Colle, règle, c’est prêt — avec des arrondis sensés.',
    prompt: `Sauve-moi des maths de cuisine : je veux un multiplicateur de recettes. Je débute complètement dans la construction de choses, alors explique chaque étape simplement. Demande-moi d’abord : je cuisine plutôt en grammes et millilitres ou en tasses et cuillères, et quelle recette typique je voudrais adapter (pour tester avec du vrai) ?

Ensuite, crée un nouveau dossier vide nommé "multiplicateur-recettes" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, ça marche hors ligne. L’appli : je colle ou tape ma liste d’ingrédients avec les quantités (une par ligne), je règle « la recette est pour » et « il me faut pour », et elle montre la liste adaptée avec des arrondis sensés — « 2,5 œufs » doit devenir une note sympathique du genre « 2 gros œufs et un petit », et les toutes petites quantités ne doivent pas devenir absurdes. Un seul geste pour copier la liste adaptée. Spécial cuisine : grand texte, pas de réglages pénibles.

Quand c’est terminé, explique avec des mots simples comment marche l’adaptation, et ce qu’on ajouterait pour la version deux.`,
  },

  // ─── tes mots ────────────────────────────────────────────────────────────
  {
    id: 'little-book',
    category: 'words',
    emoji: '📖',
    title: 'Un petit livre de poèmes & citations',
    forWho: 'pour les phrases que tu aimes',
    time: '~20 min',
    what: 'Les phrases qui vivent dans ta tête, enfin logées quelque part de joli — une par page.',
    prompt: `Je garde mes poèmes et citations préférés en captures d’écran et bouts de papier — donnons-leur une vraie maison. Je débute complètement ; guide-moi avec douceur. Demande-moi d’abord, une question à la fois : six à dix phrases, poèmes ou citations préférés (avec leurs auteurs, « inconnu » accepté), laquelle compte le plus et pourquoi (une phrase), et si le livre doit sentir le vieux papier ou l’encre moderne et nette.

Ensuite, crée un nouveau dossier vide nommé "mon-petit-livre" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis-le comme un petit livre : une couverture avec un titre qu’on choisit ensemble, puis une entrée par « page » avec beaucoup d’espace autour des mots — laisse-les respirer. Celle qui compte le plus reçoit son « pourquoi » en petites lettres dessous. Suivant/précédent au clavier sur ordinateur, balayage ou tape sur téléphone.

Quand c’est terminé, montre-moi comment l’ouvrir, et comment je glisserais une nouvelle page dans le livre plus tard.`,
  },
  {
    id: 'future-letter',
    category: 'words',
    emoji: '✉️',
    title: 'Une lettre au futur toi',
    forWho: 'pour toi, plus tard',
    time: '~20 min',
    what: 'Écris-la, scelle-la, choisis la date d’ouverture — elle attend, décompte, et s’ouvre avec des confettis.',
    prompt: `Faisons quelque chose de discrètement magique : une lettre à mon futur moi. Je débute, alors explique au fur et à mesure. Demande-moi d’abord : vers quand le futur moi doit l’ouvrir (un anniversaire ? le nouvel an ? dans un an jour pour jour ?), et si la page scellée doit être mystérieuse ou douillette.

Ensuite, crée un nouveau dossier vide nommé "cher-futur-moi" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation, entièrement hors ligne. L’appli : une page d’écriture où je tape ma lettre et choisis la date d’ouverture, un bouton « sceller » qui range la lettre avec localStorage, et à partir de là une page enveloppe-scellée qui ne montre qu’un compte à rebours. Le jour venu (ou après), un bouton « ouvrir » apparaît — et l’ouverture mérite quelques confettis. Deux notes honnêtes sur la page : ma lettre ne quitte jamais cet appareil, et ceci est un ruban, pas un cadenas — quiconque utilise exactement ce navigateur pourrait jeter un œil.

Quand c’est terminé, explique simplement où « vit » la lettre, et ce qui pourrait l’effacer (pour que je ne la perde pas par accident).`,
  },

  // ─── le truc que tu fais ─────────────────────────────────────────────────
  {
    id: 'my-thing',
    category: 'thing',
    emoji: '📣',
    title: 'Une page pour le truc que tu fais',
    forWho: 'pour ton groupe, ton stand, ton service',
    time: '~20 min',
    what: 'Ton groupe, tes pots de miel, ta promenade de chiens — une page-affiche qui le dit fièrement.',
    prompt: `Je fais un truc — un groupe de musique, un stand au marché, de la pâtisserie, de la promenade de chiens, de la réparation de vélos — et ça mérite une page fière. Je débute complètement dans les sites web, alors sois mon guide. Demande-moi d’abord, une question à la fois : c’est quoi le truc et son nom, ce que je propose ou joue (trois à six éléments), quand et où on peut me trouver, comment je veux qu’on me contacte (et « venez me parler au marché », ça compte), et si l’ambiance est affiche qui crie ou artisanat qui chuchote.

Ensuite, crée un nouveau dossier vide nommé "ma-page-a-moi" et travaille uniquement dedans, en HTML, CSS et JavaScript simples — aucune installation. Construis une page unique, style affiche : le nom en immense tout en haut, une ligne qui dit ce que je fais avec mes mots, l’offre en cartes bien marquées, et une section « me trouver ». Pas de faux témoignages, pas de remplissage d’entreprise — juste le truc, dit fièrement. Téléphone d’abord.

Quand c’est terminé, explique les fichiers simplement et propose trois choses à ajouter quand les affaires marcheront fort.`,
  },
]

/** Où vivent les trois classiques de l’accueil dans les étagères. */
const CLASSIC_META: Record<string, { category: CategoryId; emoji: string }> = {
  'about-me': { category: 'words', emoji: '🙋' },
  presentation: { category: 'school', emoji: '🎞️' },
  'tiny-app': { category: 'helpers', emoji: '🎡' },
}

const classics: RawPrompt[] = starterPromptsFr.map((sp) => ({
  id: sp.id,
  category: CLASSIC_META[sp.id].category,
  emoji: CLASSIC_META[sp.id].emoji,
  title: sp.title,
  forWho: sp.forWho,
  time: sp.time,
  what: sp.what,
  prompt: sp.prompt,
  classic: true,
}))

/** Forme + mots-clés par prompt — la couche de pertinence de la Réserve. */
const FACETS: Record<string, { form: PromptForm; tags: string[] }> = {
  'about-me': { form: 'page', tags: ['moi', 'perso', 'portfolio', 'présentation', 'passion'] },
  presentation: { form: 'slides', tags: ['école', 'sujet', 'expliquer', 'diaporama', 'exposé'] },
  'tiny-app': { form: 'app', tags: ['décider', 'dîner', 'famille', 'jeu', 'roue', 'fête'] },
  'birthday-page': { form: 'page', tags: ['anniversaire', 'fête', 'célébrer', 'ami', 'cadeau'] },
  'thank-you': { form: 'page', tags: ['merci', 'remerciement', 'cadeau', 'gentillesse', 'prof', 'ami'] },
  'our-story': { form: 'page', tags: ['anniversaire de couple', 'amour', 'couple', 'frise', 'saint-valentin', 'cadeau'] },
  'baby-hello': { form: 'page', tags: ['bébé', 'naissance', 'annonce', 'famille', 'bienvenue'] },
  'get-well': { form: 'page', tags: ['malade', 'remonter le moral', 'hôpital', 'ami', 'soin'] },
  'shopping-list': { form: 'app', tags: ['courses', 'maison', 'famille', 'liste', 'supermarché'] },
  'recipe-book': { form: 'page', tags: ['cuisine', 'famille', 'plats', 'recettes', 'héritage'] },
  potluck: { form: 'app', tags: ['fête', 'rassemblement', 'événement', 'repas', 'fêtes', 'organisation'] },
  flashcards: { form: 'app', tags: ['école', 'examen', 'réviser', 'révisions', 'apprendre'] },
  explainer: { form: 'page', tags: ['école', 'enseigner', 'sujet', 'expliquer', 'apprendre'] },
  'exam-countdown': { form: 'app', tags: ['école', 'examen', 'réviser', 'plan', 'compte à rebours'] },
  collection: { form: 'page', tags: ['passion', 'vitrine', 'collection', 'exposer'] },
  'club-page': { form: 'page', tags: ['club', 'équipe', 'sport', 'groupe', 'planning'] },
  'plant-tracker': { form: 'app', tags: ['plantes', 'maison', 'soin', 'rappel', 'jardin'] },
  'split-bill': { form: 'app', tags: ['dîner', 'argent', 'amis', 'restaurant', 'pourboire'] },
  'budget-tracker': { form: 'app', tags: ['argent', 'budget', 'finances', 'dépenses', 'suivi', 'économies'] },
  'landing-page': { form: 'page', tags: ['activité', 'accueil', 'clients', 'boutique', 'service', 'professionnel'] },
  'packing-list': { form: 'app', tags: ['voyage', 'valise', 'vacances', 'départ', 'bagages'] },
  'recipe-scaler': { form: 'app', tags: ['cuisine', 'quantités', 'plats', 'portions'] },
  'little-book': { form: 'page', tags: ['poèmes', 'citations', 'mots', 'cadeau', 'livre'] },
  'future-letter': { form: 'app', tags: ['lettre', 'futur', 'nouvel an', 'anniversaire', 'capsule temporelle'] },
  'my-thing': { form: 'page', tags: ['groupe', 'activité', 'marché', 'boutique', 'affiche', 'événement'] },
}

export const pantryFr: PantryPrompt[] = [...classics, ...fresh].map((p) => {
  const facets = FACETS[p.id]
  if (!facets) throw new Error(`missing facets for prompt ${p.id}`)
  return { ...p, ...facets }
})
