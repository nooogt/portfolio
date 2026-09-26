import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './styles/tokens/primitives.css'
import './styles/tokens/semantic.css'
import './styles/tokens/themes.css'
import './styles/global.css'
import './styles/motion.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
