import { useAxios } from './useAxios'
import useGoalManagmentContext from './useGoalManagementContext'
import baseUrl from '../config'

const GOALS_URL = `${baseUrl}/api/v1/goals`

const useFetchGoals = () => {
  const { makeRequest } = useAxios()
  const { setGoals } = useGoalManagmentContext()

  const fetchGoals = () => {
    makeRequest(
      {
        method: 'get',
        url: GOALS_URL,
      },
      setGoals
    )
  }

  return { fetchGoals }
}

export default useFetchGoals
