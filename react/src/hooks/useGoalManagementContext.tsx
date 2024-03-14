import { useContext } from 'react'
import { GoalManagementContext } from '../contexts/GoalManagementContext'

const useGoalManagementContext = () => {
  const { categories, setCategories, goals, setGoals } = useContext(
    GoalManagementContext
  )
  return { categories, setCategories, goals, setGoals }
}
export default useGoalManagementContext
