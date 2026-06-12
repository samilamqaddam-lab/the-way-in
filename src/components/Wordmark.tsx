import { Pip } from './Pip'

/** The site's lockup: the·way·in with a tangerine Pip as the mark. */
export function Wordmark({ dark = false }: { dark?: boolean }) {
  void dark // tangerine contrasts the ink wordmark on light, and pops on plum too
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-sm font-bold tracking-tight">
      the·way·in
      <span className="inline-block translate-y-[1px]">
        <Pip size={19} tone="tangerine" />
      </span>
    </span>
  )
}
