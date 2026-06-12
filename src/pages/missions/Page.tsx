import { SubpageShell } from '../../components/SubpageShell'

export function MissionsPage() {
  return (
    <SubpageShell
      page="missions"
      eyebrow="play"
      title="The Mission Deck"
      kicker="More zero-risk test drives are being scripted. The classics are on the home page."
    >
      <section className="px-5 py-16 text-center">
        <a href="../#test-drive" className="btn-pop btn-ink">
          ← Play the classics
        </a>
      </section>
    </SubpageShell>
  )
}
