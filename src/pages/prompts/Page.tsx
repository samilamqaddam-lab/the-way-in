import { SubpageShell } from '../../components/SubpageShell'

export function PromptsPage() {
  return (
    <SubpageShell
      page="prompts"
      eyebrow="the library"
      title="The Prompt Pantry"
      kicker="Paste-ready prompts for many more corners of life. The shelves are being stocked."
    >
      <section className="px-5 py-16 text-center">
        <a href="../" className="btn-pop btn-ink">
          ← Back to the way in
        </a>
      </section>
    </SubpageShell>
  )
}
