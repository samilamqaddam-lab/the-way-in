/**
 * Every word spoken in the quest. Tool facts stay verbatim-faithful to the
 * site's verified list. Each dialog is a linear run of pages; an optional
 * shard is granted when the run finishes.
 */

export interface DialogPage {
  speaker: string
  text: string
  /** portrait color key for the nameplate chip */
  tone?: 'ink' | 'tangerine' | 'sun' | 'leaf' | 'sky' | 'grape' | 'blush' | 'plum'
}

export interface DialogRun {
  id: string
  pages: DialogPage[]
  grantsShard?: string
  links?: Array<{ label: string; url: string }>
}

export interface ShardDef {
  id: string
  emoji: string
  title: string
}

export const SHARDS: ShardDef[] = [
  { id: 'language', emoji: '💬', title: 'You already speak the language' },
  { id: 'terminal', emoji: '🖥️', title: 'The versatile door' },
  { id: 'apps', emoji: '📱', title: 'The easy doors' },
  { id: 'orchestra', emoji: '🎼', title: 'Many hands, one boss — you' },
  { id: 'safety', emoji: '🛡️', title: 'Ask first, break nothing' },
]

const D = (id: string, pages: DialogPage[], extra?: Partial<DialogRun>): DialogRun => ({ id, pages, ...extra })

export const DIALOGS: Record<string, DialogRun> = {
  /* ── the Chat Gazebo ─────────────────────────────────────────────────── */
  bubbles: D(
    'bubbles',
    [
      { speaker: 'Chachapiti', tone: 'sun', text: "Pip! You made it. I'm Chachapiti — yes, like the famous one. We're, eh... distant cousins. This gazebo is the Chat. Everyone starts here." },
      { speaker: 'Chachapiti', tone: 'sun', text: 'Here you ask, and AI answers. Lovely. But up the path live the agents — AI that can actually DO things: make files, build pages, fix stuff.' },
      { speaker: 'Chachapiti', tone: 'sun', text: "Here's the secret nobody tells beginners: talking to them works exactly like talking to me. You already speak the language." },
      { speaker: 'Chachapiti', tone: 'sun', text: 'Take this shard to remember it. Now go meet Termi at the old desk, up the path and to the east!' },
    ],
    { grantsShard: 'language' },
  ),
  bubblesAfter: D('bubblesAfter', [
    { speaker: 'Chachapiti', tone: 'sun', text: 'The valley is yours! Termi to the north-east, the App Stand to the west, the Office up north. The big door leaves the valley — but it has a... guardian.' },
  ]),

  /* ── Termi, the terminal ─────────────────────────────────────────────── */
  termi: D(
    'termi',
    [
      { speaker: 'Termi', tone: 'plum', text: '❯ oh! a visitor. I am Termi — a terminal. People find me scary. I am literally a text box.' },
      { speaker: 'Termi', tone: 'plum', text: "❯ here's my superpower: I am the most VERSATILE door to agents. I run on any computer — PC or Mac — no app store needed." },
      { speaker: 'Termi', tone: 'plum', text: '❯ got Claude Pro? Claude Code runs in me. Got ChatGPT Plus? Codex runs in me. Want free? OpenCode is free and open-source, and lives in me too.' },
      { speaker: 'Termi', tone: 'plum', text: "❯ fun fact: I'm older than the computer mouse. Still here. The cursor blinking in me? That's your cousin, by the way." },
      { speaker: 'Termi', tone: 'plum', text: '❯ how it works, simply: you type a message, the agent answers, and before it touches anything it asks you first. Same chat, more muscles.' },
      { speaker: 'Termi', tone: 'plum', text: "❯ full honesty: moving an agent into me takes ONE copy-paste install command from its official guide. Five minutes, once. After that, you just type its name and we're talking." },
      { speaker: 'Termi', tone: 'plum', text: '❯ take this shard. And if you prefer pretty buttons — no offense taken. Visit the App Stand, west side of the valley.' },
    ],
    {
      grantsShard: 'terminal',
      links: [
        { label: 'What the terminal really is — MDN crash course', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line' },
        { label: 'Claude Code docs — running an agent in me', url: 'https://code.claude.com/docs/en/overview' },
      ],
    },
  ),
  termiAfter: D('termiAfter', [
    { speaker: 'Termi', tone: 'plum', text: "❯ back so soon? blink once if you missed me. ...that was a blink. I'm sure of it." },
  ]),

  /* ── the App Stand ───────────────────────────────────────────────────── */
  vendor: D(
    'vendor',
    [
      { speaker: 'Stand Pip', tone: 'sun', text: 'Step right up! I stock DOORS — the easy kind. Today on the shelf: Claude Code, which lives right inside the Claude app, included in Claude Pro.' },
      { speaker: 'Stand Pip', tone: 'sun', text: "Also in stock: Codex — OpenAI's agent, its own app, included in ChatGPT Plus. And mind you, new doors arrive every season. This stand never looks the same twice." },
      { speaker: 'Stand Pip', tone: 'sun', text: 'Fancy editors like Cursor and VS Code can run agents too — a fine road, for later. And the free trail to OpenCode starts just south of here.' },
      { speaker: 'Stand Pip', tone: 'sun', text: "The stand's real secret, free of charge: tools change. The skill — saying what you want, deciding when asked — moves with you. Take a shard!" },
    ],
    {
      grantsShard: 'apps',
      links: [
        { label: 'Claude Code', url: 'https://claude.com/product/claude-code' },
        { label: 'OpenAI Codex', url: 'https://developers.openai.com/codex' },
        { label: 'Which door fits you? — the picker', url: '../#pick-your-door' },
      ],
    },
  ),
  opencodeMarker: D(
    'opencodeMarker',
    [
      { speaker: 'Trail marker', tone: 'leaf', text: 'THE FREE TRAIL — OpenCode: free, open-source, terminal-only. Bring a Claude or ChatGPT subscription you already have, or your own API keys.' },
    ],
    { links: [{ label: 'OpenCode', url: 'https://opencode.ai' }] },
  ),

  /* ── valley flavor ───────────────────────────────────────────────────── */
  roamer: D(
    'roamer',
    [
      { speaker: 'Wandering Pip', tone: 'leaf', text: "Hi! I walk this road every day and nothing has ever broken. Want to know why? Two rules." },
      { speaker: 'Wandering Pip', tone: 'leaf', text: 'Rule one: agents ask before they touch anything. You say yes or no. "No" always works.' },
      { speaker: 'Wandering Pip', tone: 'leaf', text: 'Rule two: practice in a brand-new empty folder. Empty means nothing to lose. Worst case? Delete the folder — like it never happened.' },
      { speaker: 'Wandering Pip', tone: 'leaf', text: 'Ask first, break nothing. Carry it as a shard — the guardian at the door respects this one most.' },
    ],
    {
      grantsShard: 'safety',
      links: [
        { label: 'Your First Day — the honest walkthrough', url: '../first-day/' },
        { label: 'The decoder — for weird moments', url: '../help/' },
      ],
    },
  ),
  mailbox: D('mailbox', [
    { speaker: 'Mailbox', tone: 'tangerine', text: 'A flyer inside: "FIRST PROMPTS, FREE — the Prompt Pantry. Paste, answer questions, own a website by teatime." Sounds made up. It isn\'t.' },
  ]),
  bench: D('bench', [
    { speaker: 'Bench plaque', tone: 'ink', text: '"In memory of every beginner who thought they\'d break the computer. They didn\'t." — the Valley' },
  ]),
  officeDoorLocked: D('officeDoorLocked', [
    { speaker: '???', tone: 'plum', text: 'The office door is propped shut with a sticky note: "Movers still arranging desks — grand opening any day now!"' },
  ]),
  exitNeedShards: D('exitNeedShards', [
    { speaker: '???', tone: 'plum', text: 'A voice oozes from behind the door: "I only steal COMPLETE collections, little cursor. Come back with all five shards."' },
  ]),

  /* ── the Agent Office ────────────────────────────────────────────────── */
  chief: D(
    'chief',
    [
      { speaker: 'The Chief', tone: 'tangerine', text: 'Welcome to the office! Here, one main agent — me — breaks a big job into pieces and hands each piece to a worker agent.' },
      { speaker: 'The Chief', tone: 'tangerine', text: 'Research goes to the researcher, words to the writer, bugs to the fixer. They hand work to each other. I keep the plan. The human keeps the last word.' },
      { speaker: 'The Chief', tone: 'tangerine', text: "This is advanced — the deep end of the pool. Setups like Hermes make it possible: free, open-source, self-hosted. You run it on your own machine, when you're ready for more." },
      { speaker: 'The Chief', tone: 'tangerine', text: 'My honest tip: master ONE agent first. The day one agent feels easy, a team of them will feel obvious. Take this shard — and the resources by the door.' },
    ],
    {
      grantsShard: 'orchestra',
      links: [
        { label: 'Hermes Agent — for when you’re ready', url: 'https://hermes-agent.nousresearch.com' },
        { label: 'The decoder — when anything looks weird', url: '../help/' },
      ],
    },
  ),
  workerResearch: D('workerResearch', [
    { speaker: 'Researcher Pip', tone: 'sky', text: 'Shh — comparing fourteen sources. The Chief gives me the questions; I bring back the facts. I never guess out loud. Well. Rarely.' },
  ]),
  workerWriter: D('workerWriter', [
    { speaker: 'Writer Pip', tone: 'blush', text: "I turn the researcher's facts into words humans enjoy. The trick? Short sentences. Warm ones. Like these." },
  ]),
  workerFixer: D('workerFixer', [
    { speaker: 'Fixer Pip', tone: 'grape', text: 'Red error text is my breakfast. Paste me an error and I purr. Fun fact: fixing is half of every agent\'s job — nobody writes it perfect first try.' },
  ]),
  runner: D('runner', [
    { speaker: 'Runner Pip', tone: 'sun', text: "Coming through! Hand-offs, hand-offs! The researcher's notes go to the writer, the writer's draft goes to review — teamwork, but with version numbers!" },
  ]),
  sleeper: D('sleeper', [
    { speaker: 'Sleeping Pip', tone: 'sky', text: 'zzz... rate limit... zzz... agents don\'t get tired, but every plan has a breath rhythm... zzz... nap time is rate-limit time...' },
  ]),
  sleeper2: D('sleeper2', [
    { speaker: 'Sleeping Pip', tone: 'blush', text: 'zzz... five hundred files reviewed... zzz... wake me when the humans decide... zzz...' },
  ]),
  cafeteria: D('cafeteria', [
    { speaker: 'Cafeteria Pip', tone: 'leaf', text: "We don't drink coffee. We can't drink coffee. We just deeply respect the vibe of a break room." },
  ]),
  cafeteria2: D('cafeteria2', [
    { speaker: 'Cafeteria Pip', tone: 'grape', text: 'Half the team works together, some work alone, two are asleep — and somehow everything ships. The Chief calls it "orchestration". I call it Tuesday.' },
  ]),
}

/* ── the Data Snatcher's questions ────────────────────────────────────── */

export interface BossQuestion {
  q: string
  options: string[]
  correct: number
  why: string
}

export const BOSS_QUESTIONS: BossQuestion[] = [
  {
    q: 'An agent asks: “May I create the folder my-first-site?” What do you do?',
    options: [
      'Panic — it’s hacking me',
      'Read what it wants, then decide — “no” always works',
      'Always click Allow without reading, to be polite',
    ],
    correct: 1,
    why: 'The ask-first moment IS the safety system. Read it, decide it. Refusing does nothing at all — you stay the boss.',
  },
  {
    q: 'Which of these belongs in a chat with any AI?',
    options: ['Your password, for safekeeping', 'Your bank card number, but quickly', 'Neither — secrets stay out of every chat'],
    correct: 2,
    why: 'Passwords and private numbers never go into any chat — this one, or any other. Practice in an empty folder, where there is nothing sensitive at all.',
  },
  {
    q: 'Should a beginner wire their email inbox into an agent?',
    options: [
      'Yes — maximum power immediately',
      'No — emails can hide sneaky instructions meant for the AI (prompt injection)',
      'Only on Tuesdays',
    ],
    correct: 1,
    why: 'A stranger’s email can contain hidden instructions the agent might read as commands. Keep your inbox out of it while you learn — power up later, carefully.',
  },
  {
    q: 'Which model should you pick for important work?',
    options: [
      'The strongest one I can use — fewer made-up facts, better reasoning',
      'The weakest one — less power, less danger',
      'Doesn’t matter, they’re all the same',
    ],
    correct: 0,
    why: 'Stronger models make fewer things up and follow instructions more carefully — that makes them safer too. But no model is magic: you still check the result.',
  },
  {
    q: 'The agent is doing something you don’t like. What’s true?',
    options: [
      'You must wait politely until it finishes',
      'Stopping it mid-work breaks your computer',
      'You can stop it any time — your files stay as they were',
    ],
    correct: 2,
    why: 'Every tool has a stop button and stopping is always safe. Agents ask, you approve, you can halt — the human keeps the last word. Always.',
  },
]
