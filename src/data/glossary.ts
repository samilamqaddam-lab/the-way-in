export interface GlossaryEntry {
  term: string
  def: string
}

/**
 * Every piece of jargon on the site gets exactly one friendly sentence.
 * Rendered by <GlossaryTip k="..."> as a tap-to-open definition.
 */
export const glossary = {
  agent: {
    term: 'agent',
    def: "An AI that doesn't just answer — it can actually do things on your computer, like creating files. And it always asks you first.",
  },
  prompt: {
    term: 'prompt',
    def: "The message you write to an AI. If you've chatted with ChatGPT or Claude, you've been writing prompts all along.",
  },
  terminal: {
    term: 'terminal',
    def: "A plain text window where you talk to your computer directly. No buttons, just words — that's the whole secret.",
  },
  folder: {
    term: 'folder',
    def: "A box on your computer that holds files — like Documents or Photos. You've used them forever.",
  },
  file: {
    term: 'file',
    def: 'One saved thing on your computer — a page, a photo, a note. A whole website is just a few files in a folder.',
  },
  openSource: {
    term: 'open source',
    def: 'Software whose recipe is public — free for anyone to use, check, and improve.',
  },
  apiKey: {
    term: 'API key',
    def: 'A personal password that lets a tool use an AI service. You pay the AI company only for what you actually use.',
  },
  selfHosted: {
    term: 'self-hosted',
    def: 'You run it on your own computer instead of a company running it for you. Total control, a bit more setup.',
  },
  command: {
    term: 'command',
    def: "A typed instruction for your computer — like “open this folder”, but in text. Agents ask before running any.",
  },
  error: {
    term: 'error',
    def: "The computer saying “I couldn't do that.” It's a message, not damage — paste it back to the agent and it usually knows the fix.",
  },
  npm: {
    term: 'npm',
    def: "A giant free library of code building-blocks that programmers share. Some projects fetch pieces from it — your first ones don't need to.",
  },
  localStorage: {
    term: 'localStorage',
    def: "Your browser's little notebook — it saves small things, like a list, on your device only.",
  },
  session: {
    term: 'session',
    def: 'One sitting with your agent — one conversation. The chat may end; your folder and files stay.',
  },
  browser: {
    term: 'browser',
    def: 'The app you read websites with — Chrome, Safari, Firefox. The things you build open right in it.',
  },
} as const satisfies Record<string, GlossaryEntry>

export type GlossaryKey = keyof typeof glossary
