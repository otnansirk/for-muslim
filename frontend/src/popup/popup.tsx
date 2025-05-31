import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppPopup from './App'

import './popup.css'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppPopup />
    </StrictMode>,
)
