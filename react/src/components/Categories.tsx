import { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import Category from './Category'

const CATEGORIES_URL = 'http://localhost:3000/api/v1/categories'

const Categories = () => {
  const { makeRequest, data, loading, error } = useAxios()
  const [categories, setCategories] = useState([])

  const fetchCategories = () => {
    makeRequest({ method: 'get', url: CATEGORIES_URL })
  }

  useEffect(() => {
    setCategories(data)
  }, [data])

  return (
    <div>
      <h2>Categories: </h2>
      {error && <p>{error}</p>}
      {loading && <p>{loading}</p>}
      <button onClick={fetchCategories}>Get categories</button>
      {categories &&
        categories.map((category) => {
          return (
            <Category
              key={category.id}
              name={category.name}
              description={category.description}
            />
          )
        })}
    </div>
  )
}
export default Categories
