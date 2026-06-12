import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/global.css'
import { PromptsPage } from './Page'

import { LocaleProvider, detectLocale } from '../../i18n/locale'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider locale={detectLocale()}>
      <PromptsPage />
    </LocaleProvider>
  </StrictMode>,
)
