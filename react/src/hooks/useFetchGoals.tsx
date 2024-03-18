import { useAxios } from './useAxios'
import useGoalManagmentContext from './useGoalManagementContext'

const GOALS_URL = 'http://localhost:3000/api/v1/goals'

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
