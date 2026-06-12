/**
 * All quest pixel art is drawn from string grids — no image assets.
 * Palette chars: . transparent · X body · O eye-white · o pupil · F feet ·
 * A accent (badge/hat) · S screen · G glow-green · W white · K ink outline
 */

export const INK = '#1b1611'
export const PAPER = '#fbf5eb'
export const TANGERINE = '#f4581c'
export const SUN = '#ffc83d'
export const GRAPE = '#6c4df4'
export const LEAF = '#1f9d5b'
export const SKY = '#2d8cff'
export const BLUSH = '#ff7e9d'
export const PLUM = '#241836'
export const PLUM_DEEP = '#1a1128'

export type Palette = Record<string, string>

const PIP_PALETTE: Palette = {
  X: INK,
  O: PAPER,
  o: INK,
  F: INK,
  A: TANGERINE,
}

/** Slim the 12-wide art to 10 wide — pixel Pip matches the real Pip's proportions. */
function slim(grid: string[]): string[] {
  return grid.map((row) => row.slice(1, 11))
}

/** 12 wide × 16 tall, drawn into a 16×16 cell (2px left offset). */
const PIP_DOWN_A = [
  '..XXXXXXXX..',
  '.XXXXXXXXXX.',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XX.OO..OO.XX',
  'XX.Oo..Oo.XX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  '.XXXXXXXXXX.',
  '..XXXXXXXX..',
  '............',
  '..FF....FF..',
  '............',
]

const PIP_DOWN_B = [
  '............',
  '..XXXXXXXX..',
  '.XXXXXXXXXX.',
  'XXXXXXXXXXXX',
  'XX.OO..OO.XX',
  'XX.Oo..Oo.XX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  '.XXXXXXXXXX.',
  '..XXXXXXXX..',
  '............',
  '....FFFF....',
  '............',
]

const PIP_UP_A = [
  '..XXXXXXXX..',
  '.XXXXXXXXXX.',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  '.XXXXXXXXXX.',
  '..XXXXXXXX..',
  '............',
  '..FF....FF..',
  '............',
]

const PIP_UP_B = PIP_DOWN_B.map((row, i) => (i === 4 || i === 5 ? 'XXXXXXXXXXXX' : row))

const PIP_LEFT_A = [
  '..XXXXXXXX..',
  '.XXXXXXXXXX.',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XX.OO..OO.XX'.replace('OO.XX', 'XX.XX'),
  'XX.Oo..XX.XX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  '.XXXXXXXXXX.',
  '..XXXXXXXX..',
  '............',
  '...FF.FF....',
  '............',
]

const PIP_LEFT_B = PIP_LEFT_A.map((row, i) => (i === 14 ? '....FFFF....' : row))
const flip = (grid: string[]) => grid.map((row) => row.split('').reverse().join(''))
const PIP_RIGHT_A = flip(PIP_LEFT_A)
const PIP_RIGHT_B = flip(PIP_LEFT_B)

/** Termi — a friendly CRT with its keyboard, 16×14, drawn 1:1. */
const TERMI = [
  '.KKKKKKKKKKKKK.',
  'KSSSSSSSSSSSSSK',
  'KSGG.SSSSSSSSSK',
  'KSGGG.SSSSSSSSK',
  'KSGG.SSSSSSSSSK',
  'KSSSSSGGSSSSSSK',
  'KSSSSSSSSSSSSSK',
  '.KKKKKKKKKKKKK.',
  '......KKK......',
  '.....KKKKK.....',
  '.KKKKKKKKKKKKK.',
  '.KWWKWWKWWKWWK.',
  '.KKKKKKKKKKKKK.',
  '...............',
]

const TERMI_PALETTE: Palette = { K: PLUM, S: PLUM_DEEP, G: '#7be0a2', W: PAPER }

/** Bubbles — a chat-bubble creature, 14×14ish. */
const BUBBLES = [
  '...WWWWWWWW....',
  '..WWWWWWWWWW...',
  '.WWWWWWWWWWWW..',
  '.WW.oo..oo.WW..',
  '.WWWWWWWWWWWW..',
  '.WWWWWWWWWWWW..',
  '..WWWWWWWWWW...',
  '....WWWW.......',
  '...WW..........',
  '...............',
  '...............',
  '...............',
  '...............',
  '...............',
  '...............',
  '...............',
]

const BUBBLES_PALETTE: Palette = { W: SUN, o: INK }

/** the Data Snatcher — glitchy ink blob, two frames. */
const SNATCHER_A = [
  '....XX..XX.....',
  '..XXXXXXXXXX...',
  '.XXXXXXXXXXXX..',
  'XXXX.OO.OO.XXX.',
  'XXXX.oO.oO.XXX.',
  'XXXXXXXXXXXXXX.',
  '.XXXWWWWWWXXX..',
  'XXXXXXXXXXXXXX.',
  'XX.XXXXXXXX.XX.',
  '.X..XXXXXX..X..',
  '....XX..XX.....',
  '...XX....XX....',
  '...............',
  '...............',
  '...............',
  '...............',
]

const SNATCHER_B = [
  '..XX..XX.......',
  '..XXXXXXXXXX...',
  '.XXXXXXXXXXXXX.',
  'XXXX.OO.OO.XXXX',
  'XXXX.Oo.Oo.XXXX',
  'XXXXXXXXXXXXXX.',
  '.XXXWWWWWWXXX..',
  'XXXXXXXXXXXXXX.',
  '.XX.XXXXXX.XX..',
  '..X..XXXX..X...',
  '.....XXXX......',
  '....XX..XX.....',
  '...............',
  '...............',
  '...............',
  '...............',
]

/** body lighter than the plum-deep arena so the blob reads on dark screens */
const SNATCHER_PALETTE: Palette = { X: '#4a3878', O: BLUSH, o: INK, W: PAPER }

/** quest marker `!` shown above NPCs with something to give — outlined, dainty */
const MARKER = [
  '.KK.',
  'KAAK',
  'KAAK',
  'KAAK',
  '.KK.',
  '....',
  '.AA.',
]
const MARKER_PALETTE: Palette = { A: TANGERINE, K: INK }

/** zzz bubble for sleepers */
const ZZZ = ['AAA...', '..A...', 'AAA.AA', '.....A', '....AA']
const ZZZ_PALETTE: Palette = { A: SKY }

export function bake(grid: string[], palette: Palette, scale = 1): HTMLCanvasElement {
  const h = grid.length
  const w = Math.max(...grid.map((r) => r.length))
  const c = document.createElement('canvas')
  c.width = w * scale
  c.height = h * scale
  const ctx = c.getContext('2d')!
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < (grid[y]?.length ?? 0); x++) {
      const ch = grid[y][x]
      const color = palette[ch]
      if (!color) continue
      ctx.fillStyle = color
      ctx.fillRect(x * scale, y * scale, scale, scale)
    }
  }
  return c
}

function pipWith(palette: Palette): Record<string, HTMLCanvasElement[]> {
  const p = { ...PIP_PALETTE, ...palette }
  return {
    down: [bake(slim(PIP_DOWN_A), p), bake(slim(PIP_DOWN_B), p)],
    up: [bake(slim(PIP_UP_A), p), bake(slim(PIP_UP_B), p)],
    left: [bake(slim(PIP_LEFT_A), p), bake(slim(PIP_LEFT_B), p)],
    right: [bake(slim(PIP_RIGHT_A), p), bake(slim(PIP_RIGHT_B), p)],
  }
}

export interface SpriteBank {
  pip: Record<string, HTMLCanvasElement[]>
  npc: Record<string, Record<string, HTMLCanvasElement[]>>
  termi: HTMLCanvasElement
  bubbles: HTMLCanvasElement
  snatcher: HTMLCanvasElement[]
  marker: HTMLCanvasElement
  zzz: HTMLCanvasElement
}

/** A baked sprite as an <img>-ready URL (for React-side UI like the boss screen). */
export function spriteDataUrl(grid: string[], palette: Palette, scale = 6): string {
  return bake(grid, palette, scale).toDataURL()
}

export const GRIDS = {
  pipDown: slim(PIP_DOWN_A),
  pipPalette: PIP_PALETTE,
  /** for dark surfaces — ink Pip disappears on plum */
  pipOnDark: { ...PIP_PALETTE, X: TANGERINE } as Palette,
  snatcherA: SNATCHER_A,
  snatcherB: SNATCHER_B,
  snatcherPalette: SNATCHER_PALETTE,
}

/** Bake everything once at game init. */
export function bakeSprites(): SpriteBank {
  return {
    pip: pipWith({}),
    npc: {
      tangerine: pipWith({ X: TANGERINE, O: PAPER, o: INK }),
      grape: pipWith({ X: GRAPE }),
      leaf: pipWith({ X: LEAF }),
      sky: pipWith({ X: SKY }),
      blush: pipWith({ X: BLUSH, O: PAPER, o: INK }),
      sun: pipWith({ X: SUN, O: INK, o: PAPER }),
    },
    termi: bake(TERMI, TERMI_PALETTE),
    bubbles: bake(BUBBLES, BUBBLES_PALETTE),
    snatcher: [bake(SNATCHER_A, SNATCHER_PALETTE), bake(SNATCHER_B, SNATCHER_PALETTE)],
    marker: bake(MARKER, MARKER_PALETTE),
    zzz: bake(ZZZ, ZZZ_PALETTE),
  }
}
