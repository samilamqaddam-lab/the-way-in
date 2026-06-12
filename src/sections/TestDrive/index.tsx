import { useEffect, useReducer } from 'react'
import { motion } from 'motion/react'
import { SectionShell } from '../../components/SectionShell'
import { Squiggle } from '../../components/Squiggle'
import { Pip } from '../../components/Pip'
import { popIn } from '../../lib/motion'
import { MissionPicker } from './MissionPicker'
import { Terminal } from './Terminal'
import { FileTree } from './FileTree'
import { Preview } from './Preview'
import { AUTO_DELAY, PAUSE_DELAY, driveReducer, initialDrive } from './engine'
import type { DriveState } from './engine'
import type { Beat } from '../../data/missions'

function annotation(state: DriveState, beatKind: Beat['kind'] | undefined): string {
  if (state.status === 'done') return "Now imagine it with your idea in the message. That's the whole move."
  switch (state.awaiting) {
    case 'send':
      return 'Your message is pre-written — just send it.'
    case 'typing':
      return 'Agents narrate as they go. (Feel free to skip the typing.)'
    case 'permission':
      return "Real agents always ask first. You're the boss."
    case 'auto':
    case 'pause':
      if (beatKind === 'filesAppear' || beatKind === 'previewStage')
        return 'Watch the side panes — the pretend folder is filling up.'
      return 'The agent is doing the fiddly part.'
    default:
      return ' '
  }
}

export function TestDrive() {
  const [state, dispatch] = useReducer(driveReducer, initialDrive)
  const beat = state.mission?.beats[state.cursor]

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

  return (
    <SectionShell
      id="test-drive"
      eyebrow="feel it"
      title={
        <>
          Take one for a{' '}
          <span className="relative inline-block whitespace-nowrap">
            test drive.
            <Squiggle kind="underline" className="absolute -bottom-2 left-0 h-3 w-full text-tangerine" delay={0.4} />
          </span>
        </>
      }
      kicker="Pick a pretend mission and play the human. This is a scripted replay — a little movie you click through. Nothing real runs, and nothing on your device is touched. Promise."
    >
      <div className="mt-12">
        {state.status === 'picking' || !state.mission ? (
          <MissionPicker onPick={(mission) => dispatch({ type: 'PICK', mission })} />
        ) : (
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
                    pretend agent — scripted replay {state.mission.emoji}
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
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 min-h-6 text-center font-mono text-sm text-ink-soft">
              {annotation(state, beat?.kind)}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {state.status === 'done' && (
                <a href="#first-prompts" className="btn-pop btn-tangerine">
                  Get your real first prompt ↓
                </a>
              )}
              <button type="button" className="btn-pop text-sm" onClick={() => dispatch({ type: 'REPLAY' })}>
                ↺ replay this mission
              </button>
              <button type="button" className="btn-pop text-sm" onClick={() => dispatch({ type: 'RESET' })}>
                choose another mission
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </SectionShell>
  )
}
