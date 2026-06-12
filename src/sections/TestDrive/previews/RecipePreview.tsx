import { motion } from 'motion/react'
import { popSpring } from '../../../lib/motion'

/** A warm recipe card assembling itself: title → ingredients → tickable steps. */
export function RecipePreview({ stage }: { stage: number }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-2.5 bg-[#FFFBEB] p-4 text-center">
      {stage >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={popSpring}>
          <p className="font-display text-xl font-extrabold leading-tight text-ink">Grandma's Lemon Cake 🍋</p>
          <p className="font-serif text-xs italic text-neutral-500">the real one — do not improvise</p>
        </motion.div>
      )}
      {stage >= 2 && (
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="text-left text-xs leading-relaxed text-neutral-700"
        >
          <li>• 3 lemons (the good ones)</li>
          <li>• 200 g sugar · 180 g flour</li>
          <li>• 3 eggs · a pinch of patience</li>
        </motion.ul>
      )}
      {stage >= 3 && (
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={popSpring}
          className="flex flex-col gap-1 text-left text-xs text-neutral-800"
        >
          <li className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded border-2 border-ink bg-leaf text-[0.6rem] font-bold text-paper">
              ✓
            </span>
            <span className="line-through opacity-60">Zest the lemons</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border-2 border-ink bg-white" />
            <span>Whisk eggs &amp; sugar until fluffy</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border-2 border-ink bg-white" />
            <span>Fold in flour, bake 35 min</span>
          </li>
        </motion.ul>
      )}
    </div>
  )
}
