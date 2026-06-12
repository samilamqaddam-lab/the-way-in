import { DOOR_EXIT, DOOR_OFFICE, SOLID, TILE, prerenderMap } from './tiles'
import { PLUM_DEEP, bakeSprites } from './sprites'
import type { SpriteBank } from './sprites'
import { MAPS } from '../data/maps'
import type { EntityDef, QuestMap } from '../data/maps'

export type Dir = 'down' | 'up' | 'left' | 'right'

const VIEW_W = 320
const VIEW_H = 240
const WALK_SPEED = 110 // px/s — a brisk Pokémon stroll
const DIR_VEC: Record<Dir, [number, number]> = { down: [0, 1], up: [0, -1], left: [-1, 0], right: [1, 0] }

interface Ent {
  def: EntityDef
  x: number
  y: number
  px: number
  py: number
  dir: Dir
  // patrol state
  patrolMax: number
  patrolStep: 1 | -1
  patrolHome: number
  moving: boolean
  fromPx: number
  toPx: number
  progress: number
  waitT: number
}

export interface GameCallbacks {
  /** the player pressed A on an entity */
  onInteract: (entity: EntityDef) => void
  /** the player bumped the big exit door */
  onExitDoor: () => void
  onMapChange: (mapId: string) => void
}

/** door char → where it leads */
const DOORS: Record<string, Record<string, { map: string; x: number; y: number }>> = {
  valley: { [DOOR_OFFICE]: { map: 'office', x: 10, y: 11 } },
  office: { [DOOR_OFFICE]: { map: 'valley', x: 8, y: 8 } },
}

export class Game {
  private ctx: CanvasRenderingContext2D
  private sprites: SpriteBank
  private mapCanvas!: HTMLCanvasElement
  private map!: QuestMap
  private ents: Ent[] = []
  private collected = new Set<string>()
  private reduced: boolean

  // player
  private pX = 0
  private pY = 0
  private pPx = 0
  private pPy = 0
  private pDir: Dir = 'down'
  private pMoving = false
  private pFrom: [number, number] = [0, 0]
  private pTo: [number, number] = [0, 0]
  private pProgress = 0
  private walkFrame = 0
  private walkClock = 0

  private held = new Set<Dir>()
  private actionQueued = false
  paused = false

  // quest guide: a temporary arrow pointing at a target tile
  private guide: { x: number; y: number } | null = null
  private guideUntil = 0

  private raf = 0
  private lastT = 0
  private elapsed = 0
  private running = false
  private cb: GameCallbacks

  constructor(canvas: HTMLCanvasElement, cb: GameCallbacks, reducedMotion: boolean) {
    canvas.width = VIEW_W
    canvas.height = VIEW_H
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('no canvas 2d context')
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = false
    this.cb = cb
    this.reduced = reducedMotion
    this.sprites = bakeSprites()
    this.loadMap('valley')
  }

  /* ── lifecycle ─────────────────────────────────────────────────────── */

  start() {
    if (this.running) return
    this.running = true
    this.lastT = performance.now()
    const loop = (t: number) => {
      if (!this.running) return
      const dt = Math.min(0.05, (t - this.lastT) / 1000)
      this.lastT = t
      this.update(dt)
      this.draw()
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  setShards(ids: Iterable<string>) {
    this.collected = new Set(ids)
  }

  /* ── input (window keys are wired by the page; touch calls these too) ─ */

  setHeld(dir: Dir, down: boolean) {
    if (down) this.held.add(dir)
    else this.held.delete(dir)
  }

  pressAction() {
    this.actionQueued = true
  }

  clearInput() {
    this.held.clear()
    this.actionQueued = false
  }

  /* ── maps ──────────────────────────────────────────────────────────── */

  loadMap(id: string, at?: { x: number; y: number }) {
    this.map = MAPS[id]
    this.mapCanvas = prerenderMap(this.map.grid)
    const spawn = at ?? this.map.spawn
    this.pX = spawn.x
    this.pY = spawn.y
    this.pPx = spawn.x * TILE
    this.pPy = spawn.y * TILE
    this.pMoving = false
    this.pDir = 'down'
    this.ents = this.map.entities.map((def) => {
      const patrolMax = def.ambient?.startsWith('patrolH:') ? Number(def.ambient.split(':')[1]) : 0
      return {
        def,
        x: def.x,
        y: def.y,
        px: def.x * TILE,
        py: def.y * TILE,
        dir: def.facing ?? 'down',
        patrolMax,
        patrolStep: 1 as const,
        patrolHome: def.x,
        moving: false,
        fromPx: def.x * TILE,
        toPx: def.x * TILE,
        progress: 0,
        waitT: 0,
      }
    })
    this.cb.onMapChange(id)
  }

  teleport(map: string, x: number, y: number) {
    this.loadMap(map, { x, y })
  }

  /** point the player toward a tile for a few seconds (cleared when reached) */
  setGuide(x: number, y: number) {
    this.guide = { x, y }
    this.guideUntil = this.elapsed + 9
  }

  get mapId() {
    return this.map.id
  }

  /* ── queries ───────────────────────────────────────────────────────── */

  private tileAt(x: number, y: number): string {
    return this.map.grid[y]?.[x] ?? 'h'
  }

  private entAt(x: number, y: number): Ent | undefined {
    return this.ents.find((e) => e.x === x && e.y === y)
  }

  private blocked(x: number, y: number): boolean {
    const t = this.tileAt(x, y)
    if (SOLID.has(t)) return true
    const e = this.entAt(x, y)
    return !!e?.def.solid
  }

  /* ── update ────────────────────────────────────────────────────────── */

  private update(dt: number) {
    this.elapsed += dt
    if (this.paused) return

    if (this.guide) {
      const d = Math.hypot(this.guide.x - this.pX, this.guide.y - this.pY)
      if (d < 2.5 || this.elapsed > this.guideUntil) this.guide = null
    }

    // interaction
    if (this.actionQueued) {
      this.actionQueued = false
      const [dx, dy] = DIR_VEC[this.pDir]
      const ent = this.entAt(this.pX + dx, this.pY + dy)
      if (ent?.def.dialog) this.cb.onInteract(ent.def)
    }

    // player movement (grid-hop tween)
    if (this.pMoving) {
      this.pProgress += (dt * WALK_SPEED) / TILE
      if (this.pProgress >= 1) {
        this.pMoving = false
        this.pX = this.pTo[0]
        this.pY = this.pTo[1]
        this.pPx = this.pX * TILE
        this.pPy = this.pY * TILE
        const here = this.tileAt(this.pX, this.pY)
        const door = DOORS[this.map.id]?.[here]
        if (door) this.loadMap(door.map, { x: door.x, y: door.y })
      } else {
        this.pPx = (this.pFrom[0] + (this.pTo[0] - this.pFrom[0]) * this.pProgress) * TILE
        this.pPy = (this.pFrom[1] + (this.pTo[1] - this.pFrom[1]) * this.pProgress) * TILE
      }
      this.walkClock += dt
      if (this.walkClock > 0.12) {
        this.walkClock = 0
        this.walkFrame = 1 - this.walkFrame
      }
    } else {
      const dir = (['down', 'up', 'left', 'right'] as Dir[]).find((d) => this.held.has(d))
      if (dir) {
        this.pDir = dir
        const [dx, dy] = DIR_VEC[dir]
        const nx = this.pX + dx
        const ny = this.pY + dy
        const targetTile = this.tileAt(nx, ny)
        if (targetTile === DOOR_EXIT) {
          this.cb.onExitDoor()
        } else if (!this.blocked(nx, ny)) {
          this.pMoving = true
          this.pFrom = [this.pX, this.pY]
          this.pTo = [nx, ny]
          this.pProgress = 0
        }
      } else {
        this.walkFrame = 0
      }
    }

    // ambient patrols (frozen under reduced motion)
    if (!this.reduced) {
      for (const e of this.ents) {
        if (!e.patrolMax) continue
        if (e.moving) {
          e.progress += (dt * WALK_SPEED * 0.55) / TILE
          if (e.progress >= 1) {
            e.moving = false
            e.px = e.toPx
            e.x = Math.round(e.px / TILE)
            e.waitT = 0.8 + ((e.x * 13) % 10) / 10
          } else {
            e.px = e.fromPx + (e.toPx - e.fromPx) * e.progress
          }
        } else {
          e.waitT -= dt
          if (e.waitT <= 0) {
            let nx = e.x + e.patrolStep
            if (nx > e.patrolHome + e.patrolMax || nx < e.patrolHome || this.blocked(nx, e.y) || (nx === this.pX && e.y === this.pY)) {
              e.patrolStep = e.patrolStep === 1 ? -1 : 1
              nx = e.x + e.patrolStep
              if (this.blocked(nx, e.y) || (nx === this.pX && e.y === this.pY)) {
                e.waitT = 0.6
                continue
              }
            }
            e.dir = e.patrolStep === 1 ? 'right' : 'left'
            e.moving = true
            e.fromPx = e.px
            e.toPx = nx * TILE
            e.progress = 0
          }
        }
      }
    }
  }

  /* ── draw ──────────────────────────────────────────────────────────── */

  private draw() {
    const ctx = this.ctx
    const mapW = this.mapCanvas.width
    const mapH = this.mapCanvas.height

    ctx.fillStyle = PLUM_DEEP
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)

    const camX = mapW <= VIEW_W ? -(VIEW_W - mapW) / 2 : Math.max(0, Math.min(this.pPx - VIEW_W / 2 + TILE / 2, mapW - VIEW_W))
    const camY = mapH <= VIEW_H ? -(VIEW_H - mapH) / 2 : Math.max(0, Math.min(this.pPy - VIEW_H / 2 + TILE / 2, mapH - VIEW_H))

    ctx.drawImage(this.mapCanvas, -Math.round(camX), -Math.round(camY))

    // draw order: everything sorted by feet position
    const drawables: Array<{ py: number; fn: () => void }> = []

    for (const e of this.ents) {
      const sx = Math.round(e.px - camX)
      const sy = Math.round(e.py - camY)
      if (sx < -32 || sy < -32 || sx > VIEW_W + 16 || sy > VIEW_H + 16) continue
      const key = e.def.sprite
      drawables.push({
        py: e.py,
        fn: () => {
          if (key === 'termi') {
            // drawn at 2× so the computer reads as a computer
            ctx.drawImage(this.sprites.termi, sx - 8, sy - 22, 32, 32)
          } else if (key === 'bubbles') {
            const bob = this.reduced ? 0 : Math.round(Math.sin(this.elapsed * 2.2) * 2)
            ctx.drawImage(this.sprites.bubbles, sx, sy - 2 + bob)
          } else if (key.startsWith('npc:')) {
            const bank = this.sprites.npc[key.slice(4)] ?? this.sprites.npc.leaf
            const frame = e.moving ? (Math.floor(this.elapsed * 8) % 2) : 0
            const lift = e.def.id === 'vendor' ? 8 : 0 // standing behind the stall counter
            ctx.drawImage(bank[e.dir][frame], sx + 2, sy - 2 - lift)
          }
          // 'sign' sprites draw nothing — the tile is the visual
          if (e.def.ambient === 'sleep') {
            const off = this.reduced ? 0 : Math.round(Math.sin(this.elapsed * 1.6) * 1.5)
            ctx.drawImage(this.sprites.zzz, sx + 11, sy - 8 + off)
          }
          if (e.def.shard && !this.collected.has(e.def.shard)) {
            const bob = this.reduced ? 0 : Math.round(Math.sin(this.elapsed * 3) * 2)
            ctx.drawImage(this.sprites.marker, sx + 5, sy - 12 + bob)
          }
        },
      })
    }

    // player
    const psx = Math.round(this.pPx - camX)
    const psy = Math.round(this.pPy - camY)
    drawables.push({
      py: this.pPy + 0.1,
      fn: () => {
        const frame = this.pMoving ? this.walkFrame : 0
        this.ctx.drawImage(this.sprites.pip[this.pDir][frame], psx + 2, psy - 2)
      },
    })

    drawables.sort((a, b) => a.py - b.py)
    for (const d of drawables) d.fn()

    // the quest guide arrow
    if (this.guide) {
      const bob = this.reduced ? 0 : Math.sin(this.elapsed * 4) * 2.5
      const gx = this.guide.x * TILE + TILE / 2 - camX
      const gy = this.guide.y * TILE + TILE / 2 - camY
      const margin = 14
      const onScreen = gx > margin && gx < VIEW_W - margin && gy > margin && gy < VIEW_H - margin
      ctx.save()
      if (onScreen) {
        // bouncing arrow above the target, pointing down
        ctx.translate(gx, gy - 22 + bob)
        ctx.rotate(Math.PI)
      } else {
        // edge arrow pointing toward the target
        const cx = VIEW_W / 2
        const cy = VIEW_H / 2
        const dx = gx - cx
        const dy = gy - cy
        const t = Math.min((cx - margin) / Math.abs(dx || 0.001), (cy - margin) / Math.abs(dy || 0.001))
        ctx.translate(cx + dx * t, cy + dy * t)
        ctx.rotate(Math.atan2(dy, dx) - Math.PI / 2)
        ctx.translate(0, this.reduced ? 0 : Math.abs(bob))
      }
      ctx.beginPath()
      ctx.moveTo(0, -8)
      ctx.lineTo(7, 4)
      ctx.lineTo(-7, 4)
      ctx.closePath()
      ctx.fillStyle = '#f4581c'
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = '#1b1611'
      ctx.stroke()
      ctx.restore()
    }
  }
}
