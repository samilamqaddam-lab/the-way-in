import { starterPrompts } from './prompts'

/**
 * The Prompt Pantry: paste-ready prompts organized by life situation.
 * Every prompt keeps the house safety grammar: ask-me-questions-first,
 * a brand-new empty folder, plain HTML/CSS/JS with no installs,
 * phone-friendly, explain-it-after, and ideas for next steps.
 * Anything that saves data uses localStorage and says so honestly.
 */

export type CategoryId = 'love' | 'family' | 'school' | 'hobby' | 'helpers' | 'words' | 'thing'

export interface PantryCategory {
  id: CategoryId
  label: string
  emoji: string
  /** thumb tint classes */
  tint: string
}

export const categories: PantryCategory[] = [
  { id: 'love', label: 'for someone you love', emoji: '💛', tint: 'bg-blush/30' },
  { id: 'family', label: 'home & family', emoji: '🏡', tint: 'bg-sun/30' },
  { id: 'school', label: 'school & learning', emoji: '📚', tint: 'bg-sky/20' },
  { id: 'hobby', label: 'your hobbies', emoji: '🎨', tint: 'bg-grape/15' },
  { id: 'helpers', label: 'little life helpers', emoji: '🧮', tint: 'bg-leaf/20' },
  { id: 'words', label: 'your words', emoji: '✍️', tint: 'bg-paper-deep' },
  { id: 'thing', label: 'the thing you do', emoji: '🎪', tint: 'bg-tangerine/15' },
]

export type PromptForm = 'page' | 'app' | 'slides'

export interface PantryPrompt {
  id: string
  category: CategoryId
  emoji: string
  title: string
  forWho: string
  time: string
  what: string
  prompt: string
  classic?: boolean
  /** what kind of thing it builds — used by the Mixer's shelf-matching */
  form: PromptForm
  /** plain-words search keywords, occasions included */
  tags: string[]
}

type RawPrompt = Omit<PantryPrompt, 'form' | 'tags'>

const fresh: RawPrompt[] = [
  // ─── for someone you love ────────────────────────────────────────────────
  {
    id: 'birthday-page',
    category: 'love',
    emoji: '🎂',
    title: 'The birthday page',
    forWho: 'for the birthday human',
    time: '~15 min',
    what: 'The classic first build — a big cheerful page for someone’s day, confetti button included.',
    prompt: `Hi! I'm brand new to this — please be my friendly guide as well as my builder. Someone's birthday is coming and I want to make them a page. Before you write any code, ask me, one at a time: their name, how we know each other, three things I genuinely love about them, whether an inside joke is welcome, and their favorite color.

Then create a new empty folder called "birthday-page" and work only inside it, using plain HTML, CSS and JavaScript — no installs, no frameworks. Build one joyful page: a huge happy-birthday headline with their name, the three things I love about them as warm little cards, and a big button that fires confetti when pressed. Cheerful but not chaotic, and perfect on a phone — that's where they'll open it.

When you're done, explain what each file does in simple words, tell me how to open it in my browser, and give me three ideas to make it even more theirs.`,
  },
  {
    id: 'thank-you',
    category: 'love',
    emoji: '💐',
    title: 'A thank-you page',
    forWho: 'for a kind soul',
    time: '~15 min',
    what: 'A heartfelt one-page thank-you — like a card, but it lives forever and scrolls.',
    prompt: `Hi! I'm brand new to this — please be my friendly guide as well as my builder. I want to make a thank-you page for someone who deserves it. Before you write any code, ask me, one at a time: who it's for, what they did, three small moments or details I remember, their favorite color, and the tone (warm, funny, or allowed-to-make-them-cry).

Then create a new empty folder called "thank-you-page" and work only inside it, using plain HTML, CSS and JavaScript — no installs, no frameworks. Build one page: a big thank-you headline with their name, a short paragraph in my words, the three moments as sweet little cards, and a sign-off from me. Make it feel like a hug, not a corporate card, and make sure it looks lovely on a phone.

When you're done, explain what each file does in simple words, tell me how to open it in my browser, and suggest three small touches we could add next.`,
  },
  {
    id: 'our-story',
    category: 'love',
    emoji: '💞',
    title: '“Our story so far”',
    forWho: 'for your person',
    time: '~20 min',
    what: 'A scrolling timeline of you two — first meeting to right now, ending with “to be continued…”.',
    prompt: `Hi! I'm completely new to building things — be patient and explain as you go. I want to make a timeline page about me and someone important to me. First ask me, one at a time: who we are, five to eight moments worth remembering (with rough dates — "summer 2019" is fine), one inside joke I'm willing to include, and a color that feels like us.

Then create a new empty folder called "our-story" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build a vertical timeline I can scroll: each moment a little card with its date, gentle alternating sides on big screens, simple stacking on a phone. End the timeline with a final card that just says "to be continued…". Keep the words exactly as I gave them — they matter.

When it's done, show me how to open it, then how I'd ask you to add moment number nine someday.`,
  },
  {
    id: 'baby-hello',
    category: 'love',
    emoji: '👶',
    title: 'A hello-world baby page',
    forWho: 'for the newest human',
    time: '~15 min',
    what: 'A soft welcome page for a brand-new arrival — name, story, and a list of “firsts” to fill in.',
    prompt: `Hello! I'm new to this, so please guide me kindly. A baby just arrived in our world and I want to make a little welcome page. Ask me first, one at a time: the baby's name, the arrival date, anything sweet I want the world to know (weight and time are optional — only if I offer), who we want to thank, and whether the vibe is soft pastels or bright confetti.

Then create a new empty folder called "baby-hello" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build one gentle page: a big "hello, [name]" headline, a small card of details, a thank-you line, and an empty "the firsts" list (first smile, first laugh, first steps) with space to fill in dates later. Phone-first — that's where the family will see it.

Afterwards, explain the files simply and show me how I'd add "first laugh" when it happens.`,
  },
  {
    id: 'get-well',
    category: 'love',
    emoji: '🍵',
    title: 'A get-well-soon page',
    forWho: 'for a friend on the mend',
    time: '~15 min',
    what: 'A cheer-up page with a “when you’re better” list and a button that serves a fresh smile.',
    prompt: `Hi! I'm brand new — please explain things as we go. Someone I care about is under the weather and I want to build them a small cheer-up page. Ask me first, one at a time: their name, our relationship, three things we'll do together when they're better, whether jokes are welcome or it should stay gentle, and a color they love.

Then create a new empty folder called "get-well-soon" and work only inside it, with plain HTML, CSS and JavaScript — no installs, works offline. Build one page: a warm headline, the "when you're better, we will…" list as three cards, and a big button labeled "one more smile" that shows a new short compliment or tiny joke each time it's pressed (write 8 of them with me first). Big text, easy on tired eyes, great on a phone.

When you finish, explain the files in plain words and how I can change the jokes myself by asking you.`,
  },

  // ─── home & family ───────────────────────────────────────────────────────
  {
    id: 'shopping-list',
    category: 'family',
    emoji: '🛒',
    title: 'The household shopping list',
    forWho: 'for the fridge crew',
    time: '~20 min',
    what: 'A tap-friendly shared list that remembers itself — add, check off, and never lose the paper again.',
    prompt: `Let's build my first useful app: our household shopping list. I'm completely new, so be patient and explain as you go. First ask me: what we call our household, and ten things we buy again and again (so the list starts helpful, not empty).

Then create a new empty folder called "family-list" and work only inside it, using plain HTML, CSS and JavaScript — no installs, and it must work completely offline. The app: type an item and add it, tap to check it off (it moves to a "got it" section), swipe-or-tap to remove, and a "clear the got-its" button. Save everything with localStorage so the list survives closing the browser, and put a small honest note in the footer: "this list lives only on this device". Big buttons, readable in a busy supermarket, perfect on a phone.

When you're done, explain in plain words how the saving works, and give me three ideas for version two.`,
  },
  {
    id: 'recipe-book',
    category: 'family',
    emoji: '🍲',
    title: 'The family recipe book',
    forWho: 'for the family table',
    time: '~25 min',
    what: 'A little website holding the recipes that must never be lost — with tick-along steps.',
    prompt: `I want to protect our family recipes by turning them into a little website. I'm brand new to this — guide me gently. First, ask me for two recipes to start with: for each one, its name, who it comes from, the ingredients with amounts, and the steps. Ask one question at a time so I can dig out the details.

Then create a new empty folder called "family-recipe-book" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build a cover page that lists the recipes like a book's table of contents, and one warm, readable page per recipe: who it's from at the top, ingredients in a neat list, steps with checkboxes I can tick while cooking. Easy to read with floury hands; lovely on a phone propped against the flour jar.

When it's done, explain the files simply — and most importantly, show me how we'd add recipe number three next Sunday.`,
  },
  {
    id: 'potluck',
    category: 'family',
    emoji: '🥗',
    title: 'The potluck planner',
    forWho: 'for the big gathering',
    time: '~20 min',
    what: '“Who brings what” without the group-chat chaos — slots for dishes, names next to them.',
    prompt: `Help me organize a gathering without forty group-chat messages. I'm new to building things, so explain as you go. First ask me: the occasion and date, how many people roughly, and which slots we need (starters, mains, desserts, drinks, extras like plates).

Then create a new empty folder called "potluck-planner" and work only inside it, using plain HTML, CSS and JavaScript — no installs, fully offline. Build a cheerful page: the occasion as a big headline, then each slot as a card where I can type a dish and the name of who's bringing it, plus a "still needed!" badge on empty slots. Save it all with localStorage and add the honest note: "this plan lives only on this device — I'll be passing my phone around." Big touch targets; it will be used mid-conversation at full volume.

When you finish, explain how saving works and suggest three nice extras for next time.`,
  },

  // ─── school & learning ───────────────────────────────────────────────────
  {
    id: 'flashcards',
    category: 'school',
    emoji: '🃏',
    title: 'Flashcards that quiz you',
    forWho: 'for exam season',
    time: '~25 min',
    what: 'Your own flip-card trainer: shuffle, flip, score yourself, keep a streak.',
    prompt: `Let's build my personal study tool: flashcards that quiz me. I'm brand new to this — explain things simply as you go. First ask me: the subject, then ten question-and-answer pairs (offer to help me sharpen any that are fuzzy), and whether I want a serious look or something more playful.

Then create a new empty folder called "my-flashcards" and work only inside it, using plain HTML, CSS and JavaScript — no installs, works offline. The app: shows one card at a time, tap to flip from question to answer, "got it" and "not yet" buttons, a shuffle button, and a little score at the end of a round. Keep my cards in their own file so they're easy to change, save my best streak with localStorage, and add the note that my progress never leaves my device. Big readable type — I'll be tired when I use this.

When it's done, explain the files in plain words and show me how to add card number eleven by just asking you.`,
  },
  {
    id: 'explainer',
    category: 'school',
    emoji: '💡',
    title: 'A topic explainer site',
    forWho: 'for sharing what you know',
    time: '~20 min',
    what: 'Turn something you understand into a friendly scrolling explainer — with a mini quiz at the end.',
    prompt: `I want to turn something I understand into a little website that explains it to others. I'm completely new to building — be my guide. Ask me first, one at a time: the topic, who should understand it by the end (my class? my grandpa?), the four to six big ideas in my own words, and the mood (playful, calm, dramatic).

Then create a new empty folder called "explain-it" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build a friendly one-page scroll: a big title, one clear section per idea with a short heading and my words tidied (but still mine), and at the very end a three-question mini quiz with instant right/wrong feedback, just for fun. Large readable text, works beautifully on a phone.

When you're done, explain the files simply, and tell me how I'd swap in better wording for section two later.`,
  },
  {
    id: 'exam-countdown',
    category: 'school',
    emoji: '⏳',
    title: 'Exam countdown + battle plan',
    forWho: 'for future calm you',
    time: '~25 min',
    what: 'A big honest countdown and a day-by-day plan you can actually tick off.',
    prompt: `Help me stop doom-scrolling and start preparing: I want an exam countdown page with a study plan. I'm new — explain everything simply. First ask me, one at a time: the exam name and date, the topics I need to cover, which ones scare me most, and how many days a week I'll honestly study.

Then create a new empty folder called "exam-plan" and work only inside it, using plain HTML, CSS and JavaScript — no installs, works offline. Build: a big live countdown (days and hours) at the top, then a day-by-day checklist that spreads my topics over the remaining time — scary topics earlier and repeated. Each item gets a checkbox; save my ticks with localStorage so progress survives, with the note that it stays on my device. Make ticking things off feel satisfying. Calm colors — this page should lower my pulse, not raise it.

When it's done, explain how the plan is spread out, and how to ask you to reshuffle it if I fall behind.`,
  },

  // ─── your hobbies ────────────────────────────────────────────────────────
  {
    id: 'collection',
    category: 'hobby',
    emoji: '🗃️',
    title: 'A collection showcase',
    forWho: 'for fellow enthusiasts',
    time: '~20 min',
    what: 'A proud little museum for whatever you collect — with a count and a crown on your favorite.',
    prompt: `I collect something and it deserves a museum. I'm brand new to building websites — guide me step by step. First ask me, one at a time: what I collect, six to ten pieces to start with (name plus one line about each — where it came from, why it matters), which one is my crown jewel, and the vibe (clean gallery or cozy cabinet of curiosities).

Then create a new empty folder called "my-collection" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build: a big title with a live count of pieces, a grid of cards (name + its one-line story, with a tasteful spot where a photo could go later), and a little crown badge on the favorite. Keep the pieces in their own file so adding more is easy. Looks great on a phone, because that's what I'll show people at dinner.

Afterwards, explain the files simply and show me how piece number eleven gets added.`,
  },
  {
    id: 'club-page',
    category: 'hobby',
    emoji: '🏆',
    title: 'A club roster & schedule',
    forWho: 'for your crew',
    time: '~20 min',
    what: 'Who we are, when we meet, what’s coming up — one page that answers the whole group chat.',
    prompt: `Our club keeps answering the same three questions in the group chat — let's build the page that answers them forever. I'm new to this, so explain as you go. Ask me first: the club's name and what we do, the members and their roles (captain, snack officer…), when and where we meet, and our next two or three events.

Then create a new empty folder called "our-club" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build one page: club name big and proud, a roster of member cards with their roles, a "we meet" card with day, time and place, and an upcoming events list with dates. Make it easy to read on a phone, and tidy enough to print for the noticeboard too.

When it's done, explain each file in plain words, and show me how to update the events list next month by just asking.`,
  },
  {
    id: 'plant-tracker',
    category: 'hobby',
    emoji: '🪴',
    title: 'The plant care tracker',
    forWho: 'for the leafy ones',
    time: '~25 min',
    what: 'A card per plant, a “watered today” button, and gentle nagging when someone’s thirsty.',
    prompt: `My plants deserve better than my memory — let's build them a care tracker. I'm completely new, so be patient and explain as you go. First ask me: my plants' names (nicknames welcome), roughly how often each wants water, and where each one lives in my home.

Then create a new empty folder called "plant-tracker" and work only inside it, using plain HTML, CSS and JavaScript — no installs, fully offline. The app: a card per plant showing its name, its spot, and "last watered X days ago", with a big "watered today!" button. When a plant goes past its schedule, its card turns gently thirsty-looking (color change, drooping emoji — be playful, not guilt-trippy). Save everything in localStorage with a small note that my plant data never leaves my device. Phone-first, garden-glove friendly.

When you're done, explain how the day counting works, and how I'd add a new plant after my next impulse purchase.`,
  },

  // ─── little life helpers ─────────────────────────────────────────────────
  {
    id: 'split-bill',
    category: 'helpers',
    emoji: '🧾',
    title: 'The bill splitter',
    forWho: 'for the end of dinner',
    time: '~15 min',
    what: 'Total, people, tip — big friendly numbers and no awkward napkin math.',
    prompt: `Build me the little app that ends the end-of-dinner math: a bill splitter. I'm brand new to this, so explain things simply. First ask me: does my country do tipping (and typical percentages), and do my friends ever split unevenly ("I only had a salad…")?

Then create a new empty folder called "split-the-bill" and work only inside it, using plain HTML, CSS and JavaScript — no installs, works completely offline. The app: enter the total, tap plus/minus for the number of people, pick a tip (the buttons we agreed on, plus "no tip"), and see each person's share in huge friendly numbers. If we said uneven splits matter, add a simple "one person pays X more" option — keep it simple. Big buttons that work in a dim restaurant on a phone.

When it's done, explain the files in plain words and suggest three small upgrades I could ask for.`,
  },
  {
    id: 'packing-list',
    category: 'helpers',
    emoji: '🧳',
    title: 'The packing list that remembers',
    forWho: 'for every trip',
    time: '~20 min',
    what: 'Tick it off, add your own essentials, reset for the next adventure — never forget the charger again.',
    prompt: `I always forget one thing when I travel — build me a packing list that remembers. I'm new to this; explain as you go. First ask me: the kinds of trips I usually take (weekend, beach, visiting family…), and the three things I have personally forgotten before.

Then create a new empty folder called "packing-list" and work only inside it, using plain HTML, CSS and JavaScript — no installs, fully offline. The app: a sensible starter checklist grouped by category (clothes, bathroom, tech, documents), checkboxes that satisfyingly tick, an "add your own item" box, and my three personally-forgotten items pinned at the top with a little ⚠️. A "new trip" button unticks everything but keeps my custom items. Save it all with localStorage and note honestly that the list lives only on my device.

When you finish, explain how the remembering works, and how I'd ask you for a "camping trip" version later.`,
  },
  {
    id: 'recipe-scaler',
    category: 'helpers',
    emoji: '⚖️',
    title: 'The recipe scaler',
    forWho: 'for cooking math',
    time: '~15 min',
    what: 'A recipe for 4 when you’re 7 people? Paste, slide, done — with sensible rounding.',
    prompt: `Save me from cooking math: I want a recipe scaler. I'm completely new to building things, so explain each step simply. First ask me: do I mostly cook from metric or cups-and-spoons, and what's a typical recipe I'd scale (so we test with something real)?

Then create a new empty folder called "recipe-scaler" and work only inside it, using plain HTML, CSS and JavaScript — no installs, works offline. The app: I paste or type my ingredient list with amounts (one per line), set "recipe serves" and "I need", and it shows the scaled list with sensible rounding — "2.5 eggs" should become a friendly note like "2 large eggs and a small one", and tiny amounts shouldn't turn into nonsense. Let me copy the scaled list with one tap. Kitchen-friendly: big text, no fiddly controls.

When it's done, explain in plain words how the scaling works, and what we'd add for version two.`,
  },

  // ─── your words ──────────────────────────────────────────────────────────
  {
    id: 'little-book',
    category: 'words',
    emoji: '📖',
    title: 'A little book of poems & quotes',
    forWho: 'for the lines you love',
    time: '~20 min',
    what: 'The lines that live in your head, finally living somewhere lovely — one per page.',
    prompt: `I keep my favorite poems and quotes in screenshots and scraps — let's give them a proper home. I'm brand new to this; please guide me gently. First ask me, one at a time: six to ten favorite lines, poems or quotes (with who wrote them, "unknown" allowed), which single one matters most and why (one sentence), and whether the book should feel like old paper or clean modern ink.

Then create a new empty folder called "my-little-book" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build it like a small book: a cover page with a title we choose together, then one entry per "page" with generous space around the words — let them breathe. The one that matters most gets its "why" underneath in small letters. Next/previous controls on a computer, swiping or tapping on a phone.

When it's done, show me how to open it, and how I'd slip a new page into the book later.`,
  },
  {
    id: 'future-letter',
    category: 'words',
    emoji: '✉️',
    title: 'A letter to future you',
    forWho: 'for you, later',
    time: '~20 min',
    what: 'Write it, seal it, pick the open date — it waits, counts down, and opens with confetti.',
    prompt: `Let's make something quietly magical: a letter to my future self. I'm new to this, so explain as you go. First ask me: roughly when future-me should open it (a birthday? new year? one year from today?), and whether the sealed page should be mysterious or cozy.

Then create a new empty folder called "dear-future-me" and work only inside it, using plain HTML, CSS and JavaScript — no installs, fully offline. The app: a writing page where I type my letter and pick the open date, a "seal it" button that stores the letter with localStorage, and from then on a sealed-envelope page showing only a countdown. On or after the date, an "open it" button appears — and opening it deserves a little confetti. Two honest notes on the page: my letter never leaves this device, and this is a ribbon, not a lock — anyone using this exact browser could peek.

When it's done, explain simply where the letter "lives", and what would erase it (so I don't lose it by accident).`,
  },

  // ─── the thing you do ────────────────────────────────────────────────────
  {
    id: 'my-thing',
    category: 'thing',
    emoji: '📣',
    title: 'A page for the thing you do',
    forWho: 'for your band, stall, or service',
    time: '~20 min',
    what: 'Your band, your honey jars, your dog-walking — one poster-like page that says it proudly.',
    prompt: `I do a thing — a band, a market stall, baking, dog-walking, fixing bikes — and it deserves one proud page. I'm brand new to websites, so be my guide. Ask me first, one at a time: what the thing is and its name, what I offer or play (three to six items), when and where people can find me, how I'd like to be contacted (and it's fine if the answer is "just talk to me at the market"), and whether the vibe is loud poster or quiet craft.

Then create a new empty folder called "my-thing-page" and work only inside it, using plain HTML, CSS and JavaScript — no installs. Build a poster-style one-pager: the name huge at the top, a line that says what I do in my own words, the offerings as bold cards, and a "find me" section. No fake testimonials, no corporate filler — just the thing, said proudly. Phone-first.

When it's done, explain the files simply and suggest three things we could add when business booms.`,
  },
]

/** Where the home page's three classics live in the pantry shelves. */
const CLASSIC_META: Record<string, { category: CategoryId; emoji: string }> = {
  'about-me': { category: 'words', emoji: '🙋' },
  presentation: { category: 'school', emoji: '🎞️' },
  'tiny-app': { category: 'helpers', emoji: '🎡' },
}

const classics: RawPrompt[] = starterPrompts.map((sp) => ({
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

/** Form + search tags per prompt — the Pantry's relevance layer. */
const FACETS: Record<string, { form: PromptForm; tags: string[] }> = {
  'about-me': { form: 'page', tags: ['me', 'personal', 'portfolio', 'introduce', 'hobby'] },
  presentation: { form: 'slides', tags: ['school', 'topic', 'explain', 'slideshow', 'talk'] },
  'tiny-app': { form: 'app', tags: ['decide', 'dinner', 'family', 'game', 'wheel', 'party'] },
  'birthday-page': { form: 'page', tags: ['birthday', 'party', 'celebrate', 'friend', 'gift'] },
  'thank-you': { form: 'page', tags: ['thanks', 'thank you', 'gift', 'kindness', 'teacher', 'friend'] },
  'our-story': { form: 'page', tags: ['anniversary', 'love', 'couple', 'timeline', 'valentine', 'gift'] },
  'baby-hello': { form: 'page', tags: ['baby', 'birth', 'announcement', 'family', 'welcome'] },
  'get-well': { form: 'page', tags: ['sick', 'cheer up', 'hospital', 'friend', 'care'] },
  'shopping-list': { form: 'app', tags: ['groceries', 'home', 'family', 'list', 'shopping'] },
  'recipe-book': { form: 'page', tags: ['cooking', 'family', 'food', 'recipes', 'heirloom'] },
  potluck: { form: 'app', tags: ['party', 'gathering', 'event', 'food', 'holidays', 'planning'] },
  flashcards: { form: 'app', tags: ['school', 'exam', 'study', 'revision', 'learning'] },
  explainer: { form: 'page', tags: ['school', 'teach', 'topic', 'explain', 'learning'] },
  'exam-countdown': { form: 'app', tags: ['school', 'exam', 'study', 'plan', 'countdown'] },
  collection: { form: 'page', tags: ['hobby', 'showcase', 'collection', 'display'] },
  'club-page': { form: 'page', tags: ['club', 'team', 'sport', 'group', 'schedule'] },
  'plant-tracker': { form: 'app', tags: ['plants', 'home', 'care', 'reminder', 'garden'] },
  'split-bill': { form: 'app', tags: ['dinner', 'money', 'friends', 'restaurant', 'tip'] },
  'packing-list': { form: 'app', tags: ['travel', 'trip', 'vacation', 'holiday', 'packing'] },
  'recipe-scaler': { form: 'app', tags: ['cooking', 'kitchen', 'food', 'servings'] },
  'little-book': { form: 'page', tags: ['poems', 'quotes', 'words', 'gift', 'book'] },
  'future-letter': { form: 'app', tags: ['letter', 'future', 'new year', 'birthday', 'time capsule'] },
  'my-thing': { form: 'page', tags: ['band', 'business', 'market', 'shop', 'flyer', 'event'] },
}

export const pantry: PantryPrompt[] = [...classics, ...fresh].map((p) => {
  const facets = FACETS[p.id]
  if (!facets) throw new Error(`missing facets for prompt ${p.id}`)
  return { ...p, ...facets }
})

export function categoryOf(p: PantryPrompt): PantryCategory {
  const found = categories.find((c) => c.id === p.category)
  if (!found) throw new Error(`unknown category for prompt ${p.id}`)
  return found
}
