import { createContext, useState, ReactNode } from 'react'

export const GoalManagementContext = createContext({
  categories: [],
  goals: [],
  trackedGoals: [],
})

type GoalManagementProviderProps = {
  children: ReactNode
}

export const GoalManagementProvider = ({
  children,
}: GoalManagementProviderProps) => {
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
