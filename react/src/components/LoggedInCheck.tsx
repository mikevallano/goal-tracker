import { ReactNode } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import LoginForm from './LoginForm'

type LoggedInCheckProps = { children: ReactNode }

const LoggedInCheck: React.FC<LoggedInCheckProps> = ({ children }) => {
  const { isLoggedIn } = useAuthContext()
  const loginMessage = (
    <>
      <p>Please log in</p>
      <LoginForm />
    </>
  )
  return <>{isLoggedIn ? children : loginMessage}</>
}
export default LoggedInCheck
