import './App.css'
import LoginForm from './components/LoginForm'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { isLoggedIn } = useAuthContext()
  console.log(`isLoggedIn:`, isLoggedIn)
  return (
    <>
      <h2>Goal Tracker</h2>
      <p>isLoggedIn: {isLoggedIn}</p>
      {/* <LoginForm /> */}
    </>
  )
}

export default App
