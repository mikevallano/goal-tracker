import { useEffect } from 'react'
import { useAxios } from '../hooks/useAxios'
import useFetchCategories from '../hooks/useFetchCategories'
import useGoalManagementContext from '../hooks/useGoalManagementContext'
import Category from './Category'

const Categories = () => {
  const { loading, error } = useAxios()
  const { categories } = useGoalManagementContext()
  const { fetchCategories } = useFetchCategories()

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <h2>Categories: </h2>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!categories && <button onClick={fetchCategories}>Get categories</button>}
      {categories &&
        categories.map((category) => {
          return <Category key={category.id} name={category.name} />
        })}
    </div>
  )
}
export default Categories
