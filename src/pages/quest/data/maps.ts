/**
 * The two maps, composed programmatically so layout edits stay safe.
 * Tile chars are defined in engine/tiles.ts.
 */

export interface EntityDef {
  id: string
  /** sprite key: 'termi' | 'bubbles' | 'snatcher' | 'npc:<color>' */
  sprite: string
  x: number
  y: number
  facing?: 'down' | 'up' | 'left' | 'right'
  dialog: string
  solid?: boolean
  /** shows the ! marker until this shard is collected */
  shard?: string
  /** ambient: 'sleep' shows zzz; 'patrolH:<n>' walks n tiles right and back */
  ambient?: string
  badge?: string
}

export interface QuestMap {
  id: 'valley' | 'office'
  grid: string[]
  entities: EntityDef[]
  spawn: { x: number; y: number }
  /** baked-in signage */
  labels?: Array<{ x: number; y: number; text: string; textFr: string }>
}

class Painter {
  g: string[][]
  constructor(w: number, h: number, fill: string) {
    this.g = Array.from({ length: h }, () => Array(w).fill(fill))
  }
  set(x: number, y: number, ch: string) {
    if (this.g[y]?.[x] !== undefined) this.g[y][x] = ch
  }
  rect(x: number, y: number, w: number, h: number, ch: string) {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) this.set(i, j, ch)
  }
  hline(x1: number, x2: number, y: number, ch: string) {
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) this.set(i, y, ch)
  }
  vline(x: number, y1: number, y2: number, ch: string) {
    for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) this.set(x, j, ch)
  }
  sprinkle(coords: Array<[number, number]>, ch: string) {
    for (const [x, y] of coords) this.set(x, y, ch)
  }
  done(): string[] {
    return this.g.map((r) => r.join(''))
  }
}

/* ─── Pip's Valley — 36 × 28 ────────────────────────────────────────────── */

function buildValley(): string[] {
  const p = new Painter(36, 28, '.')

  // hedge border
  p.rect(0, 0, 36, 1, 'h')
  p.rect(0, 27, 36, 1, 'h')
  p.rect(0, 0, 1, 28, 'h')
  p.rect(35, 0, 1, 28, 'h')

  // the exit door, set into the top hedge (north-east) — one door, one guardian
  p.set(30, 0, 'D')

  // the Agent Office building (north-west), door at its south face
  p.rect(3, 2, 11, 6, 'O')
  p.set(8, 7, 'o')

  // the Computer Clearing (north-east): a wide desk so it reads as a computer corner
  p.set(27, 9, 'P')
  p.set(28, 9, 'P')
  p.sprinkle(
    [
      [25, 8],
      [30, 8],
      [25, 10],
      [31, 10],
      [26, 12],
      [30, 12],
    ],
    '*',
  )

  // the App Stand (west): one open market stall — many doors, one skill
  p.hline(6, 8, 12, 'A')
  p.hline(6, 8, 13, 'n')

  // the Chat Gazebo (south-center): sun-wood ring, opening to the north
  p.rect(14, 20, 7, 5, 'f')
  p.rect(15, 21, 5, 3, 'c')
  p.set(17, 20, 'c')

  // pond (south-east)
  p.rect(26, 21, 7, 5, 'w')

  // paths — the main road is two tiles wide so nobody can wall it off
  p.vline(17, 9, 20, '=') // gazebo → plaza → north
  p.hline(7, 28, 14, '=') // main east–west road
  p.hline(7, 28, 15, '=')
  p.vline(8, 8, 14, '=') // office door ↓ to road
  p.vline(28, 10, 14, '=') // clearing ↓ to road
  p.vline(30, 2, 8, '=') // exit door ↓
  p.hline(28, 30, 8, '=') // clearing ← exit junction

  // trees & texture
  p.sprinkle(
    [
      [20, 4],
      [23, 3],
      [17, 5],
      [25, 5],
      [21, 7],
      [3, 20],
      [3, 24],
      [9, 22],
      [12, 25],
      [24, 18],
      [33, 17],
      [33, 12],
      [16, 17],
      [22, 17],
    ],
    'T',
  )
  p.sprinkle(
    [
      [11, 9],
      [13, 16],
      [19, 16],
      [23, 21],
      [10, 19],
      [31, 19],
      [22, 25],
      [12, 11],
      [25, 16],
      [6, 9],
      [15, 10],
      [33, 21],
    ],
    '*',
  )
  p.sprinkle(
    [
      [19, 11],
      [24, 12],
      [7, 21],
      [14, 8],
      [27, 17],
      [31, 15],
      [11, 24],
      [21, 23],
    ],
    ',',
  )

  // furniture — placed after the paths so nothing paves over it
  p.set(4, 17, 'p') // OpenCode trail marker, on the free trail
  p.set(22, 19, 'b') // bench near the plaza
  p.set(13, 21, 'm') // mailbox by the gazebo

  return p.done()
}

/* ─── The Agent Office — 22 × 14 ────────────────────────────────────────── */

function buildOffice(): string[] {
  const p = new Painter(22, 14, '_')

  p.rect(0, 0, 22, 2, 'W')
  p.rect(0, 13, 22, 1, 'W')
  p.rect(0, 0, 1, 14, 'W')
  p.rect(21, 0, 1, 14, 'W')
  p.set(10, 13, 'o') // exit back to the valley

  // worker desks (two rows facing each other)
  p.sprinkle(
    [
      [4, 4],
      [7, 4],
      [10, 4],
      [4, 8],
      [7, 8],
    ],
    'd',
  )

  // the chief's platform (east)
  p.rect(16, 3, 3, 2, 'q')

  // cafeteria corner (south-west): counter + coffee machine
  p.hline(2, 5, 11, 'k')
  p.set(2, 10, 'j')

  // nap corner (north-west)
  p.set(2, 2, 'z')
  p.set(13, 2, 'z')

  // rug path from the door to the room
  p.vline(10, 9, 12, 'r')
  p.hline(9, 11, 9, 'r')

  return p.done()
}

/* ─── exports ───────────────────────────────────────────────────────────── */

export const VALLEY: QuestMap = {
  id: 'valley',
  grid: buildValley(),
  spawn: { x: 17, y: 22 },
  labels: [
    { x: 8.5, y: 4.5, text: 'AGENT & CO.', textFr: 'AGENT & CIE' },
    { x: 7, y: 11.2, text: 'THE APP STAND', textFr: 'LE STAND DES APPS' },
    { x: 30, y: 1.8, text: 'EXIT', textFr: 'SORTIE' },
  ],
  entities: [
    { id: 'bubbles', sprite: 'bubbles', x: 16, y: 22, dialog: 'bubbles', solid: true, shard: 'language' },
    { id: 'termi', sprite: 'termi', x: 28, y: 9, dialog: 'termi', solid: true, shard: 'terminal' },
    { id: 'vendor', sprite: 'npc:sun', x: 7, y: 13, dialog: 'vendor', solid: true, shard: 'apps' },
    { id: 'opencode-marker', sprite: 'sign', x: 4, y: 17, dialog: 'opencodeMarker', solid: false },
    {
      id: 'roamer',
      sprite: 'npc:leaf',
      x: 20,
      y: 17,
      dialog: 'roamer',
      solid: true,
      shard: 'safety',
      ambient: 'patrolH:3',
    },
    { id: 'mailbox', sprite: 'sign', x: 13, y: 21, dialog: 'mailbox', solid: false },
    { id: 'bench', sprite: 'sign', x: 22, y: 19, dialog: 'bench', solid: false },
  ],
}

export const OFFICE: QuestMap = {
  id: 'office',
  grid: buildOffice(),
  spawn: { x: 10, y: 11 },
  entities: [
    { id: 'chief', sprite: 'npc:tangerine', x: 17, y: 4, facing: 'down', dialog: 'chief', solid: true, shard: 'orchestra', badge: 'sun' },
    { id: 'worker-research', sprite: 'npc:sky', x: 4, y: 5, facing: 'up', dialog: 'workerResearch', solid: true, badge: 'paper' },
    { id: 'worker-writer', sprite: 'npc:blush', x: 7, y: 5, facing: 'up', dialog: 'workerWriter', solid: true },
    { id: 'worker-fixer', sprite: 'npc:grape', x: 10, y: 5, facing: 'up', dialog: 'workerFixer', solid: true },
    { id: 'runner', sprite: 'npc:sun', x: 6, y: 7, dialog: 'runner', solid: true, ambient: 'patrolH:4' },
    { id: 'sleeper-1', sprite: 'npc:sky', x: 2, y: 3, facing: 'down', dialog: 'sleeper', solid: true, ambient: 'sleep' },
    { id: 'sleeper-2', sprite: 'npc:blush', x: 13, y: 3, facing: 'down', dialog: 'sleeper2', solid: true, ambient: 'sleep' },
    { id: 'cafeteria-1', sprite: 'npc:leaf', x: 3, y: 10, facing: 'down', dialog: 'cafeteria', solid: true },
    { id: 'cafeteria-2', sprite: 'npc:grape', x: 4, y: 10, facing: 'down', dialog: 'cafeteria2', solid: true },
  ],
}

export const MAPS: Record<string, QuestMap> = { valley: VALLEY, office: OFFICE }
