import { useContext } from 'react'
import { CategoriesGoalsContext } from '../contexts/CategoriesGoalsContext'

const useCategoriesGoalsContext = () => {
  const { categories, setCategories, goals, setGoals } = useContext(
    CategoriesGoalsContext
  )
  return { categories, setCategories, goals, setGoals }
}
export default useCategoriesGoalsContext
