import './App.css'
import LoginForm from './components/LoginForm'
import Test from './components/Test'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { isLoggedIn } = useAuthContext()
  console.log(`isLoggedIn:`, isLoggedIn)
  return (
    <>
      <h2>Goal Tracker</h2>
      <LoginForm />
      <Test />
    </>
  )
}

export default App
