import { createContext, useState } from 'react'

export const GoalManagementContext = createContext({
  categories: [],
  goals: [],
})

export const GoalManagementProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [goals, setGoals] = useState([])

  const value = {
    categories,
    setCategories,
    goals,
    setGoals,
  }
  return (
    <GoalManagementContext.Provider value={value}>
      {children}
    </GoalManagementContext.Provider>
  )
}
