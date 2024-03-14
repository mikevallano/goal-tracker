import { useAxios } from '../hooks/useAxios'
import useCategoriesGoalsContext from '../hooks/useCategoriesGoalsContext'
import Category from './Category'

const CATEGORIES_URL = 'http://localhost:3000/api/v1/categories'

const Categories = () => {
  const { makeRequest, loading, error } = useAxios()
  const { categories, setCategories } = useCategoriesGoalsContext()

  const fetchCategories = () => {
    makeRequest(
      {
        method: 'get',
        url: CATEGORIES_URL,
      },
      setCategories
    )
  }

  return (
    <div>
      <h2>Categories: </h2>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <button onClick={fetchCategories}>Get categories</button>
      {categories &&
        categories.map((category) => {
          return <Category key={category.id} name={category.name} />
        })}
    </div>
  )
}
export default Categories
