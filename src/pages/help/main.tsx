import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/global.css'
import { HelpPage } from './Page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelpPage />
  </StrictMode>,
)
