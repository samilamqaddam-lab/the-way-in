import { INK, LEAF, PAPER, PLUM, PLUM_DEEP, SKY, SUN, TANGERINE } from './sprites'

export const TILE = 16

/** tiles the player cannot walk through */
export const SOLID = new Set(['T', 'h', 'w', 'f', 'P', 'O', 'K', 'X', 'A', 'n', 's', 'p', 'm', 'b', 'W', 'd', 'q', 'k', 'j', 'D'])

/** tiles that trigger something when stepped on or bumped */
export const DOOR_OFFICE = 'o'
export const DOOR_EXIT = 'D'

const GRASS = '#9ed98a'
const GRASS_DARK = '#8aca77'
const PATH = '#e8d9b4'
const PATH_EDGE = '#d9c697'
const WATER = '#7fc4f4'
const WATER_DEEP = '#5aaee8'
const TRUNK = '#8a5a33'
const CANOPY = '#3f9e57'
const CANOPY_HI = '#5cb96f'
const WOOD = '#caa36a'
const WOOD_DARK = '#a87f4c'
const FLOOR = '#e9dcc3'
const FLOOR_ALT = '#e0d0b2'
const WALL = '#b48a5a'

function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

/** Draw one 16×16 tile at pixel (x, y). Deterministic per (tx, ty) for texture variety. */
export function drawTile(ctx: CanvasRenderingContext2D, ch: string, x: number, y: number, tx: number, ty: number) {
  const v = (tx * 7 + ty * 13) % 5
  switch (ch) {
    case '.':
    case ',': {
      px(ctx, x, y, TILE, TILE, ch === ',' ? GRASS_DARK : GRASS)
      if (v === 1) px(ctx, x + 4, y + 6, 2, 2, GRASS_DARK)
      if (v === 3) px(ctx, x + 10, y + 11, 2, 2, ch === ',' ? GRASS : GRASS_DARK)
      break
    }
    case '*': {
      px(ctx, x, y, TILE, TILE, GRASS)
      const colors = [TANGERINE, SUN, '#ff7e9d', PAPER]
      px(ctx, x + 3, y + 4, 3, 3, colors[v % 4])
      px(ctx, x + 10, y + 9, 3, 3, colors[(v + 1) % 4])
      px(ctx, x + 4, y + 11, 2, 2, '#6fae5d')
      break
    }
    case '=': {
      px(ctx, x, y, TILE, TILE, PATH)
      if (v === 2) px(ctx, x + 5, y + 7, 3, 2, PATH_EDGE)
      if (v === 4) px(ctx, x + 10, y + 3, 2, 2, PATH_EDGE)
      break
    }
    case 'T': {
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x + 6, y + 10, 4, 5, TRUNK)
      px(ctx, x + 1, y + 1, 14, 10, CANOPY)
      px(ctx, x + 3, y + 2, 6, 4, CANOPY_HI)
      break
    }
    case 'h': {
      px(ctx, x, y, TILE, TILE, '#2f8147')
      px(ctx, x + 1, y + 2, 5, 4, CANOPY)
      px(ctx, x + 8, y + 7, 6, 5, CANOPY)
      px(ctx, x + 3, y + 10, 4, 3, '#246b39')
      break
    }
    case 'w': {
      px(ctx, x, y, TILE, TILE, WATER)
      if (v % 2 === 0) px(ctx, x + 3, y + 5, 6, 2, WATER_DEEP)
      else px(ctx, x + 8, y + 10, 5, 2, PAPER + 'aa')
      break
    }
    case 'f': {
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x + 1, y + 6, 14, 3, WOOD)
      px(ctx, x + 2, y + 4, 3, 9, WOOD_DARK)
      px(ctx, x + 11, y + 4, 3, 9, WOOD_DARK)
      break
    }
    case 'b': {
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x + 1, y + 5, 14, 4, WOOD)
      px(ctx, x + 2, y + 9, 2, 5, WOOD_DARK)
      px(ctx, x + 12, y + 9, 2, 5, WOOD_DARK)
      break
    }
    case 'm': {
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x + 7, y + 8, 3, 7, WOOD_DARK)
      px(ctx, x + 4, y + 3, 9, 6, TANGERINE)
      px(ctx, x + 5, y + 4, 7, 2, PAPER)
      break
    }
    case 's': {
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x + 7, y + 7, 3, 8, WOOD_DARK)
      px(ctx, x + 2, y + 2, 12, 6, WOOD)
      px(ctx, x + 4, y + 4, 8, 1, INK)
      px(ctx, x + 4, y + 6, 5, 1, INK)
      break
    }
    case 'p': {
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x + 6, y + 6, 4, 9, WOOD_DARK)
      px(ctx, x + 3, y + 2, 10, 5, LEAF)
      px(ctx, x + 5, y + 4, 6, 1, PAPER)
      break
    }
    case 'P': {
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x + 1, y + 8, 14, 6, WOOD)
      px(ctx, x + 2, y + 13, 2, 2, WOOD_DARK)
      px(ctx, x + 12, y + 13, 2, 2, WOOD_DARK)
      break
    }
    // buildings (exterior blocks)
    case 'O': {
      px(ctx, x, y, TILE, TILE, WALL)
      px(ctx, x, y, TILE, 5, PLUM)
      px(ctx, x + 2, y + 8, 4, 4, PLUM_DEEP)
      px(ctx, x + 10, y + 8, 4, 4, PLUM_DEEP)
      break
    }
    case 'K': {
      px(ctx, x, y, TILE, TILE, '#e8c79e')
      px(ctx, x, y, TILE, 6, TANGERINE)
      px(ctx, x + 5, y + 9, 6, 7, PLUM_DEEP)
      break
    }
    case 'X': {
      px(ctx, x, y, TILE, TILE, '#dfe9f7')
      px(ctx, x, y, TILE, 6, SKY)
      px(ctx, x + 5, y + 9, 6, 7, PLUM_DEEP)
      break
    }
    case 'A': {
      // striped market awning
      px(ctx, x, y, TILE, TILE, GRASS)
      for (let i = 0; i < 4; i++) px(ctx, x + i * 4, y + 2, 4, 7, i % 2 === 0 ? SUN : PAPER)
      px(ctx, x, y + 8, TILE, 2, TANGERINE)
      px(ctx, x + 1, y + 10, 2, 6, WOOD_DARK)
      px(ctx, x + 13, y + 10, 2, 6, WOOD_DARK)
      break
    }
    case 'n': {
      // low stand counter — the vendor stays visible behind it
      px(ctx, x, y, TILE, TILE, GRASS)
      px(ctx, x, y + 9, TILE, 6, WOOD)
      px(ctx, x, y + 9, TILE, 1, WOOD_DARK)
      break
    }
    case 'o': {
      px(ctx, x, y, TILE, TILE, WALL)
      px(ctx, x + 2, y + 1, 12, 15, PLUM_DEEP)
      px(ctx, x + 4, y + 3, 8, 2, SUN)
      break
    }
    case 'D': {
      px(ctx, x, y, TILE, TILE, '#2f8147')
      px(ctx, x + 2, y, 12, 16, INK)
      px(ctx, x + 4, y + 2, 8, 12, SUN)
      px(ctx, x + 10, y + 8, 2, 2, INK)
      break
    }
    case 'c': {
      px(ctx, x, y, TILE, TILE, '#dcc08a')
      px(ctx, x, y + 7, TILE, 1, '#caa86e')
      if (v === 1) px(ctx, x + 8, y + 2, 1, 5, '#caa86e')
      break
    }
    // office interior
    case '_': {
      px(ctx, x, y, TILE, TILE, (tx + ty) % 2 === 0 ? FLOOR : FLOOR_ALT)
      break
    }
    case 'W': {
      px(ctx, x, y, TILE, TILE, PLUM)
      px(ctx, x + 2, y + 3, 12, 2, PLUM_DEEP)
      px(ctx, x + 2, y + 9, 12, 2, PLUM_DEEP)
      break
    }
    case 'd': {
      px(ctx, x, y, TILE, TILE, (tx + ty) % 2 === 0 ? FLOOR : FLOOR_ALT)
      px(ctx, x + 1, y + 5, 14, 8, WOOD)
      px(ctx, x + 3, y + 2, 7, 5, PLUM_DEEP)
      px(ctx, x + 4, y + 3, 5, 2, '#7be0a2')
      break
    }
    case 'q': {
      px(ctx, x, y, TILE, TILE, SUN)
      px(ctx, x + 1, y + 1, 14, 14, '#ffd66b')
      break
    }
    case 'k': {
      px(ctx, x, y, TILE, TILE, (tx + ty) % 2 === 0 ? FLOOR : FLOOR_ALT)
      px(ctx, x, y + 4, TILE, 9, WOOD_DARK)
      px(ctx, x + 2, y + 1, 4, 5, PAPER)
      px(ctx, x + 9, y + 1, 4, 5, '#caa36a')
      break
    }
    case 'j': {
      px(ctx, x, y, TILE, TILE, (tx + ty) % 2 === 0 ? FLOOR : FLOOR_ALT)
      px(ctx, x + 3, y + 3, 10, 11, PLUM)
      px(ctx, x + 5, y + 5, 6, 3, SUN)
      px(ctx, x + 6, y + 10, 4, 3, PAPER)
      break
    }
    case 'z': {
      px(ctx, x, y, TILE, TILE, (tx + ty) % 2 === 0 ? FLOOR : FLOOR_ALT)
      px(ctx, x + 1, y + 3, 14, 10, SKY)
      px(ctx, x + 1, y + 3, 5, 10, PAPER)
      break
    }
    case 'r': {
      px(ctx, x, y, TILE, TILE, '#cdbb96')
      if (v === 2) px(ctx, x + 6, y + 6, 3, 3, '#bfa87e')
      break
    }
    default:
      px(ctx, x, y, TILE, TILE, GRASS)
  }
}

export interface MapLabel {
  /** tile coords of the label's center */
  x: number
  y: number
  text: string
}

/** Pre-render a whole map once; per frame we only blit the visible part. */
export function prerenderMap(grid: string[], labels: MapLabel[] = []): HTMLCanvasElement {
  const h = grid.length
  const w = grid[0].length
  const c = document.createElement('canvas')
  c.width = w * TILE
  c.height = h * TILE
  const ctx = c.getContext('2d')!
  for (let ty = 0; ty < h; ty++) {
    for (let tx = 0; tx < w; tx++) {
      drawTile(ctx, grid[ty][tx], tx * TILE, ty * TILE, tx, ty)
    }
  }
  // building name plates — chunky pixel signage
  ctx.font = 'bold 7px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (const l of labels) {
    const cx = l.x * TILE + TILE / 2
    const cy = l.y * TILE + TILE / 2
    const wpx = ctx.measureText(l.text).width + 8
    ctx.fillStyle = PAPER
    ctx.fillRect(Math.round(cx - wpx / 2), cy - 6, Math.round(wpx), 12)
    ctx.strokeStyle = INK
    ctx.lineWidth = 1
    ctx.strokeRect(Math.round(cx - wpx / 2) + 0.5, cy - 5.5, Math.round(wpx) - 1, 11)
    ctx.fillStyle = INK
    ctx.fillText(l.text, cx, cy + 0.5)
  }
  return c
}
