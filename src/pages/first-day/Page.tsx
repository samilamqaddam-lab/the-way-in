import { SubpageShell } from '../../components/SubpageShell'

export function FirstDayPage() {
  return (
    <SubpageShell
      page="first-day"
      eyebrow="the walkthrough"
      title="Your First Day"
      kicker="An honest, moment-by-moment walkthrough of your first agent session. Being written now."
    >
      <section className="px-5 py-16 text-center">
        <a href="../#first-prompts" className="btn-pop btn-ink">
          ← Grab a first prompt
        </a>
      </section>
    </SubpageShell>
  )
}
