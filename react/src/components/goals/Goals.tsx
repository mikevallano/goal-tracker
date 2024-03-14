import { useAxios } from '../../hooks/useAxios'
import useGoalManagmentContext from '../../hooks/useGoalManagementContext'
import Goal from './Goal'

const GOALS_URL = 'http://localhost:3000/api/v1/goals'

const Goals = () => {
  const { loading, error, makeRequest } = useAxios()
  const { goals, setGoals } = useGoalManagmentContext()

  const fetchGoals = () => {
    makeRequest(
      {
        method: 'get',
        url: GOALS_URL,
      },
      setGoals
    )
  }
  return (
    <div>
      <h2>Goals</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button onClick={fetchGoals}>Get goals</button>
      {goals && goals.map((goal) => <Goal key={goal.id} goal={goal} />)}
    </div>
  )
}
export default Goals
