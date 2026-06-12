import type { ReactNode } from 'react'
import type { Locale } from '../../i18n/locale'
import { GlossaryTip } from '../../components/GlossaryTip'
import { room } from '../../lib/links'
import { MiniWindow, YouLine } from './mocks'

export interface MomentCopy {
  emoji: string
  title: string
  mock: ReactNode
  happening: ReactNode
  youDo: ReactNode
  breathe: ReactNode
  extra?: ReactNode
}

interface FirstDayCopy {
  eyebrow: string
  title: string
  kicker: string
  voiceHappening: string
  voiceYouDo: string
  voiceBreathe: string
  moments: MomentCopy[]
  outroTitle: string
  outroBody: string
  ctaPrompt: string
  ctaDecoder: string
}

const setupChip = (cls: string) => `rounded-full border-[2.5px] border-ink ${cls} px-3 py-1 text-xs font-bold shadow-pop-sm`

const permissionMock = (question: string, kicker: string, allow: string, deny: string) => (
  <div className="rounded-xl border-[2.5px] border-sun bg-plum p-3.5">
    <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-sun">{kicker}</p>
    <p className="mt-1 font-sans text-[0.8rem] font-semibold text-on-plum">{question}</p>
    <div className="mt-2.5 flex gap-2">
      <span className="rounded-full border-2 border-ink bg-sun px-3 py-1 text-[0.7rem] font-bold text-ink">{allow}</span>
      <span className="rounded-full border-2 border-plum-line px-3 py-1 text-[0.7rem] font-bold text-on-plum">{deny}</span>
    </div>
  </div>
)

export const FIRST_DAY_COPY = {
  en: {
    eyebrow: 'the walkthrough',
    title: 'Your First Day',
    kicker:
      'What actually happens between pasting your first prompt and having a real thing — every moment, including the awkward ones. We follow Nadia, building a landing page for her small ceramics business.',
    voiceHappening: "what's happening",
    voiceYouDo: 'what you do',
    voiceBreathe: 'breathe',
    moments: [
      {
        emoji: '🚪',
        title: 'Open your tool — both doors look like this',
        mock: (
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
        ),
        happening: (
          <>
            Underneath, both are the same thing: a conversation. One wears buttons, one wears plain text. The{' '}
            <GlossaryTip k="terminal">terminal</GlossaryTip> is just the chat window with the makeup off.
          </>
        ),
        youDo: (
          <>
            One-time honesty: the tool needs to get onto your computer first. <strong>App path:</strong> download,
            sign in, done. <strong>Terminal path:</strong> one copy-paste install{' '}
            <GlossaryTip k="command">command</GlossaryTip> from the official guide — about five minutes, once — and
            from then on, opening your agent is just typing its name.
          </>
        ),
        breathe:
          'The official guides below walk you through it click by click. Thousands of beginners did this yesterday; none of them broke anything.',
        extra: (
          <>
            <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer" className={setupChip('bg-sun')}>
              Claude Code — official setup guide ↗
            </a>
            <a href="https://developers.openai.com/codex" target="_blank" rel="noreferrer" className={setupChip('bg-paper')}>
              Codex — official setup guide ↗
            </a>
            <a href="../tools/" className={setupChip('bg-paper-deep')}>
              every tool & way in — the Toolshed
            </a>
          </>
        ),
      },
      {
        emoji: '📋',
        title: 'Paste your prompt',
        mock: (
          <MiniWindow tone="light" title="your first message">
            <YouLine>
              Hi! I'm brand new to this. I have a small business and it needs a proper landing page — clear and
              trustworthy. Before you write any code, ask me about it, one question at a time…
            </YouLine>
          </MiniWindow>
        ),
        happening: (
          <>
            Your <GlossaryTip k="prompt">prompt</GlossaryTip> is a normal message — there's no special code-speak
            hiding in it. The good ones just say clearly what you want and how you'd like to be treated.
          </>
        ),
        youDo: "Paste it. Press enter. That's genuinely the whole step.",
        breathe:
          'Sending a message changes nothing on your computer. Words first, permission later — always in that order.',
      },
      {
        emoji: '🙋',
        title: 'It asks YOU questions first',
        mock: (
          <MiniWindow tone="light" title="the interview">
            <p className="font-sans text-[0.78rem]">
              <span className="font-bold text-tangerine">❯</span> Lovely — before I build anything: what's the business
              called, and what do you actually do?
            </p>
            <YouLine>Nadia Ceramics. Handmade bowls and vases, small batches — and I run weekend workshops.</YouLine>
          </MiniWindow>
        ),
        happening:
          "Our starter prompts ask the agent to interview you first — because it can write code, but it can't know your business. This little interview is where the page becomes genuinely yours.",
        youDo: "Answer like you'd text a friend. Short is fine. Honest is better than impressive.",
        breathe: "There are no wrong answers here. It's your page — the agent is taking notes, not grading.",
      },
      {
        emoji: '🪪',
        title: 'The first permission ask',
        mock: permissionMock('Create a new folder called nadia-ceramics?', 'permission needed', 'Allow ✓', 'Not now'),
        happening:
          'This is the moment the test drive rehearsed with you. Before the agent creates or changes anything, the decision comes to you — every time.',
        youDo: "Read what it's asking, then allow it. (Or don't! Saying no does nothing at all, and the agent will simply wait.)",
        breathe: (
          <>
            The <GlossaryTip k="folder">folder</GlossaryTip> it wants to make starts empty. An empty folder has nothing
            to lose — that's your safety net, and it never wears out.
          </>
        ),
      },
      {
        emoji: '🛠️',
        title: 'It works — and narrates',
        mock: (
          <MiniWindow tone="dark" title="the agent, busy">
            <p className="text-term-green">✓ index.html written</p>
            <p className="text-term-green">✓ style.css written</p>
            <p className="italic text-on-plum-dim">· now the workshops section, then how-to-find-you…</p>
          </MiniWindow>
        ),
        happening: (
          <>
            The agent is doing the typing-into-
            <GlossaryTip k="file">files</GlossaryTip> part — the part that used to be the wall. It narrates as it goes,
            like a friendly cooking show.
          </>
        ),
        youDo:
          "Honestly? Watch, or go make tea. If it needs another decision from you, it stops and asks — that's the deal.",
        breathe: "You don't need to understand the narration. 'Looks busy, seems happy' is a complete status check.",
      },
      {
        emoji: '🌐',
        title: 'Open your thing',
        mock: (
          <MiniWindow tone="light" title="your-computer/nadia-ceramics/index.html">
            <div className="rounded-lg bg-[#FFF1E0] p-3 text-center">
              <p className="font-display text-base font-extrabold text-tangerine-deep">NADIA CERAMICS</p>
              <p className="font-sans text-[0.7rem] text-neutral-600">handmade · small-batch · est. her kitchen</p>
              <p className="mt-1 font-sans text-[0.65rem] font-semibold text-neutral-700">
                bowls · vases · weekend workshops
              </p>
            </div>
          </MiniWindow>
        ),
        happening: (
          <>
            Those files became a real page, and your <GlossaryTip k="browser">browser</GlossaryTip> can show it — no
            internet required, it's all on your machine.
          </>
        ),
        youDo:
          "The agent will tell you exactly how to open it — usually as simple as double-clicking index.html in your folder. If you're unsure, ask: “how do I look at it?”",
        breathe:
          "Looking can't break anything. Open it, refresh it, show the cat. This moment is the whole point — enjoy it.",
      },
      {
        emoji: '🔁',
        title: 'Ask for changes — in human words',
        mock: (
          <MiniWindow tone="light" title="the actual workflow">
            <YouLine>
              Can it feel more handmade? And the workshop dates need to jump out — customers keep missing them.
            </YouLine>
            <p className="font-sans text-[0.78rem]">
              <span className="font-bold text-tangerine">❯</span> Done — warmer texture, and the dates now sit in a
              sun-yellow card up top. Refresh and tell me what you feel.
            </p>
          </MiniWindow>
        ),
        happening:
          'This loop — look, react, ask, look again — is the actual craft. Not typing code: noticing what you want and saying it.',
        youDo:
          'Speak human. “Less shouty.” “More like a bakery.” “The photo feels lonely.” Agents are startlingly good at translating feelings into changes.',
        breathe:
          'Nothing is ever final. Every change is just another message, and you can always say “actually, put it back.”',
      },
      {
        emoji: '🟥',
        title: 'When it goes weird',
        mock: (
          <MiniWindow tone="dark" title="a wild error appears">
            <p className="text-[#FF8A7A]">Error: style.css not found (line 12)</p>
            <YouLine>this appeared — what does it mean?</YouLine>
            <p>
              <span className="font-bold text-tangerine">❯</span>{' '}
              <span className="font-sans text-[0.78rem]">Ah, my typo — fixing it now. Nothing is harmed.</span>
            </p>
          </MiniWindow>
        ),
        happening: (
          <>
            Sooner or later, red text appears. An <GlossaryTip k="error">error</GlossaryTip> is a message, not damage —
            the computer saying “I couldn't do that.”
          </>
        ),
        youDo: (
          <>
            Paste it right back and ask what it means. That's not a beginner move — it's what professionals do all day.
            (The{' '}
            <a
              className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4"
              href={room('help').fromSub}
            >
              decoder page
            </a>{' '}
            covers the other weird moments.)
          </>
        ),
        breathe:
          'Your files are exactly where they were. Errors during practice in an empty folder cost you nothing but a sip of tea.',
      },
      {
        emoji: '✋',
        title: 'Saying no — and stopping',
        mock: (
          <MiniWindow tone="dark" title="you're allowed">
            <YouLine>actually, stop for a second</YouLine>
            <p>
              <span className="font-bold text-tangerine">❯</span>{' '}
              <span className="font-sans text-[0.78rem]">
                Stopped. Nothing half-done was saved. What would you like to change?
              </span>
            </p>
          </MiniWindow>
        ),
        happening:
          "You're the boss at every moment, not just at permission time. Every tool has a stop button, and “no” is a complete sentence.",
        youDo: "Say no to anything you don't understand. Ask “why?” as often as you like. Stop entirely whenever you want.",
        breathe:
          "Stopping mid-work leaves your files as they were. The agent doesn't sulk. You can't hurt its feelings — it doesn't have any, just manners.",
      },
      {
        emoji: '🌅',
        title: 'Coming back tomorrow',
        mock: (
          <MiniWindow tone="dark" title="day two">
            <YouLine>let's continue with nadia-ceramics — where were we?</YouLine>
            <p>
              <span className="font-bold text-tangerine">❯</span>{' '}
              <span className="font-sans text-[0.78rem]">
                Welcome back! I see the folder: the page, the workshops card, the find-me block. You wanted a price
                list next.
              </span>
            </p>
          </MiniWindow>
        ),
        happening: (
          <>
            A <GlossaryTip k="session">session</GlossaryTip> is one sitting — the chat may end, but your folder stays
            real. Your work lives in files, not in the conversation.
          </>
        ),
        youDo: "Open your tool, point it at your folder, and say “let's continue.” It looks inside and picks right up.",
        breathe:
          "You made a thing that exists. It will still exist after dinner, after the weekend, after you forget about it for a month. That's what real means.",
      },
    ],
    outroTitle: "That's the whole first day.",
    outroBody:
      'One message, a few honest answers, one Allow, and a loop of “looks great, now make it cozier.” You can do every part of that today.',
    ctaPrompt: 'Grab your first prompt',
    ctaDecoder: 'Keep the decoder handy',
  },
  fr: {
    eyebrow: 'la visite guidée',
    title: 'Ton Premier Jour',
    kicker:
      'Ce qui se passe vraiment entre coller ton premier prompt et avoir un vrai truc — chaque moment, y compris les gênants. On suit Nadia, qui construit une page d’accueil pour sa petite affaire de céramique.',
    voiceHappening: 'ce qui se passe',
    voiceYouDo: 'ce que tu fais',
    voiceBreathe: 'respire',
    moments: [
      {
        emoji: '🚪',
        title: 'Ouvre ton outil — les deux portes ressemblent à ça',
        mock: (
          <div className="grid gap-3">
            <MiniWindow tone="light" title="l’appli">
              <p className="rounded-lg border-2 border-line bg-paper-deep px-2.5 py-1.5 font-sans text-[0.78rem] text-neutral-600">
                Écris à ton agent…
              </p>
            </MiniWindow>
            <MiniWindow tone="dark" title="le terminal">
              <p>
                ❯ <span className="text-tangerine">▍</span>
              </p>
            </MiniWindow>
          </div>
        ),
        happening: (
          <>
            Dessous, les deux sont la même chose : une conversation. L’une porte des boutons, l’autre du texte brut. Le{' '}
            <GlossaryTip k="terminal">terminal</GlossaryTip>, c’est juste la fenêtre de chat sans le maquillage.
          </>
        ),
        youDo: (
          <>
            Une honnêteté à passer une seule fois : l’outil doit d’abord arriver sur ton ordinateur.{' '}
            <strong>Côté appli :</strong> télécharger, se connecter, terminé. <strong>Côté terminal :</strong> une{' '}
            <GlossaryTip k="command">commande</GlossaryTip> d’installation à copier-coller depuis le guide officiel —
            environ cinq minutes, une seule fois — et ensuite, ouvrir ton agent, c’est juste taper son nom.
          </>
        ),
        breathe:
          'Les guides officiels ci-dessous t’accompagnent clic par clic. Des milliers de débutants l’ont fait hier ; aucun n’a rien cassé.',
        extra: (
          <>
            <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer" className={setupChip('bg-sun')}>
              Claude Code — guide officiel (en anglais) ↗
            </a>
            <a href="https://developers.openai.com/codex" target="_blank" rel="noreferrer" className={setupChip('bg-paper')}>
              Codex — guide officiel (en anglais) ↗
            </a>
            <a href="../tools/" className={setupChip('bg-paper-deep')}>
              tous les outils & chemins — la Cabane à Outils
            </a>
          </>
        ),
      },
      {
        emoji: '📋',
        title: 'Colle ton prompt',
        mock: (
          <MiniWindow tone="light" title="ton premier message">
            <YouLine>
              Salut ! Je débute complètement. J’ai une petite activité et il lui faut une vraie page d’accueil — claire
              et digne de confiance. Avant d’écrire le moindre code, pose-moi des questions dessus, une à la fois…
            </YouLine>
          </MiniWindow>
        ),
        happening: (
          <>
            Ton <GlossaryTip k="prompt">prompt</GlossaryTip> est un message normal — aucun langage codé ne s’y cache.
            Les bons disent juste clairement ce que tu veux et comment tu aimerais être accompagné·e.
          </>
        ),
        youDo: 'Colle-le. Appuie sur entrée. C’est sincèrement toute l’étape.',
        breathe:
          'Envoyer un message ne change rien sur ton ordinateur. D’abord les mots, ensuite la permission — toujours dans cet ordre.',
      },
      {
        emoji: '🙋',
        title: 'C’est lui qui TE pose des questions',
        mock: (
          <MiniWindow tone="light" title="l’entretien">
            <p className="font-sans text-[0.78rem]">
              <span className="font-bold text-tangerine">❯</span> Très chouette — avant de construire quoi que ce
              soit : comment s’appelle l’activité, et qu’est-ce que tu fais exactement ?
            </p>
            <YouLine>
              Nadia Céramique. Des bols et des vases faits main, en petites séries — et j’anime des ateliers le
              week-end.
            </YouLine>
          </MiniWindow>
        ),
        happening:
          'Nos prompts de départ demandent à l’agent de t’interviewer d’abord — parce qu’il sait écrire du code, mais il ne peut pas connaître ton activité. Ce petit entretien, c’est là que la page devient vraiment la tienne.',
        youDo: 'Réponds comme tu écrirais à un ami. Court, ça va très bien. Honnête vaut mieux qu’impressionnant.',
        breathe: 'Il n’y a pas de mauvaise réponse ici. C’est ta page — l’agent prend des notes, il ne te note pas.',
      },
      {
        emoji: '🪪',
        title: 'La première demande de permission',
        mock: permissionMock('Créer un nouveau dossier nommé nadia-ceramique ?', 'permission demandée', 'Autoriser ✓', 'Pas maintenant'),
        happening:
          'C’est le moment que le tour d’essai a répété avec toi. Avant que l’agent crée ou change quoi que ce soit, la décision revient vers toi — à chaque fois.',
        youDo: 'Lis ce qu’il demande, puis autorise. (Ou pas ! Dire non ne fait strictement rien, et l’agent attendra simplement.)',
        breathe: (
          <>
            Le <GlossaryTip k="folder">dossier</GlossaryTip> qu’il veut créer démarre vide. Un dossier vide n’a rien à
            perdre — c’est ton filet de sécurité, et il ne s’use jamais.
          </>
        ),
      },
      {
        emoji: '🛠️',
        title: 'Il travaille — et raconte',
        mock: (
          <MiniWindow tone="dark" title="l’agent, au travail">
            <p className="text-term-green">✓ index.html écrit</p>
            <p className="text-term-green">✓ style.css écrit</p>
            <p className="italic text-on-plum-dim">· maintenant la section ateliers, puis comment-me-trouver…</p>
          </MiniWindow>
        ),
        happening: (
          <>
            L’agent fait la partie taper-dans-les-
            <GlossaryTip k="file">fichiers</GlossaryTip> — celle qui était le mur, avant. Il raconte au fur et à mesure,
            comme une émission de cuisine sympathique.
          </>
        ),
        youDo:
          'Honnêtement ? Regarde, ou va te faire un thé. S’il a besoin d’une autre décision de ta part, il s’arrête et demande — c’est le contrat.',
        breathe: 'Tu n’as pas besoin de comprendre la narration. « Ça a l’air occupé, ça a l’air content » est un point d’étape complet.',
      },
      {
        emoji: '🌐',
        title: 'Ouvre ton truc',
        mock: (
          <MiniWindow tone="light" title="ton-ordi/nadia-ceramique/index.html">
            <div className="rounded-lg bg-[#FFF1E0] p-3 text-center">
              <p className="font-display text-base font-extrabold text-tangerine-deep">NADIA CÉRAMIQUE</p>
              <p className="font-sans text-[0.7rem] text-neutral-600">fait main · petites séries · née dans sa cuisine</p>
              <p className="mt-1 font-sans text-[0.65rem] font-semibold text-neutral-700">
                bols · vases · ateliers le week-end
              </p>
            </div>
          </MiniWindow>
        ),
        happening: (
          <>
            Ces fichiers sont devenus une vraie page, et ton <GlossaryTip k="browser">navigateur</GlossaryTip> sait
            l’afficher — pas besoin d’internet, tout est sur ta machine.
          </>
        ),
        youDo:
          'L’agent te dira exactement comment l’ouvrir — souvent un simple double-clic sur index.html dans ton dossier. En cas de doute, demande : « comment je la regarde ? »',
        breathe: 'Regarder ne peut rien casser. Ouvre-la, recharge-la, montre-la au chat. Ce moment est tout l’intérêt — savoure-le.',
      },
      {
        emoji: '🔁',
        title: 'Demande des changements — avec des mots humains',
        mock: (
          <MiniWindow tone="light" title="la vraie méthode">
            <YouLine>
              Ça pourrait faire plus fait-main ? Et il faut que les dates d’ateliers sautent aux yeux — les clientes
              les ratent tout le temps.
            </YouLine>
            <p className="font-sans text-[0.78rem]">
              <span className="font-bold text-tangerine">❯</span> Fait — une texture plus chaleureuse, et les dates
              vivent maintenant dans une carte jaune soleil tout en haut. Recharge et dis-moi ce que ça te fait.
            </p>
          </MiniWindow>
        ),
        happening:
          'Cette boucle — regarder, réagir, demander, re-regarder — c’est le vrai métier. Pas taper du code : remarquer ce que tu veux et le dire.',
        youDo:
          'Parle humain. « Moins criard. » « Plus boulangerie. » « La photo a l’air seule. » Les agents sont étonnamment doués pour traduire des sensations en changements.',
        breathe:
          'Rien n’est jamais définitif. Chaque changement n’est qu’un message de plus, et tu peux toujours dire « en fait, remets comme avant. »',
      },
      {
        emoji: '🟥',
        title: 'Quand ça part en vrille',
        mock: (
          <MiniWindow tone="dark" title="une erreur sauvage apparaît">
            <p className="text-[#FF8A7A]">Error: style.css not found (line 12)</p>
            <YouLine>ça vient d’apparaître — ça veut dire quoi ?</YouLine>
            <p>
              <span className="font-bold text-tangerine">❯</span>{' '}
              <span className="font-sans text-[0.78rem]">Ah, ma coquille — je corrige. Rien n’est abîmé.</span>
            </p>
          </MiniWindow>
        ),
        happening: (
          <>
            Tôt ou tard, du texte rouge apparaît. Une <GlossaryTip k="error">erreur</GlossaryTip> est un message, pas
            un dégât — l’ordinateur qui dit « je n’ai pas réussi ».
          </>
        ),
        youDo: (
          <>
            Recolle-le tel quel et demande ce que ça veut dire. Ce n’est pas un réflexe de débutant — c’est ce que font
            les professionnels toute la journée. (La{' '}
            <a
              className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4"
              href={room('help').fromSub}
            >
              page décodeur
            </a>{' '}
            couvre les autres moments bizarres.)
          </>
        ),
        breathe:
          'Tes fichiers sont exactement là où ils étaient. Une erreur pendant l’entraînement dans un dossier vide ne coûte rien d’autre qu’une gorgée de thé.',
      },
      {
        emoji: '✋',
        title: 'Dire non — et s’arrêter',
        mock: (
          <MiniWindow tone="dark" title="tu as le droit">
            <YouLine>en fait, arrête-toi deux secondes</YouLine>
            <p>
              <span className="font-bold text-tangerine">❯</span>{' '}
              <span className="font-sans text-[0.78rem]">
                Stoppé. Rien d’à moitié fait n’a été enregistré. Qu’est-ce que tu aimerais changer ?
              </span>
            </p>
          </MiniWindow>
        ),
        happening:
          'C’est toi qui commandes à chaque instant, pas seulement au moment des permissions. Chaque outil a un bouton stop, et « non » est une phrase complète.',
        youDo: 'Dis non à tout ce que tu ne comprends pas. Demande « pourquoi ? » aussi souvent que tu veux. Arrête tout quand tu veux.',
        breathe:
          'S’arrêter en plein travail laisse tes fichiers comme ils étaient. L’agent ne boude pas. Tu ne peux pas le vexer — il n’a pas de sentiments, juste des manières.',
      },
      {
        emoji: '🌅',
        title: 'Revenir demain',
        mock: (
          <MiniWindow tone="dark" title="jour deux">
            <YouLine>on continue avec nadia-ceramique — on en était où ?</YouLine>
            <p>
              <span className="font-bold text-tangerine">❯</span>{' '}
              <span className="font-sans text-[0.78rem]">
                Re-bonjour ! Je vois le dossier : la page, la carte ateliers, le bloc me-trouver. Tu voulais une liste
                de prix ensuite.
              </span>
            </p>
          </MiniWindow>
        ),
        happening: (
          <>
            Une <GlossaryTip k="session">session</GlossaryTip>, c’est une séance — la discussion peut se terminer, ton
            dossier reste réel. Ton travail vit dans des fichiers, pas dans la conversation.
          </>
        ),
        youDo: 'Ouvre ton outil, pointe-le vers ton dossier, et dis « on continue ». Il regarde dedans et reprend pile où vous en étiez.',
        breathe:
          'Tu as fait un truc qui existe. Il existera encore après le dîner, après le week-end, après l’avoir oublié un mois entier. C’est ça, « réel ».',
      },
    ],
    outroTitle: 'C’est ça, tout le premier jour.',
    outroBody:
      'Un message, quelques réponses honnêtes, un Autoriser, et une boucle de « super, maintenant rends-le plus douillet ». Tu peux faire chaque partie de ça aujourd’hui.',
    ctaPrompt: 'Va chercher ton premier prompt',
    ctaDecoder: 'Garde le décodeur sous la main',
  },
} satisfies Record<Locale, FirstDayCopy>
