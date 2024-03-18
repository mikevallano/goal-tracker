import { useAxios } from './useAxios'
import useGoalManagementContext from './useGoalManagementContext'

const CATEGORIES_URL = 'http://localhost:3000/api/v1/categories'

const useFetchCategories = () => {
  const { setCategories } = useGoalManagementContext()
  const { makeRequest } = useAxios()

  const fetchCategories = () => {
    makeRequest(
      {
        method: 'get',
        url: CATEGORIES_URL,
      },
      setCategories
    )
  }
  return { fetchCategories }
}
export default useFetchCategories
