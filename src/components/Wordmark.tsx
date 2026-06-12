import { Pip } from './Pip'

/** The site's lockup: the·way·in with Pip standing in as the mark. */
export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-sm font-bold tracking-tight">
      the·way·in
      <span className="inline-block translate-y-[1px]">
        <Pip size={19} tone={dark ? 'tangerine' : 'ink'} />
      </span>
    </span>
  )
}
