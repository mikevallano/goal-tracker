import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const { isLoggedIn, handleLogOut } = useAuthContext()

  const loggedInLinks = (
    <>
      <span>
        <Link to='/categories'>Categories</Link>
      </span>
      <span>
        <Link to='/goals'>Goals</Link>
      </span>
      <span>
        <Link to='/trackedGoals'>Tracked Goals</Link>
      </span>
      <span onClick={handleLogOut}>Log out</span>
    </>
  )
  return (
    <header className='header'>
      <span>
        <Link to='/'>Home</Link>
      </span>
      {isLoggedIn && loggedInLinks}
    </header>
  )
}
export default Header
