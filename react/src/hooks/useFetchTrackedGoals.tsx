import { useAxios } from './useAxios'
import useGoalManagementContext from './useGoalManagementContext'

const TRACKED_GOALS_URL = 'http://localhost:3000/api/v1/tracked_goals'

const useFetchTrackedGoals = () => {
  const { makeRequest } = useAxios()
  const { setTrackedGoals } = useGoalManagementContext()

  const fetchTrackedGoals = (param: string | null) => {
    const requestParam = param || 'this-week'
    makeRequest(
      {
        method: 'get',
        url: `${TRACKED_GOALS_URL}?timeframe=${requestParam}`,
      },
      setTrackedGoals
    )
  }
  return { fetchTrackedGoals }
}
export default useFetchTrackedGoals
