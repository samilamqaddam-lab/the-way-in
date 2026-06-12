import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/global.css'
import { FirstDayPage } from './Page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstDayPage />
  </StrictMode>,
)
