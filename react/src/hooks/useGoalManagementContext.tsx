import { useContext } from 'react'
import { GoalManagementContext } from '../contexts/GoalManagementContext'

const useGoalManagementContext = () => {
  const {
    categories,
    setCategories,
    goals,
    setGoals,
    trackedGoals,
    setTrackedGoals,
  } = useContext(GoalManagementContext)
  return {
    categories,
    setCategories,
    goals,
    setGoals,
    trackedGoals,
    setTrackedGoals,
  }
}
export default useGoalManagementContext
