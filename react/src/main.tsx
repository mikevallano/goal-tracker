import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { GoalManagementProvider } from './contexts/GoalManagementContext.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoalManagementProvider>
          <App />
        </GoalManagementProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
