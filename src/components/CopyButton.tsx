import { useEffect, useRef, useState } from 'react'
import { ConfettiBurst } from './ConfettiBurst'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

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
export function CopyButton({ text, label = 'Copy this prompt', className = '' }: CopyButtonProps) {
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
        {status === 'copied' ? '✓ Copied — now paste it into your agent' : label}
      </button>
      <ConfettiBurst trigger={burst} count={14} />
      <span aria-live="polite" className="sr-only">
        {status === 'copied' ? 'Prompt copied to clipboard.' : ''}
      </span>
      {status === 'fail' && (
        <span className="mt-2 block text-center text-sm text-ink-soft">
          Couldn't auto-copy here — press and hold the prompt text to copy it yourself.
        </span>
      )}
    </span>
  )
}
