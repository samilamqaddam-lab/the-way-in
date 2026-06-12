import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

interface Options {
  /** characters per second */
  cps?: number
  /** when false, the full text renders immediately */
  enabled?: boolean
  onDone?: () => void
}

/**
 * rAF-driven typewriter. Under prefers-reduced-motion (or enabled=false)
 * the full text appears instantly. `skip()` completes the line at once.
 */
export function useTypewriter(text: string, { cps = 48, enabled = true, onDone }: Options = {}) {
  const reduced = useReducedMotion()
  const instant = !enabled || !!reduced
  const [count, setCount] = useState(() => (instant ? text.length : 0))
  const firedRef = useRef(false)
  const skippedRef = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const skip = useCallback(() => {
    skippedRef.current = true
    setCount(text.length)
  }, [text])

  useEffect(() => {
    firedRef.current = false
    skippedRef.current = false
    if (instant) {
      setCount(text.length)
      return
    }
    setCount(0)
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      if (skippedRef.current) return
      const target = Math.min(text.length, Math.floor(((now - start) / 1000) * cps))
      setCount((prev) => (target > prev ? target : prev))
      if (target < text.length) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, cps, instant])

  const done = count >= text.length
  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true
      onDoneRef.current?.()
    }
  }, [done])

  return { shown: text.slice(0, count), done, skip }
}
