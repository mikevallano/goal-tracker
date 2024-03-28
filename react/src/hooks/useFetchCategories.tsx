import { useAxios } from './useAxios'
import useGoalManagementContext from './useGoalManagementContext'
import baseUrl from '../config'

const CATEGORIES_URL = `${baseUrl}/api/v1/categories`

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
