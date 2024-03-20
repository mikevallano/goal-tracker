import { useEffect } from 'react'
import { useAxios } from '../../hooks/useAxios'
import useFetchGoals from '../../hooks/useFetchGoals'
import useGoalManagmentContext from '../../hooks/useGoalManagementContext'
import Goal from './Goal'

const Goals = () => {
  const { loading, error } = useAxios()
  const { goals } = useGoalManagmentContext()
  const { fetchGoals } = useFetchGoals()

  useEffect(() => {
    fetchGoals()
  }, [])

  return (
    <div>
      <h2>Goals</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!goals && <button onClick={fetchGoals}>Get goals</button>}
      {goals && goals.map((goal) => <Goal key={goal.id} goal={goal} />)}
    </div>
  )
}
export default Goals
