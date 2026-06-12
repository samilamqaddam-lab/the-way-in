import { useEffect, useRef, useState } from 'react'
import { GRIDS, INK, PAPER, SUN, TANGERINE, bake } from '../engine/sprites'
import { SHARDS } from '../data/script'
import { useLocale } from '../../../i18n/locale'
import type { Locale } from '../../../i18n/locale'

interface CertificateProps {
  gold: boolean
  score: number
  onReplay: () => void
}

const CERT_COPY = {
  en: {
    goldRibbon: '★ GOLDEN CERTIFICATE ★',
    ribbon: 'CERTIFICATE',
    keeper: 'Knowledge Keeper',
    ofSite: 'of The Way In',
    faced: 'faced the Data Snatcher and walked out the door',
    carrying: (score: number, total: number) => `carrying ${score} of ${total} knowledge shards`,
    dateLocale: 'en-US',
    hostLine: ' — agents ask first. you stay the boss.',
    titleGold: '★ Flawless. Golden certificate earned.',
    titleWon: 'You made it out — certificate earned.',
    imgAlt: (score: number, total: number) => `Certificate: Knowledge Keeper of The Way In, ${score} of ${total} shards`,
    nameLabel: 'your name on it? (optional — stays on your device)',
    namePlaceholder: "Pip's friend",
    download: 'Download it 📜',
    fileName: 'pips-quest-certificate.png',
    replay: '↺ wander the valley again',
    screenshot: "or just screenshot it — that's what screenshots are for.",
    readyA: 'Ready for the real thing? ',
    readyLink: 'Grab a prompt from the Pantry →',
  },
  fr: {
    goldRibbon: '★ CERTIFICAT DORÉ ★',
    ribbon: 'CERTIFICAT',
    keeper: 'Gardien·ne du Savoir',
    ofSite: 'de The Way In',
    faced: 'a affronté le Chapardeur de Données et a passé la porte',
    carrying: (score: number, total: number) => `avec ${score} éclat${score === 1 ? '' : 's'} de savoir sur ${total}`,
    dateLocale: 'fr-FR',
    hostLine: ' — les agents demandent d’abord. tu restes aux commandes.',
    titleGold: '★ Sans faute. Certificat doré décroché.',
    titleWon: 'Tu es sorti·e — certificat décroché.',
    imgAlt: (score: number, total: number) => `Certificat : Gardien·ne du Savoir de The Way In, ${score} éclats sur ${total}`,
    nameLabel: 'ton nom dessus ? (optionnel — reste sur ton appareil)',
    namePlaceholder: 'l’ami·e de Pip',
    download: 'Télécharger 📜',
    fileName: 'certificat-quete-de-pip.png',
    replay: '↺ repartir flâner dans la vallée',
    screenshot: 'ou fais une capture d’écran — c’est fait pour ça.',
    readyA: 'Prêt·e pour la vraie aventure ? ',
    readyLink: 'Prends un prompt dans la Réserve →',
  },
} satisfies Record<Locale, Record<string, string | ((...a: number[]) => string)>>

type CertCopy = (typeof CERT_COPY)['en']

function drawCert(canvas: HTMLCanvasElement, name: string, gold: boolean, score: number, t: CertCopy) {
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
  ctx.fillText(gold ? t.goldRibbon : t.ribbon, W / 2, 270)

  ctx.fillStyle = INK
  ctx.font = '800 76px "Bricolage Grotesque Variable", sans-serif'
  ctx.fillText(t.keeper, W / 2, 360)
  ctx.font = '600 32px "Instrument Sans Variable", sans-serif'
  ctx.fillText(t.ofSite, W / 2, 408)

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
  ctx.fillText(t.faced, W / 2, name.trim() ? 560 : 500)
  ctx.fillText(t.carrying(score, SHARDS.length), W / 2, name.trim() ? 596 : 536)

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
  const date = new Date().toLocaleDateString(t.dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })
  ctx.fillText(date, W / 2, 790)
  ctx.fillText(window.location.host + t.hostLine, W / 2, 830)
}

/** The take-home: a client-rendered PNG to download or screenshot. */
export function Certificate({ gold, score, onReplay }: CertificateProps) {
  const t = CERT_COPY[useLocale()]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    let alive = true
    document.fonts.ready.then(() => {
      if (!alive || !canvasRef.current) return
      drawCert(canvasRef.current, name, gold, score, t)
      setUrl(canvasRef.current.toDataURL('image/png'))
    })
    return () => {
      alive = false
    }
  }, [name, gold, score, t])

  return (
    <div className="absolute inset-0 z-30 overflow-y-auto bg-paper p-4 sm:p-6" role="dialog" aria-label={t.keeper}>
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-2xl font-extrabold">{gold ? t.titleGold : t.titleWon}</p>
        <canvas ref={canvasRef} className="hidden" />
        {url && (
          <img src={url} alt={t.imgAlt(score, SHARDS.length)} className="mt-4 w-full rounded-xl border-[3px] border-ink shadow-pop" />
        )}
        <label className="mt-4 block text-left font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
          {t.nameLabel}
          <input
            type="text"
            value={name}
            maxLength={30}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="mt-1.5 w-full rounded-full border-[2.5px] border-ink bg-paper px-4 py-2.5 font-sans text-base font-semibold normal-case tracking-normal"
          />
        </label>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {url && (
            <a href={url} download={t.fileName} className="btn-pop btn-tangerine">
              {t.download}
            </a>
          )}
          <button type="button" onClick={onReplay} className="btn-pop text-sm">
            {t.replay}
          </button>
        </div>
        <p className="mt-3 font-mono text-xs text-ink-soft">{t.screenshot}</p>
        <p className="mt-5 text-sm text-ink-soft">
          {t.readyA}
          <a href="../prompts/" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
            {t.readyLink}
          </a>
        </p>
      </div>
    </div>
  )
}
