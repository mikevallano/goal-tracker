import './App.css'
import LoggedInCheck from './components/LoggedInCheck'
import Categories from './components/Categories'
import Goals from './components/goals/Goals'
import TrackedGoals from './components/goals/TrackedGoals'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'

function App() {
  return (
    <>
      <Header />
      <LoggedInCheck>
        <Routes>
          <Route path='/categories' element={<Categories />} />
          <Route path='/goals' element={<Goals />} />
          <Route path='/trackedGoals' element={<TrackedGoals />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </LoggedInCheck>
    </>
  )
}

export default App
