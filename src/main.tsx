// c:\Users\edoss\workspace\web\mini-tools\src\main.tsx
import { render } from 'preact'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import { App } from './app'

render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById('app')!
)
