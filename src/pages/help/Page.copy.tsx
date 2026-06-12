import type { ReactNode } from 'react'
import type { Locale } from '../../i18n/locale'
import { GlossaryTip } from '../../components/GlossaryTip'
import { mdnCommandLine } from '../../data/tools'
import { mdnCommandLineFr } from '../../data/fr/tools'

export interface AccordionCopy {
  emoji: string
  q: string
  body: ReactNode
}

interface HelpCopy {
  eyebrow: string
  title: string
  kicker: string
  helpDeskPrompt: string
  accordions: AccordionCopy[]
  thesisTitle: string
  thesisBody: string
  copyLabel: string
  dictTitle: string
  dictSub: string
}

const mdnLinkCls = 'font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4'

export const HELP_COPY = {
  en: {
    eyebrow: 'the decoder',
    title: '“It asked me something weird.”',
    kicker:
      "Whatever just happened in your session, there's a calm answer here. Spoiler for every entry: nothing is broken.",
    helpDeskPrompt: `Please pause and explain what just happened like I'm completely new to this — what you did, what that message means, and what my options are now. Plain words, no jargon.`,
    accordions: [
      {
        emoji: '🪪',
        q: "It's asking permission for something",
        body: (
          <>
            <p>
              That's not a warning — that's the system <strong>working</strong>. Agents ask before they create, change
              or run anything. “Allow” means it may do that one specific thing; “not now” means nothing happens at all.
            </p>
            <p>
              Unsure? Say no and ask: <em>“explain what you want to do and why, in plain words.”</em> You cannot lose
              anything by refusing.
            </p>
          </>
        ),
      },
      {
        emoji: '⌨️',
        q: 'It wants to run a command',
        body: (
          <>
            <p>
              A <GlossaryTip k="command">command</GlossaryTip> is just a typed instruction — “make a folder”, “open
              this page”. Inside your empty practice folder, that's exactly what you hired the agent to do.
            </p>
            <p>
              If it ever wants to run something you don't understand, the magic sentence is:{' '}
              <em>“what will this command do?”</em> — it will happily explain before touching anything. Curious what
              commands really are?{' '}
              <a className={mdnLinkCls} href={mdnCommandLine.url} target="_blank" rel="noreferrer">
                MDN's gentle crash course ↗
              </a>
            </p>
          </>
        ),
      },
      {
        emoji: '🟥',
        q: 'Red text appeared — an error!',
        body: (
          <>
            <p>
              An <GlossaryTip k="error">error</GlossaryTip> is the computer saying “I couldn't do that.” It's a
              message, not damage — nothing on your machine got hurt by it.
            </p>
            <p>
              The professional move (genuinely — it's what programmers do):{' '}
              <em>“this appeared: [paste the red text] — what does it mean and can you fix it?”</em> Fixing errors is
              half of an agent's job.
            </p>
          </>
        ),
      },
      {
        emoji: '📦',
        q: 'It said npm, Node, or “let’s install something”',
        body: (
          <>
            <p>
              <GlossaryTip k="npm">npm</GlossaryTip> is a giant free library of code building-blocks. Bigger projects
              borrow pieces from it; your first projects don't need to — that's why every starter prompt here says “no
              installs”.
            </p>
            <p>
              If an agent suggests installing something, it's not dangerous — it's just a bigger step than you need
              today. <em>”Let's do it without installing anything”</em> is a perfectly good reply, and it will adapt.
            </p>
            <p>
              The one friendly exception: installing <strong>the agent itself</strong>, once — terminal tools arrive
              via a single copy-paste command from their official guide, and the app versions are a normal download.
              Five minutes, then never again.
            </p>
          </>
        ),
      },
      {
        emoji: '🗂️',
        q: "It made files I don't recognize",
        body: (
          <>
            <p>
              Ask it: <em>“what is each file for, in simple words?”</em> — you'll get a friendly tour. Some projects
              include small helper files; that's normal, like the title page of a book.
            </p>
            <p>
              Everything lives inside your project <GlossaryTip k="folder">folder</GlossaryTip>. Nothing is hiding
              elsewhere on your computer.
            </p>
          </>
        ),
      },
      {
        emoji: '🚪',
        q: 'I closed everything — is my work gone?',
        body: (
          <>
            <p>
              No. Your work is <GlossaryTip k="file">files</GlossaryTip> in your folder — it exists whether or not any
              chat window is open. The conversation may end; the folder doesn't.
            </p>
            <p>
              Next time, open your tool and say:{' '}
              <em>“let's continue with the project in the folder my-first-site.”</em> It will look inside and pick
              right up.
            </p>
          </>
        ),
      },
      {
        emoji: '🐌',
        q: "It seems stuck, or it's taking forever",
        body: (
          <>
            <p>
              Thinking pauses are normal — sometimes it's reading, planning, or double-checking. Give a big ask a
              minute or two.
            </p>
            <p>
              Every tool has a stop button, and stopping is always safe: your files stay as they are. Afterwards, ask{' '}
              <em>“where were we?”</em> and carry on.
            </p>
          </>
        ),
      },
      {
        emoji: '🔒',
        q: 'Is this safe? Is it private?',
        body: (
          <>
            <p>
              Honest answer: the messages you type and the files in your project are sent to the AI company — that's
              how the agent thinks. Your <strong>other</strong> files aren't part of the conversation, and agents ask
              before touching anything at all.
            </p>
            <p>
              That's exactly why the empty practice folder is such a good trick: nothing sensitive is ever involved.
              And the one rule worth keeping forever: don't paste passwords or private numbers into any chat — this
              one, or any other.
            </p>
          </>
        ),
      },
      {
        emoji: '🧹',
        q: 'I want to start over',
        body: (
          <>
            <p>
              Delete the project folder. That's it — it's like the whole experiment never happened. Your computer
              doesn't remember it, and no cleanup is needed anywhere else.
            </p>
            <p>
              You can even ask the agent: <em>“delete the project folder, let's start fresh.”</em> It will — after
              asking your permission first, naturally.
            </p>
          </>
        ),
      },
    ],
    thesisTitle: 'The best help desk is the agent itself.',
    thesisBody: 'Whatever just happened — confusion is a perfectly good prompt. Keep this one in your pocket:',
    copyLabel: 'Copy the help-desk prompt',
    dictTitle: 'The little dictionary',
    dictSub: 'Every bit of jargon on this site, each in one friendly sentence.',
  },
  fr: {
    eyebrow: 'le décodeur',
    title: '« Il m’a demandé un truc bizarre. »',
    kicker:
      'Quoi qu’il vienne de se passer dans ta session, il y a une réponse calme ici. Spoiler de chaque entrée : rien n’est cassé.',
    helpDeskPrompt: `Fais une pause et explique-moi ce qui vient de se passer comme si je débutais complètement — ce que tu as fait, ce que ce message veut dire, et quelles sont mes options maintenant. Des mots simples, pas de jargon.`,
    accordions: [
      {
        emoji: '🪪',
        q: 'Il demande la permission pour quelque chose',
        body: (
          <>
            <p>
              Ce n’est pas une alerte — c’est le système qui <strong>fonctionne</strong>. Les agents demandent avant de
              créer, modifier ou lancer quoi que ce soit. « Autoriser » veut dire qu’il peut faire cette seule chose
              précise ; « pas maintenant » veut dire qu’il ne se passe rien du tout.
            </p>
            <p>
              Pas sûr·e ? Dis non et demande : <em>« explique-moi ce que tu veux faire et pourquoi, avec des mots
              simples. »</em> Tu ne peux rien perdre en refusant.
            </p>
          </>
        ),
      },
      {
        emoji: '⌨️',
        q: 'Il veut lancer une commande',
        body: (
          <>
            <p>
              Une <GlossaryTip k="command">commande</GlossaryTip> n’est qu’une instruction tapée — « crée un dossier »,
              « ouvre cette page ». Dans ton dossier d’entraînement vide, c’est exactement ce pour quoi tu as embauché
              l’agent.
            </p>
            <p>
              S’il veut un jour lancer quelque chose que tu ne comprends pas, la phrase magique :{' '}
              <em>« que va faire cette commande ? »</em> — il expliquera volontiers avant de toucher à quoi que ce
              soit. Curieux de ce que sont vraiment les commandes ?{' '}
              <a className={mdnLinkCls} href={mdnCommandLineFr.url} target="_blank" rel="noreferrer">
                le cours accéléré tout doux de MDN ↗
              </a>
            </p>
          </>
        ),
      },
      {
        emoji: '🟥',
        q: 'Du texte rouge est apparu — une erreur !',
        body: (
          <>
            <p>
              Une <GlossaryTip k="error">erreur</GlossaryTip>, c’est l’ordinateur qui dit « je n’ai pas réussi ». C’est
              un message, pas un dégât — rien sur ta machine n’a été abîmé.
            </p>
            <p>
              Le réflexe de pro (vraiment — c’est ce que font les programmeurs) :{' '}
              <em>« ceci est apparu : [colle le texte rouge] — ça veut dire quoi, et tu peux corriger ? »</em> Corriger
              des erreurs, c’est la moitié du métier d’un agent.
            </p>
          </>
        ),
      },
      {
        emoji: '📦',
        q: 'Il a dit npm, Node, ou « installons quelque chose »',
        body: (
          <>
            <p>
              <GlossaryTip k="npm">npm</GlossaryTip> est une immense bibliothèque gratuite de briques de code. Les gros
              projets y empruntent des pièces ; tes premiers projets n’en ont pas besoin — c’est pour ça que chaque
              prompt de départ ici dit « aucune installation ».
            </p>
            <p>
              Si un agent propose d’installer quelque chose, ce n’est pas dangereux — c’est juste un pas plus grand que
              nécessaire aujourd’hui. <em>« Faisons-le sans rien installer »</em> est une très bonne réponse, et il
              s’adaptera.
            </p>
            <p>
              La seule exception sympathique : installer <strong>l’agent lui-même</strong>, une fois — les outils de
              terminal arrivent par une seule commande à copier-coller depuis leur guide officiel, et les versions
              appli sont un téléchargement normal. Cinq minutes, puis plus jamais.
            </p>
          </>
        ),
      },
      {
        emoji: '🗂️',
        q: 'Il a créé des fichiers que je ne reconnais pas',
        body: (
          <>
            <p>
              Demande-lui : <em>« à quoi sert chaque fichier, avec des mots simples ? »</em> — tu auras droit à une
              visite guidée. Certains projets incluent de petits fichiers d’appoint ; c’est normal, comme la page de
              titre d’un livre.
            </p>
            <p>
              Tout vit dans ton <GlossaryTip k="folder">dossier</GlossaryTip> de projet. Rien ne se cache ailleurs sur
              ton ordinateur.
            </p>
          </>
        ),
      },
      {
        emoji: '🚪',
        q: 'J’ai tout fermé — mon travail est perdu ?',
        body: (
          <>
            <p>
              Non. Ton travail, ce sont des <GlossaryTip k="file">fichiers</GlossaryTip> dans ton dossier — il existe,
              qu’une fenêtre de chat soit ouverte ou non. La conversation peut se terminer ; le dossier, non.
            </p>
            <p>
              La prochaine fois, ouvre ton outil et dis :{' '}
              <em>« on continue avec le projet dans le dossier mon-premier-site. »</em> Il regardera dedans et
              reprendra aussitôt.
            </p>
          </>
        ),
      },
      {
        emoji: '🐌',
        q: 'Il a l’air bloqué, ou c’est interminable',
        body: (
          <>
            <p>
              Les pauses de réflexion sont normales — parfois il lit, planifie, ou revérifie. Laisse une à deux minutes
              à une grosse demande.
            </p>
            <p>
              Chaque outil a un bouton stop, et s’arrêter est toujours sans risque : tes fichiers restent comme ils
              sont. Ensuite, demande <em>« on en était où ? »</em> et continue.
            </p>
          </>
        ),
      },
      {
        emoji: '🔒',
        q: 'C’est sûr ? C’est privé ?',
        body: (
          <>
            <p>
              Réponse honnête : les messages que tu tapes et les fichiers de ton projet sont envoyés à l’entreprise
              d’IA — c’est comme ça que l’agent réfléchit. Tes <strong>autres</strong> fichiers ne font pas partie de
              la conversation, et les agents demandent avant de toucher à quoi que ce soit.
            </p>
            <p>
              C’est exactement pour ça que le dossier d’entraînement vide est une si bonne astuce : rien de sensible
              n’est jamais impliqué. Et la règle à garder pour toujours : ne colle jamais de mots de passe ou de
              numéros privés dans un chat — celui-ci ou un autre.
            </p>
          </>
        ),
      },
      {
        emoji: '🧹',
        q: 'Je veux repartir de zéro',
        body: (
          <>
            <p>
              Supprime le dossier du projet. C’est tout — comme si toute l’expérience n’avait jamais eu lieu. Ton
              ordinateur ne s’en souvient pas, et il n’y a aucun ménage à faire ailleurs.
            </p>
            <p>
              Tu peux même demander à l’agent : <em>« supprime le dossier du projet, on repart à neuf. »</em> Il le
              fera — après t’avoir demandé la permission, naturellement.
            </p>
          </>
        ),
      },
    ],
    thesisTitle: 'Le meilleur service d’assistance, c’est l’agent lui-même.',
    thesisBody: 'Quoi qu’il vienne de se passer — la confusion est un très bon prompt. Garde celui-ci dans ta poche :',
    copyLabel: 'Copier le prompt d’assistance',
    dictTitle: 'Le petit dictionnaire',
    dictSub: 'Tout le jargon de ce site, chaque mot en une phrase sympathique.',
  },
} satisfies Record<Locale, HelpCopy>
