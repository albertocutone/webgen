import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LocaleProvider } from './i18n/LocaleContext.jsx'
import './styles/index.css'

// import.meta.env.BASE_URL mirrors Vite's `base`, so the router works both
// under the /webgen/ project path and at / on a custom domain.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </LocaleProvider>
  </StrictMode>,
)
