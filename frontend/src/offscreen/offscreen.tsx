import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppOffscreen from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppOffscreen />
    </StrictMode>,
)
