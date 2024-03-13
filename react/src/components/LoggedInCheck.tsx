import { ReactNode } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import Home from './Home'

type LoggedInCheckProps = { children: ReactNode }

const LoggedInCheck: React.FC<LoggedInCheckProps> = ({ children }) => {
  const { isLoggedIn } = useAuthContext()
  return <>{isLoggedIn ? children : <Home />}</>
}
export default LoggedInCheck
