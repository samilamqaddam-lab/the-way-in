export interface StarterPrompt {
  id: 'about-me' | 'presentation' | 'tiny-app'
  title: string
  forWho: string
  time: string
  what: string
  prompt: string
}

/**
 * The three take-away prompts. Each one quietly teaches good habits:
 * ask-me-questions-first, work in a fresh empty folder, plain files,
 * no installs, phone-friendly, explain-it-after, and ideas for next steps.
 */
export const starterPrompts: StarterPrompt[] = [
  {
    id: 'about-me',
    title: 'A page about you',
    forWho: 'for you',
    time: '~15 min',
    what: 'A warm one-page website about who you are and what you love. Your little corner of the internet.',
    prompt: `Hi! I'm brand new to this — please be my friendly guide as well as my builder. Before you write any code, ask me five quick questions, one at a time: my name, three things I love or spend time on, a favorite color, the overall vibe I want (cozy, bold, minimal...), and whether I want a way for people to contact me.

Then create a new empty folder called "my-first-site" and work only inside it. Build a one-page "about me" website using plain HTML, CSS and JavaScript — no installs, no frameworks, everything in that one folder. Make it feel personal, not corporate: a big friendly headline, a short intro using my actual answers, a section for the three things I love, and a small footer. Make sure it looks great on a phone.

When you're done, explain what each file does in simple words, tell me how to open the site in my browser, and suggest three small changes I could ask you for next.`,
  },
  {
    id: 'presentation',
    title: 'A tiny presentation',
    forWho: 'for sharing',
    time: '~15 min',
    what: 'A slideshow website about something you love — flip through it like slides, right in the browser.',
    prompt: `I want to make a little presentation website about something I love — ask me for the topic first. I'm completely new to this, so go step by step and don't assume I know any technical words. Ask me, one at a time: the topic, who it's for, the three to five main points I want to make, and the mood (playful, calm, dramatic).

Then create a new empty folder called "my-presentation" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build it as full-screen slides I can move through with arrow keys on a computer and by tapping or swiping on a phone, with a little progress dot for each slide. One big idea per slide, large readable text, quick smooth transitions. End with a final slide that credits me as the author.

When it's done, tell me how to open it, then show me how I could change the words on a slide myself.`,
  },
  {
    id: 'tiny-app',
    title: 'A little everyday app',
    forWho: 'for your people',
    time: '~20 min',
    what: 'A colorful decision wheel for "what\'s for dinner?" moments. Your first real app — it even remembers your list.',
    prompt: `Let's build my first tiny app: a decision wheel for moments like "what's for dinner?" or "who goes first?". I'm brand new — be patient and explain things as you go. First ask me what I'll mostly use it for and what it should be called.

Then create a new empty folder called "my-little-app" and work only inside it, using plain HTML, CSS and JavaScript — no installs, and it should work completely offline. The app: I can type in a list of options, add or remove them, and press a big SPIN button to make a colorful wheel spin and land on one, with a fun little celebration. Save my list in the browser using localStorage so it's still there tomorrow, and add a small note in the app saying my list never leaves my device. Big buttons, easy to read, great on a phone.

When you finish, explain in plain words how the saving works, and give me three ideas for what we could add next.`,
  },
]
