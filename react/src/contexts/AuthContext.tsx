import { createContext, useState, ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  handleLogIn: (token: string) => void
  handleLogOut: () => void
  authToken: string | null
}

const initialAuthContext: AuthContextType = {
  isLoggedIn: false,
  handleLogIn: () => {},
  handleLogOut: () => {},
  authToken: null,
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext)

type AuthProviderProps = {
  children: ReactNode
}

const TOKEN_KEY = 'authToken'

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken)

  const handleLogIn = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    setAuthToken(token)
    setIsLoggedIn(true)
  }

  const handleLogOut = () => {
    localStorage.removeItem(TOKEN_KEY)
    setAuthToken('')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        handleLogIn,
        handleLogOut,
        authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
