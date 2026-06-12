import type { ReactNode } from 'react'
import type { Locale } from '../i18n/locale'
import { GlossaryTip } from '../components/GlossaryTip'
import type { Tool } from '../data/tools'

interface QuizResultCopy {
  names: string
  reason: string
}

interface PickYourDoorCopy {
  eyebrow: string
  title: string
  kicker: string
  matchmaker: string
  orBrowse: string
  q1: string
  q1Claude: string
  q1Plus: string
  q1Neither: string
  q2: string
  q2Easiest: string
  q2Free: string
  results: Record<'claude' | 'plus' | 'easiest' | 'free', QuizResultCopy>
  pickSticker: string
  laterSticker: string
  seeCard: string
  startOver: string
  livesLabel: string
  costsLabel: string
  visitSite: string
  /** glossary-woven blurbs that override the plain data blurb */
  richBlurbs: Partial<Record<Tool['id'], ReactNode>>
  bottomA: string
  bottomLink: string
}

export const PICK_YOUR_DOOR_COPY = {
  en: {
    eyebrow: 'tools',
    title: 'Pick your door.',
    kicker: 'Four good tools, no wrong answers — and we earn nothing from these links.',
    matchmaker: 'the 30-second matchmaker',
    orBrowse: 'or just browse below ↓',
    q1: 'Do you already pay for one of these?',
    q1Claude: 'Claude Pro',
    q1Plus: 'ChatGPT Plus',
    q1Neither: 'Neither — or not sure',
    q2: 'What matters most for your first try?',
    q2Easiest: 'The easiest possible start',
    q2Free: "Free — I don't mind a little setup",
    results: {
      claude: {
        names: 'Claude Code',
        reason: 'You already have it — it comes included in Claude Pro, as a friendly app. You could start tonight.',
      },
      plus: {
        names: 'OpenAI Codex',
        reason: 'You already have it — it comes included in ChatGPT Plus and lives right inside ChatGPT.',
      },
      easiest: {
        names: 'Claude Code or Codex',
        reason:
          "Both come as friendly apps, included with their chat subscriptions (Claude Pro or ChatGPT Plus). Pick whichever assistant you'd rather talk to every day.",
      },
      free: {
        names: 'OpenCode',
        reason: 'The tool itself is free — you bring the AI: a subscription you already have, or your own API key.',
      },
    },
    pickSticker: 'our pick for you',
    laterSticker: 'for later',
    seeCard: 'See the card ↓',
    startOver: '↺ start over',
    livesLabel: 'lives',
    costsLabel: 'costs',
    visitSite: 'Visit site ↗',
    richBlurbs: {
      opencode: (
        <>
          A free, <GlossaryTip k="openSource">open-source</GlossaryTip> coding agent. The tool costs nothing — you
          bring the AI: a Claude or ChatGPT subscription you already have, or your own{' '}
          <GlossaryTip k="apiKey">API keys</GlossaryTip>.
        </>
      ),
      hermes: (
        <>
          A free, open-source agent that is <GlossaryTip k="selfHosted">self-hosted</GlossaryTip> — you run it
          yourself. Maximum freedom, a bit more setup.
        </>
      ),
    } as Partial<Record<Tool['id'], ReactNode>>,
    bottomA:
      'In plain words: two of these come included with chat subscriptions you might already pay for. Two are free. Want every way in, side by side? ',
    bottomLink: 'the Toolshed ↗',
  },
  fr: {
    eyebrow: 'les outils',
    title: 'Choisis ta porte.',
    kicker: 'Quatre bons outils, aucune mauvaise réponse — et ces liens ne nous rapportent rien.',
    matchmaker: 'trouve ton outil en 30 secondes',
    orBrowse: 'ou explore en dessous ↓',
    q1: 'Tu paies déjà l’un de ces deux-là ?',
    q1Claude: 'Claude Pro',
    q1Plus: 'ChatGPT Plus',
    q1Neither: 'Aucun des deux — ou pas sûr·e',
    q2: 'Qu’est-ce qui compte le plus pour ton premier essai ?',
    q2Easiest: 'Le départ le plus simple possible',
    q2Free: 'Gratuit — un peu d’installation ne me fait pas peur',
    results: {
      claude: {
        names: 'Claude Code',
        reason: 'Tu l’as déjà — il est inclus dans Claude Pro, sous forme d’appli accueillante. Tu pourrais commencer ce soir.',
      },
      plus: {
        names: 'OpenAI Codex',
        reason: 'Tu l’as déjà — il est inclus dans ChatGPT Plus et vit directement dans ChatGPT.',
      },
      easiest: {
        names: 'Claude Code ou Codex',
        reason:
          'Les deux existent en appli accueillante, incluses avec leur abonnement de chat (Claude Pro ou ChatGPT Plus). Prends celui avec qui tu préfères discuter au quotidien.',
      },
      free: {
        names: 'OpenCode',
        reason: 'L’outil lui-même est gratuit — tu apportes l’IA : un abonnement que tu as déjà, ou ta propre clé API.',
      },
    },
    pickSticker: 'notre choix pour toi',
    laterSticker: 'pour plus tard',
    seeCard: 'Voir la fiche ↓',
    startOver: '↺ recommencer',
    livesLabel: 'habite',
    costsLabel: 'coûte',
    visitSite: 'Voir le site ↗',
    richBlurbs: {
      opencode: (
        <>
          Un agent de code gratuit et <GlossaryTip k="openSource">open source</GlossaryTip>. L’outil ne coûte rien —
          tu apportes l’IA : un abonnement Claude ou ChatGPT que tu as déjà, ou tes propres{' '}
          <GlossaryTip k="apiKey">clés API</GlossaryTip>.
        </>
      ),
      hermes: (
        <>
          Un agent gratuit et open source, <GlossaryTip k="selfHosted">auto-hébergé</GlossaryTip> — tu le fais tourner
          toi-même. Liberté maximale, un peu plus d’installation.
        </>
      ),
    } as Partial<Record<Tool['id'], ReactNode>>,
    bottomA:
      'En clair : deux de ces outils sont inclus dans des abonnements de chat que tu paies peut-être déjà. Deux sont gratuits. Envie de voir toutes les portes côte à côte ? ',
    bottomLink: 'la Cabane à Outils ↗',
  },
} satisfies Record<Locale, PickYourDoorCopy>
