import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { Wordmark } from '../../components/Wordmark'
import { popSpring } from '../../lib/motion'
import { Game } from './engine/Game'
import type { Dir } from './engine/Game'
import type { EntityDef } from './data/maps'
import { DIALOGS, SHARDS } from './data/script'
import type { DialogRun } from './data/script'
import { Dialogue } from './ui/Dialogue'
import { ShardBar, TouchPad } from './ui/Hud'
import { BossQuiz } from './ui/BossQuiz'
import type { BossResult } from './ui/BossQuiz'
import { Certificate } from './ui/Certificate'

const STORE_KEY = 'pip-quest-v1'

function loadShards(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as { shards?: string[] }
    return new Set((parsed.shards ?? []).filter((id) => SHARDS.some((s) => s.id === id)))
  } catch {
    return new Set()
  }
}

function saveShards(shards: Set<string>) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify({ shards: [...shards] }))
  } catch {
    /* private mode — progress just won't persist */
  }
}

const KEY_DIRS: Record<string, Dir> = {
  ArrowDown: 'down',
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyS: 'down',
  KeyW: 'up',
  KeyA: 'left',
  KeyD: 'right',
}

export function QuestPage() {
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)

  const frameRef = useRef<HTMLDivElement>(null)
  const [shards, setShards] = useState<Set<string>>(() => loadShards())
  const [dialog, setDialog] = useState<{ run: DialogRun; n: number } | null>(null)
  const [boss, setBoss] = useState(false)
  const [cert, setCert] = useState<{ gold: boolean; score: number } | null>(null)
  const [sad, setSad] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [fading, setFading] = useState(false)
  const [mapId, setMapId] = useState('valley')
  const [fs, setFs] = useState(false)
  const [fsSupported, setFsSupported] = useState(false)
  const [tutorial, setTutorial] = useState(() => {
    try {
      return window.localStorage.getItem('pip-quest-tutorial') !== 'done'
    } catch {
      return true
    }
  })
  const mapIdRef = useRef(mapId)
  mapIdRef.current = mapId

  const shardsRef = useRef(shards)
  shardsRef.current = shards
  const overlayRef = useRef(false)

  const overlay = !!(dialog || boss || cert || sad !== null || tutorial)
  overlayRef.current = overlay

  const dismissTutorial = () => {
    setTutorial(false)
    try {
      window.localStorage.setItem('pip-quest-tutorial', 'done')
    } catch {
      /* fine */
    }
  }

  /* ── game lifecycle ──────────────────────────────────────────────────── */

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const game = new Game(
      canvas,
      {
        onInteract: (def: EntityDef) => {
          const has = (id: string) => shardsRef.current.has(id)
          let id = def.dialog
          if (def.id === 'bubbles' && has('language')) id = 'bubblesAfter'
          if (def.id === 'termi' && has('terminal')) id = 'termiAfter'
          const run = DIALOGS[id]
          if (run) setDialog((d) => ({ run, n: (d?.n ?? 0) + 1 }))
        },
        onExitDoor: () => {
          if (overlayRef.current) return
          if (shardsRef.current.size === SHARDS.length) setBoss(true)
          else setDialog((d) => ({ run: DIALOGS.exitNeedShards, n: (d?.n ?? 0) + 1 }))
        },
        onMapChange: (id: string) => {
          setMapId(id)
          setFading(true)
          window.setTimeout(() => setFading(false), 240)
        },
      },
      !!reduced,
    )
    game.setShards(shardsRef.current)
    game.start()
    gameRef.current = game

    const onVis = () => {
      if (document.hidden) game.stop()
      else game.start()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      game.stop()
      gameRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const game = gameRef.current
      if (!game || overlayRef.current) return
      const dir = KEY_DIRS[e.code]
      if (dir) {
        e.preventDefault()
        game.setHeld(dir, true)
      } else if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyE') {
        e.preventDefault()
        game.pressAction()
      }
    }
    const up = (e: KeyboardEvent) => {
      const dir = KEY_DIRS[e.code]
      if (dir) gameRef.current?.setHeld(dir, false)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // pause while any overlay is open
  useEffect(() => {
    const game = gameRef.current
    if (!game) return
    game.paused = overlay
    if (overlay) game.clearInput()
  }, [overlay])

  // shards → game markers + persistence
  useEffect(() => {
    gameRef.current?.setShards(shards)
    saveShards(shards)
  }, [shards])

  // debug hooks for tests & tinkering: /quest/?debug
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('debug')) return
    const w = window as unknown as Record<string, unknown>
    w.__pip = {
      teleport: (map: string, x: number, y: number) => gameRef.current?.teleport(map, x, y),
      grant: () => setShards(new Set(SHARDS.map((s) => s.id))),
      reset: () => setShards(new Set()),
    }
  }, [])

  // fullscreen support + state
  useEffect(() => {
    setFsSupported(!!document.documentElement.requestFullscreen)
    const onFs = () => setFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void frameRef.current?.requestFullscreen().catch(() => setFsSupported(false))
  }

  // tap an empty shard slot → arrow toward where it's earned
  const guideTo = (shardId: string) => {
    const VALLEY_SPOTS: Record<string, { x: number; y: number }> = {
      language: { x: 16, y: 22 },
      terminal: { x: 28, y: 9 },
      apps: { x: 7, y: 13 },
      safety: { x: 21, y: 17 },
      orchestra: { x: 8, y: 7 }, // the office door
    }
    const spot =
      mapIdRef.current === 'office'
        ? shardId === 'orchestra'
          ? { x: 17, y: 4 } // the Chief
          : { x: 10, y: 13 } // back out the door first
        : VALLEY_SPOTS[shardId]
    if (spot) gameRef.current?.setGuide(spot.x, spot.y)
  }

  /* ── flows ───────────────────────────────────────────────────────────── */

  const closeDialog = () => {
    const run = dialog?.run
    setDialog(null)
    if (run?.grantsShard && !shards.has(run.grantsShard)) {
      const def = SHARDS.find((s) => s.id === run.grantsShard)
      const next = new Set([...shards, run.grantsShard])
      setShards(next)
      if (next.size === SHARDS.length) {
        // the collection is complete — point straight at the guardian's door
        setToast('✨ all five shards! follow the arrow to the EXIT…')
        window.setTimeout(() => setToast(null), 3600)
        if (mapIdRef.current === 'valley') gameRef.current?.setGuide(30, 1)
        else gameRef.current?.setGuide(10, 13)
      } else if (def) {
        setToast(`${def.emoji} shard collected — ${def.title}`)
        window.setTimeout(() => setToast(null), 2600)
      }
    }
  }

  const onBossDone = (result: BossResult) => {
    setBoss(false)
    if (result.won) {
      setCert({ gold: result.gold, score: result.remaining.length })
    } else {
      setShards(new Set(result.remaining))
      setSad(result.remaining.length)
    }
  }

  const shardList = useMemo(() => [...shards], [shards])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden="true" />
      <header className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-4 pt-5">
        <a href="../" className="inline-flex items-center gap-1.5">
          <span aria-hidden="true">←</span> <Wordmark />
        </a>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-16">
        <div className="mt-4 text-center">
          <h1 className="font-display text-[clamp(1.9rem,6vw,2.8rem)] font-extrabold leading-tight">Pip's Quest</h1>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">
            Collect the five knowledge shards. Mind the door. <span className="whitespace-nowrap">Nothing here is real — even the monster.</span>
          </p>
        </div>

        {/* the screen */}
        <div
          ref={frameRef}
          className={`relative mx-auto mt-5 overflow-hidden rounded-[1.2rem] border-[3px] border-ink bg-plum-deep shadow-pop-lg ${
            fs ? 'flex items-center justify-center rounded-none border-0' : ''
          }`}
        >
          <canvas
            ref={canvasRef}
            className="block"
            style={
              fs
                ? { imageRendering: 'pixelated', aspectRatio: '4 / 3', height: '100%', maxHeight: '100vh', maxWidth: '100vw' }
                : { imageRendering: 'pixelated', aspectRatio: '4 / 3', width: '100%' }
            }
            aria-label="Pip's Quest — a tiny pixel world. Walk with the arrow keys, talk with Enter."
          />

          {/* in-screen quest HUD */}
          <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
            <ShardBar collected={shards} onGuide={guideTo} />
          </div>
          <div className="absolute right-2 top-2 z-10 flex gap-1.5">
            <button
              type="button"
              onClick={() => setTutorial(true)}
              aria-label="How to play"
              className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink/60 bg-plum-deep/80 font-mono text-sm text-on-plum hover:border-sun"
            >
              ?
            </button>
            {fsSupported && (
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={fs ? 'Exit fullscreen' : 'Play fullscreen'}
                className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink/60 bg-plum-deep/80 font-mono text-sm text-on-plum hover:border-sun"
              >
                {fs ? '🗗' : '⛶'}
              </button>
            )}
          </div>

          <TouchPad
            onDir={(dir, downHeld) => gameRef.current?.setHeld(dir, downHeld)}
            onAction={() => gameRef.current?.pressAction()}
          />
          <AnimatePresence>
            {fading && !reduced && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="pointer-events-none absolute inset-0 bg-plum-deep"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {toast && (
              <motion.p
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={popSpring}
                className="absolute left-1/2 top-12 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border-[2.5px] border-ink bg-sun px-3.5 py-1.5 font-mono text-xs font-bold shadow-pop-sm"
                role="status"
              >
                {toast}
              </motion.p>
            )}
          </AnimatePresence>

          {/* first-launch tutorial — one card, one button, never again */}
          {tutorial && (
            <div className="absolute inset-0 z-30 grid place-items-center bg-plum-deep/92 p-4" role="dialog" aria-label="How to play">
              <div className="w-full max-w-sm rounded-xl border-[3px] border-sun bg-plum p-5 text-on-plum">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sun">how to play</p>
                <ul className="mt-3 space-y-2.5 text-sm leading-snug">
                  <li>
                    <strong>🚶 Walk</strong> — arrow keys or WASD <span className="text-on-plum-dim">(or the D-pad on touch)</span>
                  </li>
                  <li>
                    <strong>💬 Talk</strong> — stand face-to-face with someone, press <strong>Enter</strong>, <strong>Space</strong> or the{' '}
                    <strong>A</strong> button
                  </li>
                  <li>
                    <strong>🎯 Goal</strong> — collect all five knowledge shards. Tap a <strong>?</strong> chip at the top and an
                    arrow shows you the way.
                  </li>
                  <li className="text-on-plum-dim">Then mind the big door. Something lives behind it.</li>
                </ul>
                <button type="button" onClick={dismissTutorial} className="btn-pop btn-sun mt-4 w-full">
                  Got it — let's go ▸
                </button>
              </div>
            </div>
          )}

          {dialog && <Dialogue key={`${dialog.run.id}-${dialog.n}`} run={dialog.run} onClose={closeDialog} />}
          {boss && <BossQuiz shardsAtStart={shardList} onDone={onBossDone} />}
          {cert && <Certificate gold={cert.gold} score={cert.score} onReplay={() => setCert(null)} />}

          {sad !== null && (
            <div className="absolute inset-0 z-30 grid place-items-center bg-plum-deep/95 p-5" role="dialog" aria-label="The sad ending">
              <div className="max-w-sm text-center text-on-plum">
                <p className="text-4xl" aria-hidden="true">
                  🌧️
                </p>
                <p className="mt-2 font-display text-xl font-extrabold">The Snatcher kept your shards.</p>
                <p className="mt-2 text-sm text-on-plum-dim">
                  Pip trudges out with {sad} shard{sad === 1 ? '' : 's'}. The valley folk will gladly share their
                  knowledge again — and the door isn't going anywhere.
                </p>
                <button type="button" onClick={() => setSad(null)} className="btn-pop btn-sun mt-4">
                  Back to the valley
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 hidden text-center font-mono text-xs text-ink-soft [@media(pointer:fine)]:block">
          walk: arrow keys or WASD · talk: Enter, Space or E
        </p>
        <p className="mt-3 text-center font-mono text-[0.68rem] text-ink-soft">
          a game about agents, itself fully scripted · progress saved on this device only ·{' '}
          <button
            type="button"
            className="underline decoration-dotted underline-offset-2 hover:text-ink"
            onClick={() => {
              setShards(new Set())
              gameRef.current?.teleport('valley', 17, 22)
            }}
          >
            start over
          </button>
        </p>

        <p className="mx-auto mt-8 max-w-md text-center text-sm text-ink-soft">
          Done playing? The real adventure takes one paste:{' '}
          <a href="../prompts/" className="font-semibold text-ink underline decoration-tangerine decoration-[3px] underline-offset-4">
            the Prompt Pantry →
          </a>
        </p>
      </main>
    </MotionConfig>
  )
}
