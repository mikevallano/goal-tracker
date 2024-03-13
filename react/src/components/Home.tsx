import LoginOrSignUp from './LoginOrSignUp'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
  const { isLoggedIn } = useAuthContext()
  return (
    <div>
      <h2>Goal Tracker Home</h2>
      {!isLoggedIn && <LoginOrSignUp />}
    </div>
  )
}
export default Home
