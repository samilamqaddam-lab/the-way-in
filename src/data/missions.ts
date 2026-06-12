/**
 * The Test Drive is pure theater: every line, file name and "result" below
 * is scripted data. Nothing is ever executed, written, or touched.
 */

export interface MissionFile {
  name: string
  note?: string
}

export type Beat =
  | { kind: 'youSend'; text: string }
  | { kind: 'agentSay'; text: string }
  | { kind: 'agentThink'; label: string }
  | {
      kind: 'askPermission'
      question: string
      detail: string
      denyReply: string
      allowNote: string
    }
  | { kind: 'filesAppear'; files: MissionFile[] }
  | { kind: 'previewStage' }
  | { kind: 'celebrate' }
  | { kind: 'done'; message: string }

export interface Mission {
  id: 'birthday' | 'quiz' | 'recipe' | 'flashcards' | 'band' | 'packing' | 'honey' | 'photos'
  emoji: string
  label: string
  tagline: string
  folder: string
  /** matching Prompt Pantry card, for the “make the real one” hand-off */
  pantryId?: string
  beats: Beat[]
}

const CLOSING =
  "That was a whole agent session. You typed one message and made one decision — the agent did all the typing-into-files. That's the job."

export const missions: Mission[] = [
  {
    id: 'birthday',
    emoji: '🎂',
    label: 'A birthday page',
    tagline: 'for someone you like',
    folder: 'birthday-page',
    pantryId: 'birthday-page',
    beats: [
      {
        kind: 'youSend',
        text: 'Make a small birthday page for my friend Maya — big and cheerful, with confetti if possible 🎉',
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: "Love this. Here's my little plan: one page, a big greeting, three nice things about Maya, and a confetti button. Before I make anything, I need your okay.",
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called birthday-page?',
        detail: 'It starts completely empty. Nothing else on this computer gets touched.',
        denyReply:
          "No problem — I didn't create anything. Nothing ever happens without your okay. Take your time; I'll ask again.",
        allowNote: 'Folder birthday-page created — empty and safe',
      },
      { kind: 'agentThink', label: 'writing the page' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the page itself' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'the colors & layout' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'confetti.js', note: 'the fun part' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Done — three small files, one happy page. Want the confetti to be hearts instead? Just say so. That is genuinely how this works.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'quiz',
    emoji: '❓',
    label: 'A tiny quiz',
    tagline: 'your friends can take',
    folder: 'friend-quiz',
    beats: [
      {
        kind: 'youSend',
        text: 'Make a tiny quiz called "How well do you know me?" — three questions I can change later, with a score at the end.',
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: "Fun. The plan: a title screen, three questions with two answers each, and a score at the end. I'll keep your questions in their own little file so they're easy to change. First, your okay:",
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called friend-quiz?',
        detail: 'Brand new and empty. The rest of this computer is not involved.',
        denyReply:
          "Totally fine — nothing was created. You're the boss here; I only move when you say so. Ready when you are.",
        allowNote: 'Folder friend-quiz created — empty and safe',
      },
      { kind: 'agentThink', label: 'writing the quiz' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the quiz page' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'questions.js', note: 'your 3 questions live here' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'the look' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Done. And to change a question later, you would just tell me the new one — you never have to open the files yourself.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'recipe',
    emoji: '🍋',
    label: 'A recipe card',
    tagline: 'for a family dish',
    folder: 'family-recipes',
    pantryId: 'recipe-book',
    beats: [
      {
        kind: 'youSend',
        text: "Make a recipe card page for my grandmother's lemon cake — with a checkbox for every step so I can cook along.",
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: 'Lovely. The plan: one warm page — title, ingredients, and steps you can tick off as you go. Easy to read with floury hands. Your okay first:',
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called family-recipes?',
        detail: 'It starts empty. Your photos, files and everything else stay untouched.',
        denyReply:
          "Of course — nothing happened. Saying no is always allowed, and it always works. I'll ask again whenever you're ready.",
        allowNote: 'Folder family-recipes created — empty and safe',
      },
      { kind: 'agentThink', label: 'writing the recipe card' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the recipe card' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'warm, readable looks' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'cook-mode.js', note: 'remembers your ticks' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: "Done — and it remembers which steps you've ticked, even if you close the page. Grandma's lemon cake is safe in its folder now.",
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'flashcards',
    emoji: '📚',
    label: 'A flashcards app',
    tagline: 'for exam week',
    folder: 'study-cards',
    pantryId: 'flashcards',
    beats: [
      {
        kind: 'youSend',
        text: "Make me flashcards for my biology exam — flip to see the answer, and keep score so I know if I'm improving.",
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: "Good plan. I'll build: one card at a time, tap to flip, “got it” and “not yet” buttons, and a score at the end. Your questions get their own little file so they're easy to change. First, your okay:",
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called study-cards?',
        detail: 'Fresh and empty — your real notes and files are not involved.',
        denyReply:
          "All good — nothing was created. You're allowed to think about it. The exam isn't today, and I only move when you say so.",
        allowNote: 'Folder study-cards created — empty and safe',
      },
      { kind: 'agentThink', label: 'writing the trainer' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the trainer' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'cards.js', note: 'your questions live here' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'calm study looks' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: "Done. Adding card eleven later is one sentence: “add a card about photosynthesis.” That's it.",
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'band',
    emoji: '🎸',
    label: 'A band page',
    tagline: 'for your garage legends',
    folder: 'band-page',
    pantryId: 'my-thing',
    beats: [
      {
        kind: 'youSend',
        text: 'Make a page for my band, The Kitchen Cats — loud, poster-style, with our next three gigs on it.',
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: 'The Kitchen Cats. Excellent name. Plan: your name huge like a poster, a one-line vibe, and the gig list — which gets its own file so updating it is painless. Your okay first:',
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called band-page?',
        detail: 'Brand new, completely empty. Your music files stay wherever they live.',
        denyReply:
          'No worries — nothing happened. Even rock and roll waits for a yes. Ask me again whenever.',
        allowNote: 'Folder band-page created — empty and safe',
      },
      { kind: 'agentThink', label: 'cranking the amp' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the poster' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'shows.js', note: 'your gig list' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'the loud looks' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Done — and when you book gig number four, just tell me the date and venue. The poster updates itself around it.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'packing',
    emoji: '✈️',
    label: 'A packing list',
    tagline: 'that actually remembers',
    folder: 'packing-list',
    pantryId: 'packing-list',
    beats: [
      {
        kind: 'youSend',
        text: "Make a packing checklist for my trips — and make it remember what I tick, because I always forget my charger.",
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: "The charger. It's always the charger. Plan: a grouped checklist, satisfying ticks, your charger pinned at the top with a little ⚠️, and it remembers everything between visits. Your okay first:",
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called packing-list?',
        detail: 'It starts empty. Your photos and documents are not part of this.',
        denyReply:
          "Of course — nothing was made. “Not now” works every single time. I'll be here when you're ready.",
        allowNote: 'Folder packing-list created — empty and safe',
      },
      { kind: 'agentThink', label: 'folding the socks' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the checklist' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'tidy travel looks' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'remember.js', note: 'remembers your ticks' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: 'Done — your ticks are saved on your device, and a “new trip” button resets everything except your personal must-not-forgets.',
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'honey',
    emoji: '🍯',
    label: 'A tiny shop window',
    tagline: 'for your honey jars',
    folder: 'honey-shop',
    pantryId: 'my-thing',
    beats: [
      {
        kind: 'youSend',
        text: "Make a little page for my honey — three kinds of jars, prices, and where to find me at the Saturday market.",
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: "Lovely little business. Plan: a warm shop-window page — your honey's name up top, the three jars as cards with prices, and a “find me” card for the market. Your okay first:",
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called honey-shop?',
        detail: 'Completely empty to start. Nothing else on this computer is touched.',
        denyReply:
          "No problem at all — nothing happened. The bees took years; this can take a minute. Ask again whenever.",
        allowNote: 'Folder honey-shop created — empty and safe',
      },
      { kind: 'agentThink', label: 'arranging the jars' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the shop window' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'jars.js', note: 'your jars & prices' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'warm golden looks' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: "Done — and when the spring batch is ready, tell me the new jar and price. The shop window rearranges itself.",
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
  {
    id: 'photos',
    emoji: '🖼️',
    label: 'A photo wall',
    tagline: "for grandma's favorites",
    folder: 'photo-wall',
    pantryId: 'collection',
    beats: [
      {
        kind: 'youSend',
        text: "Make a photo wall page for my grandma — big pictures, big captions, easy to look through on her tablet.",
      },
      { kind: 'agentThink', label: 'reading your message' },
      {
        kind: 'agentSay',
        text: "What a good grandchild. Plan: a gallery wall with room for her favorite photos, large readable captions, and nothing fiddly — big and gentle, made for a tablet on a kitchen table. Your okay first:",
      },
      {
        kind: 'askPermission',
        question: 'Create a new, empty folder called photo-wall?',
        detail: "It starts empty — her real photos get copied in later, only the ones you choose.",
        denyReply:
          "That's fine — nothing was created. Grandma would approve of your caution. I'll ask again when you're ready.",
        allowNote: 'Folder photo-wall created — empty and safe',
      },
      { kind: 'agentThink', label: 'hanging the frames' },
      { kind: 'filesAppear', files: [{ name: 'index.html', note: 'the wall' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'style.css', note: 'gallery looks' }] },
      { kind: 'previewStage' },
      { kind: 'filesAppear', files: [{ name: 'captions.js', note: 'the stories under each photo' }] },
      { kind: 'previewStage' },
      {
        kind: 'agentSay',
        text: "Done — drop her photos into the folder and they appear in their frames. Captions stay exactly as she tells them to you.",
      },
      { kind: 'celebrate' },
      { kind: 'done', message: CLOSING },
    ],
  },
]

/** The home page shows just the original three. */
export const classicMissions = missions.slice(0, 3)
