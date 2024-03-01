import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext'

export const useAuthContext = () => {
  const { handleLogIn, handleLogOut, isLoggedIn } = useContext(AuthContext)
  return {
    handleLogIn: handleLogIn,
    handleLogOut: handleLogOut,
    isLoggedIn: isLoggedIn,
  }
}
