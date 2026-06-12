import { useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Pip } from '../../components/Pip'
import { popIn } from '../../lib/motion'
import { useLocale } from '../../i18n/locale'
import { MissionPicker } from './MissionPicker'
import { Terminal } from './Terminal'
import { FileTree } from './FileTree'
import { Preview } from './Preview'
import { AUTO_DELAY, PAUSE_DELAY, driveReducer, initialDrive } from './engine'
import type { DriveState } from './engine'
import { TEST_DRIVE_COPY } from './copy'
import type { Beat, Mission } from '../../data/missions'

type Copy = (typeof TEST_DRIVE_COPY)['en']

function annotation(t: Copy, state: DriveState, beatKind: Beat['kind'] | undefined): string {
  if (state.status === 'done') return t.noteDone
  switch (state.awaiting) {
    case 'send':
      return t.noteSend
    case 'typing':
      return t.noteTyping
    case 'permission':
      return t.notePermission
    case 'auto':
    case 'pause':
      if (beatKind === 'filesAppear' || beatKind === 'previewStage') return t.noteWatch
      return t.noteFiddly
    default:
      return ' '
  }
}

interface DriveWindowProps {
  missions: Mission[]
  /** preselect a mission (e.g. from a ?m= link); ignored when unknown */
  initialMissionId?: string | null
  /** CTA shown when a mission finishes */
  doneCta?: (mission: Mission) => { href: string; label: string } | null
  /** link target for the clickable preview pane */
  previewHref?: (mission: Mission) => string | null
  /** extra element rendered in the controls row (e.g. “more missions ↗”) */
  extraControls?: ReactNode
}

/**
 * The full scripted agent session: mission picker, friendly-dark window
 * (terminal + files + preview), annotation line and controls. Pure theater,
 * shared by the home Test Drive section and the Mission Deck page.
 */
export function DriveWindow({ missions, initialMissionId, doneCta, previewHref, extraControls }: DriveWindowProps) {
  const t = TEST_DRIVE_COPY[useLocale()]
  const [state, dispatch] = useReducer(driveReducer, initialDrive)
  const beat = state.mission?.beats[state.cursor]

  // optional deep-linked mission
  useEffect(() => {
    if (!initialMissionId) return
    const mission = missions.find((m) => m.id === initialMissionId)
    if (mission) dispatch({ type: 'PICK', mission })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [])

  // Enter the current beat exactly once
  useEffect(() => {
    if (state.status === 'playing' && state.awaiting === null && state.entered !== state.cursor) {
      dispatch({ type: 'ENTER' })
    }
  }, [state.status, state.awaiting, state.entered, state.cursor])

  // Auto-advance the non-interactive beats
  useEffect(() => {
    if (state.awaiting !== 'auto' && state.awaiting !== 'pause') return
    const delay = state.awaiting === 'pause' ? PAUSE_DELAY : (AUTO_DELAY[beat?.kind ?? ''] ?? 800)
    const t = window.setTimeout(() => dispatch({ type: 'STEP' }), delay)
    return () => window.clearTimeout(t)
  }, [state.awaiting, state.cursor, beat])

  const working = state.awaiting === 'auto' || state.awaiting === 'pause'
  const cta = state.status === 'done' && state.mission && doneCta ? doneCta(state.mission) : null

  if (state.status === 'picking' || !state.mission) {
    return <MissionPicker missions={missions} onPick={(mission) => dispatch({ type: 'PICK', mission })} />
  }

  return (
    <motion.div variants={popIn} initial="hidden" animate="show" className="on-dark mx-auto max-w-5xl">
      <div className="relative">
        <div className="absolute -top-9 right-10 hidden sm:block" aria-hidden="true">
          <Pip
            size={58}
            tone="tangerine"
            look={working ? 'down' : 'ahead'}
            mood={state.status === 'done' ? 'cheer' : 'idle'}
          />
        </div>
        <div className="relative overflow-hidden rounded-[1.7rem] border-[3px] border-ink bg-plum text-on-plum shadow-pop-lg">
          <div className="flex items-center gap-2 border-b-[3px] border-plum-line px-4 py-3 sm:px-5">
            <span className="h-3 w-3 rounded-full bg-blush" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-sun" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-leaf" aria-hidden="true" />
            <span className="flex-1 text-center font-mono text-xs text-on-plum-dim">
              {t.windowTitle} {state.mission.emoji}
            </span>
            <span className="w-12" aria-hidden="true" />
          </div>
          <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
            <Terminal
              log={state.log}
              awaiting={state.awaiting}
              beat={beat}
              denies={state.denies}
              skipSignal={state.skipSignal}
              onSend={() => dispatch({ type: 'SEND' })}
              onAllow={() => dispatch({ type: 'ALLOW' })}
              onDeny={() => dispatch({ type: 'DENY' })}
              onSkip={() => dispatch({ type: 'SKIP' })}
              onTyped={() => dispatch({ type: 'TYPED' })}
            />
            <div className="flex flex-col gap-4 border-t-[3px] border-plum-line p-4 sm:p-5 lg:border-l-[3px] lg:border-t-0">
              <FileTree folder={state.mission.folder} created={state.folderCreated} files={state.files} />
              <Preview
                missionId={state.mission.id}
                folder={state.mission.folder}
                stage={state.stage}
                burst={state.burst}
                href={previewHref ? previewHref(state.mission) : null}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 min-h-6 text-center font-mono text-sm text-ink-soft">{annotation(t, state, beat?.kind)}</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {cta && (
          <a href={cta.href} className="btn-pop btn-tangerine">
            {cta.label}
          </a>
        )}
        <button type="button" className="btn-pop text-sm" onClick={() => dispatch({ type: 'REPLAY' })}>
          {t.replayBtn}
        </button>
        <button type="button" className="btn-pop text-sm" onClick={() => dispatch({ type: 'RESET' })}>
          {t.chooseBtn}
        </button>
        {extraControls}
      </div>
    </motion.div>
  )
}
