import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import './stylesheets/index.css'
import App from './App.tsx'
import { UserPreferencesProvider } from './context/UserPreferencesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <UserPreferencesProvider>
          <App />
        </UserPreferencesProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
