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
