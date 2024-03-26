import { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import useFetchCategories from '../hooks/useFetchCategories'
import useGoalManagementContext from '../hooks/useGoalManagementContext'
import Category from './Category'
import CategoryForm from './CategoryForm'
import './goals/Goals.css'

const Categories = () => {
  const { loading, error } = useAxios()
  const { categories } = useGoalManagementContext()
  const { fetchCategories } = useFetchCategories()
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <h2>Categories: </h2>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!categories && <button onClick={fetchCategories}>Get categories</button>}
      {!isAdding && (
        <button className='btn btn-sm' onClick={() => setIsAdding(true)}>
          Add new category
        </button>
      )}
      {isAdding && <CategoryForm setIsAdding={setIsAdding} />}
      <div className='cards-container'>
        {categories &&
          categories.map((category) => {
            return <Category key={category.id} name={category.name} />
          })}
      </div>
    </div>
  )
}
export default Categories
