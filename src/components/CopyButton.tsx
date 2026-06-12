import { useEffect, useRef, useState } from 'react'
import { ConfettiBurst } from './ConfettiBurst'
import { useLocale } from '../i18n/locale'
import type { Locale } from '../i18n/locale'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

const COPY = {
  en: {
    label: 'Copy this prompt',
    copied: '✓ Copied — now paste it into your agent',
    sr: 'Prompt copied to clipboard.',
    fail: "Couldn't auto-copy here — press and hold the prompt text to copy it yourself.",
  },
  fr: {
    label: 'Copier ce prompt',
    copied: '✓ Copié — colle-le maintenant dans ton agent',
    sr: 'Prompt copié dans le presse-papiers.',
    fail: 'Impossible de copier automatiquement ici — reste appuyé sur le texte du prompt pour le copier toi-même.',
  },
} satisfies Record<Locale, { label: string; copied: string; sr: string; fail: string }>

type Status = 'idle' | 'copied' | 'fail'

async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    return
  } catch {
    // Older browsers / non-secure contexts: textarea fallback
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    if (!ok) throw new Error('copy failed')
  }
}

/** One-click copy with a joyful success state and screen-reader announcement. */
export function CopyButton({ text, label, className = '' }: CopyButtonProps) {
  const t = COPY[useLocale()]
  const [status, setStatus] = useState<Status>('idle')
  const [burst, setBurst] = useState(0)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const onCopy = async () => {
    window.clearTimeout(timerRef.current)
    try {
      await copyToClipboard(text)
      setStatus('copied')
      setBurst((b) => b + 1)
      timerRef.current = window.setTimeout(() => setStatus('idle'), 2800)
    } catch {
      setStatus('fail')
      timerRef.current = window.setTimeout(() => setStatus('idle'), 4500)
    }
  }

  return (
    <span className={`relative block ${className}`}>
      <button
        type="button"
        onClick={onCopy}
        className={`btn-pop w-full ${status === 'copied' ? 'btn-sun' : 'btn-tangerine'}`}
      >
        {status === 'copied' ? t.copied : (label ?? t.label)}
      </button>
      <ConfettiBurst trigger={burst} count={14} />
      <span aria-live="polite" className="sr-only">
        {status === 'copied' ? t.sr : ''}
      </span>
      {status === 'fail' && <span className="mt-2 block text-center text-sm text-ink-soft">{t.fail}</span>}
    </span>
  )
}
