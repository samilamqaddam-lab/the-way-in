import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/global.css'
import { PromptsPage } from './Page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PromptsPage />
  </StrictMode>,
)
