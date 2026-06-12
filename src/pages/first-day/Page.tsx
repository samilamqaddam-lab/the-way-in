import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { SubpageShell } from '../../components/SubpageShell'
import { GlossaryTip } from '../../components/GlossaryTip'
import { Pip } from '../../components/Pip'
import { fadeUp, staggerKids, viewportOnce } from '../../lib/motion'
import { room } from '../../lib/links'

/* ─── little mock windows ───────────────────────────────────────────────── */

function MiniWindow({ tone, title, children }: { tone: 'light' | 'dark'; title: string; children: ReactNode }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`overflow-hidden rounded-xl border-[2.5px] ${
        dark ? 'on-dark border-ink bg-plum text-on-plum' : 'border-ink bg-white'
      }`}
    >
      <div className={`flex items-center gap-1.5 border-b-2 px-3 py-2 ${dark ? 'border-plum-line' : 'border-line'}`}>
        <span className="h-2 w-2 rounded-full bg-blush" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
        <span className={`ml-1 truncate font-mono text-[0.62rem] ${dark ? 'text-on-plum-dim' : 'text-neutral-600'}`}>
          {title}
        </span>
      </div>
      <div className="space-y-1.5 p-3.5 text-left font-mono text-[0.72rem] leading-relaxed">{children}</div>
    </div>
  )
}

function YouLine({ children }: { children: ReactNode }) {
  return (
    <p className="ml-auto w-fit max-w-[90%] rounded-lg rounded-br-sm border-2 border-ink bg-sun px-2.5 py-1.5 font-sans text-[0.78rem] font-medium text-ink">
      {children}
    </p>
  )
}

/* ─── a moment on the timeline ──────────────────────────────────────────── */

interface MomentProps {
  n: number
  emoji: string
  title: string
  mock: ReactNode
  happening: ReactNode
  youDo: ReactNode
  breathe: ReactNode
}

function Moment({ n, emoji, title, mock, happening, youDo, breathe }: MomentProps) {
  return (
    <motion.li variants={fadeUp} className="relative pl-14 sm:pl-16">
      <span
        className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border-[3px] border-ink bg-sun font-display text-base font-extrabold shadow-pop-sm"
        aria-hidden="true"
      >
        {n}
      </span>
      <div className="card-pop overflow-hidden">
        <div className="border-b-[3px] border-ink bg-paper-deep px-5 py-4">
          <h2 className="font-display text-xl font-extrabold leading-snug md:text-2xl">
            <span aria-hidden="true">{emoji} </span>
            {title}
          </h2>
        </div>
        <div className="grid gap-5 p-5 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>{mock}</div>
          <div className="space-y-3.5 text-[0.95rem] leading-relaxed">
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-sky-deep">
                what's happening
              </p>
              <p className="mt-1 text-ink-soft">{happening}</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-tangerine-deep">
                what you do
              </p>
              <p className="mt-1 text-ink-soft">{youDo}</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-leaf-deep">breathe</p>
              <p className="mt-1 text-ink-soft">{breathe}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  )
}

/* ─── the page ──────────────────────────────────────────────────────────── */

export function FirstDayPage() {
  return (
    <SubpageShell
      page="first-day"
      eyebrow="the walkthrough"
      title="Your First Day"
      kicker="What actually happens between pasting your first prompt and having a real thing — every moment, including the awkward ones."
      pip={<Pip size={60} mood="wink" bob />}
    >
      <section className="px-5">
        <motion.ol
          variants={staggerKids}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative mx-auto mt-12 grid w-full max-w-3xl gap-8"
        >
          <span className="absolute bottom-4 left-5 top-4 -z-10 w-[3px] rounded bg-line" aria-hidden="true" />

          <Moment
            n={1}
            emoji="🚪"
            title="Open your tool — both doors look like this"
            mock={
              <div className="grid gap-3">
                <MiniWindow tone="light" title="the app">
                  <p className="rounded-lg border-2 border-line bg-paper-deep px-2.5 py-1.5 font-sans text-[0.78rem] text-neutral-600">
                    Message your agent…
                  </p>
                </MiniWindow>
                <MiniWindow tone="dark" title="the terminal">
                  <p>
                    ❯ <span className="text-tangerine">▍</span>
                  </p>
                </MiniWindow>
              </div>
            }
            happening={
              <>
                Underneath, both are the same thing: a conversation. One wears buttons, one wears plain text. The{' '}
                <GlossaryTip k="terminal">terminal</GlossaryTip> is just the chat window with the makeup off.
              </>
            }
            youDo="Open whichever you picked. If you chose an app, it looks like every chat you've ever used. If you chose the terminal, you'll see a quiet little symbol waiting — that's the whole interface."
            breathe="An open tool does nothing by itself. You can stare at it as long as you like; nothing moves until you type."
          />

          <Moment
            n={2}
            emoji="📋"
            title="Paste your prompt"
            mock={
              <MiniWindow tone="light" title="your first message">
                <YouLine>
                  Hi! I'm brand new to this — please be my friendly guide as well as my builder. Before you write any
                  code, ask me five quick questions…
                </YouLine>
              </MiniWindow>
            }
            happening={
              <>
                Your <GlossaryTip k="prompt">prompt</GlossaryTip> is a normal message — there's no special code-speak
                hiding in it. The good ones just say clearly what you want and how you'd like to be treated.
              </>
            }
            youDo="Paste it. Press enter. That's genuinely the whole step."
            breathe="Sending a message changes nothing on your computer. Words first, permission later — always in that order."
          />

          <Moment
            n={3}
            emoji="🙋"
            title="It asks YOU questions first"
            mock={
              <MiniWindow tone="light" title="the interview">
                <p className="font-sans text-[0.78rem]">
                  <span className="font-bold text-tangerine">❯</span> Lovely — before I build anything: what's your
                  name, and what are three things you love?
                </p>
                <YouLine>I'm Nadia. Hiking, my cat Pixel, and very strong coffee.</YouLine>
              </MiniWindow>
            }
            happening="Our starter prompts ask the agent to interview you first — because it can write code, but it can't know your cat's name. This little interview is where your thing becomes yours."
            youDo="Answer like you'd text a friend. Short is fine. Honest is better than impressive."
            breathe="There are no wrong answers here. It's your page — the agent is taking notes, not grading."
          />

          <Moment
            n={4}
            emoji="🪪"
            title="The first permission ask"
            mock={
              <div className="rounded-xl border-[2.5px] border-sun bg-plum p-3.5">
                <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-sun">
                  permission needed
                </p>
                <p className="mt-1 font-sans text-[0.8rem] font-semibold text-on-plum">
                  Create a new folder called my-first-site?
                </p>
                <div className="mt-2.5 flex gap-2">
                  <span className="rounded-full border-2 border-ink bg-sun px-3 py-1 text-[0.7rem] font-bold text-ink">
                    Allow ✓
                  </span>
                  <span className="rounded-full border-2 border-plum-line px-3 py-1 text-[0.7rem] font-bold text-on-plum">
                    Not now
                  </span>
                </div>
              </div>
            }
            happening="This is the moment the test drive rehearsed with you. Before the agent creates or changes anything, the decision comes to you — every time."
            youDo="Read what it's asking, then allow it. (Or don't! Saying no does nothing at all, and the agent will simply wait.)"
            breathe={
              <>
                The <GlossaryTip k="folder">folder</GlossaryTip> it wants to make starts empty. An empty folder has
                nothing to lose — that's your safety net, and it never wears out.
              </>
            }
          />

          <Moment
            n={5}
            emoji="🛠️"
            title="It works — and narrates"
            mock={
              <MiniWindow tone="dark" title="the agent, busy">
                <p className="text-term-green">✓ index.html written</p>
                <p className="text-term-green">✓ style.css written</p>
                <p className="italic text-on-plum-dim">· now the footer, then your three loves…</p>
              </MiniWindow>
            }
            happening={
              <>
                The agent is doing the typing-into-
                <GlossaryTip k="file">files</GlossaryTip> part — the part that used to be the wall. It narrates as it
                goes, like a friendly cooking show.
              </>
            }
            youDo="Honestly? Watch, or go make tea. If it needs another decision from you, it stops and asks — that's the deal."
            breathe="You don't need to understand the narration. 'Looks busy, seems happy' is a complete status check."
          />

          <Moment
            n={6}
            emoji="🌐"
            title="Open your thing"
            mock={
              <MiniWindow tone="light" title="your-computer/my-first-site/index.html">
                <div className="rounded-lg bg-[#FFF1E0] p-3 text-center">
                  <p className="font-display text-base font-extrabold text-tangerine-deep">Hi, I'm Nadia 👋</p>
                  <p className="font-sans text-[0.7rem] text-neutral-600">hiking · Pixel the cat · strong coffee</p>
                </div>
              </MiniWindow>
            }
            happening={
              <>
                Those files became a real page, and your{' '}
                <GlossaryTip k="browser">browser</GlossaryTip> can show it — no internet required, it's all on your
                machine.
              </>
            }
            youDo="The agent will tell you exactly how to open it — usually as simple as double-clicking index.html in your folder. If you're unsure, ask: “how do I look at it?”"
            breathe="Looking can't break anything. Open it, refresh it, show the cat. This moment is the whole point — enjoy it."
          />

          <Moment
            n={7}
            emoji="🔁"
            title="Ask for changes — in human words"
            mock={
              <MiniWindow tone="light" title="the actual workflow">
                <YouLine>Make the headline bigger, and can the whole thing feel… cozier?</YouLine>
                <p className="font-sans text-[0.78rem]">
                  <span className="font-bold text-tangerine">❯</span> Done — warmer colors, rounder corners. Refresh
                  and tell me what you feel.
                </p>
              </MiniWindow>
            }
            happening="This loop — look, react, ask, look again — is the actual craft. Not typing code: noticing what you want and saying it."
            youDo="Speak human. “Less shouty.” “More like a bakery.” “The photo feels lonely.” Agents are startlingly good at translating feelings into changes."
            breathe="Nothing is ever final. Every change is just another message, and you can always say “actually, put it back.”"
          />

          <Moment
            n={8}
            emoji="🟥"
            title="When it goes weird"
            mock={
              <MiniWindow tone="dark" title="a wild error appears">
                <p className="text-[#FF8A7A]">Error: style.css not found (line 12)</p>
                <YouLine>this appeared — what does it mean?</YouLine>
                <p>
                  <span className="font-bold text-tangerine">❯</span>{' '}
                  <span className="font-sans text-[0.78rem]">Ah, my typo — fixing it now. Nothing is harmed.</span>
                </p>
              </MiniWindow>
            }
            happening={
              <>
                Sooner or later, red text appears. An <GlossaryTip k="error">error</GlossaryTip> is a message, not
                damage — the computer saying “I couldn't do that.”
              </>
            }
            youDo={
              <>
                Paste it right back and ask what it means. That's not a beginner move — it's what professionals do
                all day. (The{' '}
                <a
                  className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4"
                  href={room('help').fromSub}
                >
                  decoder page
                </a>{' '}
                covers the other weird moments.)
              </>
            }
            breathe="Your files are exactly where they were. Errors during practice in an empty folder cost you nothing but a sip of tea."
          />

          <Moment
            n={9}
            emoji="✋"
            title="Saying no — and stopping"
            mock={
              <MiniWindow tone="dark" title="you're allowed">
                <YouLine>actually, stop for a second</YouLine>
                <p>
                  <span className="font-bold text-tangerine">❯</span>{' '}
                  <span className="font-sans text-[0.78rem]">
                    Stopped. Nothing half-done was saved. What would you like to change?
                  </span>
                </p>
              </MiniWindow>
            }
            happening="You're the boss at every moment, not just at permission time. Every tool has a stop button, and “no” is a complete sentence."
            youDo="Say no to anything you don't understand. Ask “why?” as often as you like. Stop entirely whenever you want."
            breathe="Stopping mid-work leaves your files as they were. The agent doesn't sulk. You can't hurt its feelings — it doesn't have any, just manners."
          />

          <Moment
            n={10}
            emoji="🌅"
            title="Coming back tomorrow"
            mock={
              <MiniWindow tone="dark" title="day two">
                <YouLine>let's continue with my-first-site — where were we?</YouLine>
                <p>
                  <span className="font-bold text-tangerine">❯</span>{' '}
                  <span className="font-sans text-[0.78rem]">
                    Welcome back! I see the folder: one page, three loves, one cat. You wanted a photo section next.
                  </span>
                </p>
              </MiniWindow>
            }
            happening={
              <>
                A <GlossaryTip k="session">session</GlossaryTip> is one sitting — the chat may end, but your folder
                stays real. Your work lives in files, not in the conversation.
              </>
            }
            youDo="Open your tool, point it at your folder, and say “let's continue.” It looks inside and picks right up."
            breathe="You made a thing that exists. It will still exist after dinner, after the weekend, after you forget about it for a month. That's what real means."
          />
        </motion.ol>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <p className="font-display text-2xl font-extrabold md:text-3xl">That's the whole first day.</p>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            One message, a few honest answers, one Allow, and a loop of “looks great, now make it cozier.” You can do
            every part of that today.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a href="../#first-prompts" className="btn-pop btn-tangerine">
              Grab your first prompt
            </a>
            <a href={room('help').fromSub} className="btn-pop">
              Keep the decoder handy
            </a>
          </div>
        </motion.div>
      </section>
    </SubpageShell>
  )
}
