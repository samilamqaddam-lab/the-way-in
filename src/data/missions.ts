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
  id: 'birthday' | 'quiz' | 'recipe'
  emoji: string
  label: string
  tagline: string
  folder: string
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
]
