import { createContext, useState } from 'react'

export const GoalManagementContext = createContext({
  categories: [],
  goals: [],
  trackedGoals: [],
})

export const GoalManagementProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [goals, setGoals] = useState([])
  const [trackedGoals, setTrackedGoals] = useState([])

  const value = {
    categories,
    setCategories,
    goals,
    setGoals,
    trackedGoals,
    setTrackedGoals,
  }
  return (
    <GoalManagementContext.Provider value={value}>
      {children}
    </GoalManagementContext.Provider>
  )
}
