import { useAxios } from '../../hooks/useAxios'
import { useState } from 'react'
import TrackedGoal from './TrackedGoal'
import { TrackedGoalType } from '../../types/GoalTypes'

const TRACKED_GOALS_URL = 'http://localhost:3000/api/v1/tracked_goals'

const TrackedGoals = () => {
  const { loading, error, makeRequest } = useAxios()
  const [trackedGoals, setTrackedGoals] = useState()

  const handleResponse = (data) => {
    setTrackedGoals(data)
  }

  const fetchTrackedGoals = () => {
    makeRequest(
      {
        method: 'get',
        url: TRACKED_GOALS_URL,
      },
      handleResponse
    )
  }
  return (
    <div>
      <h2>Tracked Goals</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button onClick={fetchTrackedGoals}>Get Tracked Goals</button>
      {trackedGoals &&
        trackedGoals.map((trackedGoal: TrackedGoalType) => (
          <TrackedGoal key={trackedGoal.id} trackedGoal={trackedGoal} />
        ))}
    </div>
  )
}
export default TrackedGoals
