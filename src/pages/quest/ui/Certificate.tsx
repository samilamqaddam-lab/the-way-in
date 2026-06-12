import { useEffect, useRef, useState } from 'react'
import { GRIDS, INK, PAPER, SUN, TANGERINE, bake } from '../engine/sprites'
import { SHARDS } from '../data/script'

interface CertificateProps {
  gold: boolean
  score: number
  onReplay: () => void
}

function drawCert(canvas: HTMLCanvasElement, name: string, gold: boolean, score: number) {
  const W = 1200
  const H = 900
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = gold ? '#FFF3D6' : PAPER
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = INK
  ctx.lineWidth = 12
  ctx.strokeRect(24, 24, W - 48, H - 48)
  ctx.lineWidth = 4
  ctx.strokeRect(44, 44, W - 88, H - 88)

  // pixel pip, centered up top
  const pip = bake(GRIDS.pipDown, GRIDS.pipPalette, 8)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(pip, W / 2 - pip.width / 2, 80)

  ctx.fillStyle = INK
  ctx.textAlign = 'center'
  ctx.font = '700 30px "JetBrains Mono Variable", monospace'
  ctx.fillStyle = gold ? '#9a6b00' : TANGERINE
  ctx.fillText(gold ? '★ GOLDEN CERTIFICATE ★' : 'CERTIFICATE', W / 2, 270)

  ctx.fillStyle = INK
  ctx.font = '800 76px "Bricolage Grotesque Variable", sans-serif'
  ctx.fillText('Knowledge Keeper', W / 2, 360)
  ctx.font = '600 32px "Instrument Sans Variable", sans-serif'
  ctx.fillText('of The Way In', W / 2, 408)

  if (name.trim()) {
    ctx.font = '700 44px "Bricolage Grotesque Variable", sans-serif'
    ctx.fillText(name.trim().slice(0, 30), W / 2, 490)
    ctx.strokeStyle = SUN
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(W / 2 - 200, 508)
    ctx.lineTo(W / 2 + 200, 508)
    ctx.stroke()
  }

  ctx.fillStyle = INK
  ctx.font = '500 26px "Instrument Sans Variable", sans-serif'
  ctx.fillText('faced the Data Snatcher and walked out the door', W / 2, name.trim() ? 560 : 500)
  ctx.fillText(`carrying ${score} of ${SHARDS.length} knowledge shards`, W / 2, name.trim() ? 596 : 536)

  // shard row
  ctx.font = '48px serif'
  const shardY = 690
  const startX = W / 2 - (SHARDS.length - 1) * 45
  SHARDS.forEach((s, i) => {
    ctx.globalAlpha = i < score ? 1 : 0.22
    ctx.fillText(s.emoji, startX + i * 90, shardY)
  })
  ctx.globalAlpha = 1

  ctx.font = '500 24px "JetBrains Mono Variable", monospace'
  ctx.fillStyle = '#57503f'
  const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  ctx.fillText(date, W / 2, 790)
  ctx.fillText(window.location.host + ' — agents ask first. you stay the boss.', W / 2, 830)
}

/** The take-home: a client-rendered PNG to download or screenshot. */
export function Certificate({ gold, score, onReplay }: CertificateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    let alive = true
    document.fonts.ready.then(() => {
      if (!alive || !canvasRef.current) return
      drawCert(canvasRef.current, name, gold, score)
      setUrl(canvasRef.current.toDataURL('image/png'))
    })
    return () => {
      alive = false
    }
  }, [name, gold, score])

  return (
    <div className="absolute inset-0 z-30 overflow-y-auto bg-paper p-4 sm:p-6" role="dialog" aria-label="Your certificate">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-2xl font-extrabold">
          {gold ? '★ Flawless. Golden certificate earned.' : 'You made it out — certificate earned.'}
        </p>
        <canvas ref={canvasRef} className="hidden" />
        {url && (
          <img
            src={url}
            alt={`Certificate: Knowledge Keeper of The Way In, ${score} of ${SHARDS.length} shards`}
            className="mt-4 w-full rounded-xl border-[3px] border-ink shadow-pop"
          />
        )}
        <label className="mt-4 block text-left font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
          your name on it? (optional — stays on your device)
          <input
            type="text"
            value={name}
            maxLength={30}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pip's friend"
            className="mt-1.5 w-full rounded-full border-[2.5px] border-ink bg-paper px-4 py-2.5 font-sans text-base font-semibold normal-case tracking-normal"
          />
        </label>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {url && (
            <a href={url} download="pips-quest-certificate.png" className="btn-pop btn-tangerine">
              Download it 📜
            </a>
          )}
          <button type="button" onClick={onReplay} className="btn-pop text-sm">
            ↺ wander the valley again
          </button>
        </div>
        <p className="mt-3 font-mono text-xs text-ink-soft">or just screenshot it — that's what screenshots are for.</p>
        <p className="mt-5 text-sm text-ink-soft">
          Ready for the real thing?{' '}
          <a href="../prompts/" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
            Grab a prompt from the Pantry →
          </a>
        </p>
      </div>
    </div>
  )
}
