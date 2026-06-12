import type { ReactNode } from 'react'
import type { Locale } from '../i18n/locale'
import { GlossaryTip } from '../components/GlossaryTip'

interface NothingToBreakCopy {
  eyebrow: string
  title: string
  kicker: string
  factSticker: string
  facts: { title: string; body: ReactNode }[]
  stillNervous: string
  buttons: string[]
  toasts: string[]
}

export const NOTHING_TO_BREAK_COPY = {
  en: {
    eyebrow: 'the big fear',
    title: '“What if I break something?”',
    kicker: 'The most sensible question in the world. Three honest answers:',
    factSticker: 'fact',
    facts: [
      {
        title: 'Agents ask first.',
        body: (
          <>
            You felt it in the test drive — you clicked Allow yourself. Real agents work the same way: before anything
            is created or changed, the question comes to you. And “no” always works.
          </>
        ),
      },
      {
        title: 'You practice in an empty folder.',
        body: (
          <>
            Your first projects live in a brand-new <GlossaryTip k="folder">folder</GlossaryTip> — a fresh box with
            nothing else inside. Empty means nothing to lose.
          </>
        ),
      },
      {
        title: 'Worst case? Delete it.',
        body: (
          <>
            If a practice project gets weird, you delete that one folder and it's like it never happened. Your photos,
            your <GlossaryTip k="file">files</GlossaryTip>, the rest of your computer — simply not involved.
          </>
        ),
      },
    ],
    stillNervous: 'still nervous? get it out of your system:',
    buttons: ['Go on. Try to break something.', 'Try harder.', 'One more, for luck.'],
    toasts: [
      'Nothing broke. Nothing can break — this is just a webpage. And your practice folder works the same way: empty means safe.',
      "Still nothing. That's the whole trick — start empty, and there's nothing to lose.",
      "Okay — you've now officially broken… nothing. You're ready. 💛",
    ],
  },
  fr: {
    eyebrow: 'la grande peur',
    title: '« Et si je casse quelque chose ? »',
    kicker: 'La question la plus sensée du monde. Trois réponses honnêtes :',
    factSticker: 'fait',
    facts: [
      {
        title: 'Les agents demandent d’abord.',
        body: (
          <>
            Tu l’as senti pendant le tour d’essai — c’est toi qui as cliqué Autoriser. Les vrais agents marchent
            pareil : avant de créer ou de changer quoi que ce soit, la question revient vers toi. Et “non” marche
            toujours.
          </>
        ),
      },
      {
        title: 'Tu t’entraînes dans un dossier vide.',
        body: (
          <>
            Tes premiers projets vivent dans un <GlossaryTip k="folder">dossier</GlossaryTip> tout neuf — une boîte
            fraîche, avec rien d’autre dedans. Vide, ça veut dire rien à perdre.
          </>
        ),
      },
      {
        title: 'Au pire ? Supprime-le.',
        body: (
          <>
            Si un projet d’entraînement part en vrille, tu supprimes ce dossier-là et c’est comme si rien ne s’était
            passé. Tes photos, tes <GlossaryTip k="file">fichiers</GlossaryTip>, le reste de ton ordinateur —
            simplement pas concernés.
          </>
        ),
      },
    ],
    stillNervous: 'toujours pas rassuré·e ? défoule-toi :',
    buttons: ['Vas-y. Essaie de casser quelque chose.', 'Essaie plus fort.', 'Une dernière, pour la route.'],
    toasts: [
      'Rien n’a cassé. Rien ne peut casser — c’est juste une page web. Et ton dossier d’entraînement marche pareil : vide veut dire sans risque.',
      'Toujours rien. C’est toute l’astuce — commence vide, et il n’y a rien à perdre.',
      'Bon — officiellement, tu as cassé… rien du tout. Tu es prêt·e. 💛',
    ],
  },
} satisfies Record<Locale, NothingToBreakCopy>
