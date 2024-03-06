import { ReactNode } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import LoginOrSignUp from './LoginOrSignUp'

type LoggedInCheckProps = { children: ReactNode }

const LoggedInCheck: React.FC<LoggedInCheckProps> = ({ children }) => {
  const { isLoggedIn } = useAuthContext()
  return <>{isLoggedIn ? children : <LoginOrSignUp />}</>
}
export default LoggedInCheck
