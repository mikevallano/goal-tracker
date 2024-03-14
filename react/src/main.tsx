import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CategoriesGoalsProvider } from './contexts/CategoriesGoalsContext.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoriesGoalsProvider>
          <App />
        </CategoriesGoalsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
