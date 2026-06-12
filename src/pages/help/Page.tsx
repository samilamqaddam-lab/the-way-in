import { SubpageShell } from '../../components/SubpageShell'

export function HelpPage() {
  return (
    <SubpageShell
      page="help"
      eyebrow="the decoder"
      title="“It asked me something weird.”"
      kicker="Calm answers for confusing moments. This room is being furnished."
    >
      <section className="px-5 py-16 text-center">
        <a href="../" className="btn-pop btn-ink">
          ← Back to the way in
        </a>
      </section>
    </SubpageShell>
  )
}
