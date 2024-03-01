import { createContext, useState, ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  handleLogIn: (token: string) => void
  handleLogOut: () => void
}

const initialAuthContext: AuthContextType = {
  isLoggedIn: false,
  handleLogIn: () => {},
  handleLogOut: () => {},
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogIn = (token: string) => {
    // You might want to store the token in a secure way (e.g., localStorage)
    // For simplicity, we're storing it in state here
    console.log(token)
    setIsLoggedIn(true)
  }

  const handleLogOut = () => {
    // Clear any authentication-related state (e.g., remove token from storage)
    setIsLoggedIn(false)
  }

  const returnValue = {
    isLoggedIn: isLoggedIn,
    handleLogIn: handleLogIn,
    handleLogOut: handleLogOut,
  }

  return (
    <AuthContext.Provider value={returnValue}>{children}</AuthContext.Provider>
  )
}
