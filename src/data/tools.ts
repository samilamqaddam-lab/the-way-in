export interface WayIn {
  /** 'app' | 'inside' | 'terminal' | 'self' */
  kind: 'app' | 'inside' | 'terminal' | 'self'
  label: string
  note: string
}

export interface Tool {
  id: 'claude-code' | 'codex' | 'opencode' | 'hermes'
  name: string
  by: string
  url: string
  docsUrl?: string
  docsLabel?: string
  lives: string
  cost: string
  costTone: 'included' | 'free'
  blurb: string
  goodIf: string
  forLater?: boolean
  /** every door into this tool, with honest setup notes */
  waysIn: WayIn[]
}

/** Links and cost facts are verbatim from the verified source list. */
export const tools: Tool[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    by: 'by Anthropic',
    url: 'https://claude.com/product/claude-code',
    docsUrl: 'https://code.claude.com/docs/en/overview',
    docsLabel: 'read the docs',
    lives: 'A friendly app — or the terminal. Your choice.',
    cost: 'Included in Claude Pro',
    costTone: 'included',
    blurb: "Anthropic's coding agent. You describe the thing; it builds the thing — and it asks before touching anything.",
    goodIf: 'Good if you already chat with Claude, or just want the gentlest start.',
    waysIn: [
      { kind: 'app', label: 'Inside the Claude app', note: 'Download the Claude app, sign in — Claude Code is right there. Gentlest start.' },
      { kind: 'terminal', label: 'In the terminal', note: 'One copy-paste install command from the official guide. Five minutes, once.' },
    ],
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    by: 'by OpenAI',
    url: 'https://developers.openai.com/codex',
    lives: 'Right inside ChatGPT — or the terminal.',
    cost: 'Included in ChatGPT Plus',
    costTone: 'included',
    blurb: "OpenAI's coding agent. If ChatGPT already feels like home, this lives in the same house.",
    goodIf: 'Good if ChatGPT Plus is already in your life.',
    waysIn: [
      { kind: 'inside', label: 'Inside ChatGPT', note: 'Already in the ChatGPT you know — nothing extra to install.' },
      { kind: 'app', label: 'As its own app', note: 'A separate Codex app you download and sign into with your ChatGPT account.' },
      { kind: 'terminal', label: 'In the terminal', note: 'One install command from the official guide, then it lives in your terminal too.' },
    ],
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    by: 'open source',
    url: 'https://opencode.ai',
    lives: "The terminal. (Friendlier than it sounds — promise.)",
    cost: 'Free & open-source',
    costTone: 'free',
    blurb: 'A free coding agent. The tool costs nothing — you bring the AI: a Claude or ChatGPT subscription you already have, or your own API keys.',
    goodIf: "Good if you'd rather not add a new subscription.",
    waysIn: [
      { kind: 'terminal', label: 'In the terminal', note: 'Terminal-only: one install command from its site, then sign in with the AI you brought.' },
    ],
  },
  {
    id: 'hermes',
    name: 'Hermes Agent',
    by: 'by Nous Research',
    url: 'https://hermes-agent.nousresearch.com',
    lives: 'Your own computer, fully yours.',
    cost: 'Free, open-source, self-hosted',
    costTone: 'free',
    blurb: 'A free, open-source agent you run yourself. Maximum freedom, a bit more setup.',
    goodIf: "For when you're ready for more. It'll still be here.",
    forLater: true,
    waysIn: [
      {
        kind: 'self',
        label: 'Self-hosted, on your machine',
        note: 'A different kind of animal: you run the whole agent yourself, following its guide. Real setup — and real freedom. For later.',
      },
    ],
  },
]

/** Agents also live inside editors and other terminals — a road for later. */
export const moreWaysIn = [
  {
    name: 'Cursor',
    url: 'https://cursor.com',
    note: 'A code editor with agents built in — popular with people who already write code.',
  },
  {
    name: 'VS Code',
    url: 'https://code.visualstudio.com',
    note: "Microsoft's free editor; Claude Code, Codex and others plug right into it.",
  },
  {
    name: 'Gemini CLI',
    url: 'https://github.com/google-gemini/gemini-cli',
    note: "Google's free terminal agent — the same idea, powered by Gemini.",
  },
]

export const chatLinks = [
  { name: 'Claude', url: 'https://claude.ai' },
  { name: 'ChatGPT', url: 'https://chatgpt.com' },
]

export const mdnCommandLine = {
  name: 'MDN: Command line crash course',
  url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line',
}
