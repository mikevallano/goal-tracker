import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const useAuthContext = () => {
  const { handleLogIn, handleLogOut, isLoggedIn, authToken } =
    useContext(AuthContext)
  return { handleLogIn, handleLogOut, isLoggedIn, authToken }
}
