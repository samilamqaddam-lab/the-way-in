import { MotionConfig } from 'motion/react'
import { QuickNav } from './components/QuickNav'
import { Hero } from './sections/Hero'
import { ChatVsAgent } from './sections/ChatVsAgent'
import { TestDrive } from './sections/TestDrive'
import { NothingToBreak } from './sections/NothingToBreak'
import { PickYourDoor } from './sections/PickYourDoor'
import { FirstPrompts } from './sections/FirstPrompts'
import { SendOff } from './sections/SendOff'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link btn-pop" href="#test-drive">
        Skip to the interactive part
      </a>
      <div className="grain" aria-hidden="true" />
      <QuickNav />
      <main>
        <Hero />
        <ChatVsAgent />
        <TestDrive />
        <NothingToBreak />
        <PickYourDoor />
        <FirstPrompts />
        <SendOff />
      </main>
    </MotionConfig>
  )
}
