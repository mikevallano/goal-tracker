import './App.css'
import LoggedInCheck from './components/LoggedInCheck'
import Categories from './components/Categories'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { isLoggedIn, handleLogOut } = useAuthContext()
  console.log(`isLoggedIn:`, isLoggedIn)
  return (
    <>
      {isLoggedIn && <button onClick={handleLogOut}>Log out</button>}
      <h1>Goal Tracker</h1>
      <LoggedInCheck>
        <Categories />
      </LoggedInCheck>
    </>
  )
}

export default App
