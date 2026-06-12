import type { Mission, MissionFile } from '../../data/missions'

/**
 * The Test Drive state machine. The whole session is theater:
 * the reducer walks a scripted beat list; the only "real" inputs are the
 * visitor's taps (Send / Allow / Not now), which is exactly the point.
 */

export interface LogItem {
  id: number
  role: 'you' | 'agent' | 'think' | 'system'
  text: string
}

export type Awaiting = 'send' | 'typing' | 'pause' | 'auto' | 'permission' | null

export interface DriveState {
  mission: Mission | null
  cursor: number
  /** last beat index that has been entered (idempotency guard) */
  entered: number
  log: LogItem[]
  files: MissionFile[]
  folderCreated: boolean
  stage: number
  status: 'picking' | 'playing' | 'done'
  awaiting: Awaiting
  burst: number
  skipSignal: number
  denies: number
  nextId: number
}

export type DriveAction =
  | { type: 'PICK'; mission: Mission }
  | { type: 'ENTER' }
  | { type: 'SEND' }
  | { type: 'ALLOW' }
  | { type: 'DENY' }
  | { type: 'TYPED' }
  | { type: 'STEP' }
  | { type: 'SKIP' }
  | { type: 'REPLAY' }
  | { type: 'RESET' }

export const initialDrive: DriveState = {
  mission: null,
  cursor: 0,
  entered: -1,
  log: [],
  files: [],
  folderCreated: false,
  stage: 0,
  status: 'picking',
  awaiting: null,
  burst: 0,
  skipSignal: 0,
  denies: 0,
  nextId: 1,
}

function withLine(state: DriveState, role: LogItem['role'], text: string): Pick<DriveState, 'log' | 'nextId'> {
  return {
    log: [...state.log, { id: state.nextId, role, text }],
    nextId: state.nextId + 1,
  }
}

export function driveReducer(state: DriveState, action: DriveAction): DriveState {
  switch (action.type) {
    case 'PICK':
      return { ...initialDrive, mission: action.mission, status: 'playing' }

    case 'ENTER': {
      if (!state.mission || state.status !== 'playing') return state
      if (state.entered === state.cursor) return state
      const beat = state.mission.beats[state.cursor]
      if (!beat) return state
      const base = { ...state, entered: state.cursor }
      switch (beat.kind) {
        case 'youSend':
          return { ...base, awaiting: 'send' }
        case 'agentSay':
          return { ...base, awaiting: 'typing', ...withLine(base, 'agent', beat.text) }
        case 'agentThink':
          return { ...base, awaiting: 'auto', ...withLine(base, 'think', beat.label) }
        case 'askPermission':
          return { ...base, awaiting: 'permission' }
        case 'filesAppear':
          return { ...base, awaiting: 'auto', files: [...state.files, ...beat.files] }
        case 'previewStage':
          return { ...base, awaiting: 'auto', stage: state.stage + 1 }
        case 'celebrate':
          return { ...base, awaiting: 'auto', burst: state.burst + 1 }
        case 'done':
          return { ...base, awaiting: 'typing', ...withLine(base, 'agent', beat.message) }
      }
      return base
    }

    case 'SEND': {
      const beat = state.mission?.beats[state.cursor]
      if (!beat || beat.kind !== 'youSend' || state.awaiting !== 'send') return state
      return { ...state, awaiting: null, cursor: state.cursor + 1, ...withLine(state, 'you', beat.text) }
    }

    case 'ALLOW': {
      const beat = state.mission?.beats[state.cursor]
      if (!beat || beat.kind !== 'askPermission' || state.awaiting !== 'permission') return state
      return {
        ...state,
        awaiting: null,
        cursor: state.cursor + 1,
        folderCreated: true,
        ...withLine(state, 'system', `✓ ${beat.allowNote}`),
      }
    }

    case 'DENY': {
      const beat = state.mission?.beats[state.cursor]
      if (!beat || beat.kind !== 'askPermission' || state.awaiting !== 'permission') return state
      return {
        ...state,
        awaiting: 'typing',
        denies: state.denies + 1,
        ...withLine(state, 'agent', beat.denyReply),
      }
    }

    case 'TYPED': {
      if (state.awaiting !== 'typing') return state
      const beat = state.mission?.beats[state.cursor]
      if (beat?.kind === 'done') return { ...state, status: 'done', awaiting: null }
      if (beat?.kind === 'askPermission') return { ...state, awaiting: 'permission' }
      return { ...state, awaiting: 'pause' }
    }

    case 'STEP': {
      if (state.awaiting !== 'auto' && state.awaiting !== 'pause') return state
      return { ...state, awaiting: null, cursor: state.cursor + 1 }
    }

    case 'SKIP':
      return state.awaiting === 'typing' ? { ...state, skipSignal: state.skipSignal + 1 } : state

    case 'REPLAY':
      return state.mission ? { ...initialDrive, mission: state.mission, status: 'playing' } : initialDrive

    case 'RESET':
      return initialDrive
  }
}

/** ms before auto-advancing past each non-interactive beat */
export const AUTO_DELAY: Record<string, number> = {
  agentThink: 950,
  filesAppear: 800,
  previewStage: 900,
  celebrate: 1150,
}

export const PAUSE_DELAY = 380
