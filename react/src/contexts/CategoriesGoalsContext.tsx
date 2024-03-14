import { createContext, useState } from 'react'

export const CategoriesGoalsContext = createContext({
  categories: [],
  goals: [],
})

export const CategoriesGoalsProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [goals, setGoals] = useState([])

  const value = {
    categories,
    setCategories,
    goals,
    setGoals,
  }
  return (
    <CategoriesGoalsContext.Provider value={value}>
      {children}
    </CategoriesGoalsContext.Provider>
  )
}
