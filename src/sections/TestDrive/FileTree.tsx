import { motion } from 'motion/react'
import { popSpring } from '../../lib/motion'
import { useLocale } from '../../i18n/locale'
import { TEST_DRIVE_COPY } from './copy'
import type { MissionFile } from '../../data/missions'

interface FileTreeProps {
  folder: string
  created: boolean
  files: MissionFile[]
}

const DOT: Record<string, string> = {
  html: 'bg-tangerine',
  css: 'bg-sky',
  js: 'bg-sun',
}

function fileDot(name: string) {
  const ext = name.split('.').pop() ?? ''
  return DOT[ext] ?? 'bg-blush'
}

/** The pretend folder. Starts empty — that's the safety lesson. */
export function FileTree({ folder, created, files }: FileTreeProps) {
  const t = TEST_DRIVE_COPY[useLocale()]
  return (
    <div className="rounded-2xl border-[2.5px] border-plum-line bg-plum-deep p-4">
      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-on-plum-dim">
        {t.filesLabel} <span className="normal-case tracking-normal">{t.startedEmpty}</span>
      </p>
      {!created ? (
        <p className="mt-3 text-sm italic text-on-plum-dim">{t.emptyNote}</p>
      ) : (
        <ul className="mt-3 space-y-1.5 font-mono text-sm text-on-plum">
          <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={popSpring}>
            <span aria-hidden="true">📁 </span>
            {folder}/
          </motion.li>
          {files.map((file) => (
            <motion.li
              key={file.name}
              initial={{ opacity: 0, scale: 0.85, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={popSpring}
              className="flex items-baseline gap-2 pl-5"
            >
              <span className={`inline-block h-2 w-2 shrink-0 self-center rounded-full ${fileDot(file.name)}`} aria-hidden="true" />
              <span>{file.name}</span>
              {file.note && <span className="truncate text-[0.72rem] text-on-plum-dim">· {file.note}</span>}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}
