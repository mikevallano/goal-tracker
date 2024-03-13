import { useAxios } from '../../hooks/useAxios'
import { useState } from 'react'
import TrackedGoal from '../TrackedGoal'

const TRACKED_GOALS_URL = 'http://localhost:3000/api/v1/tracked_goals'

const TrackedGoals = () => {
  const { loading, error, makeRequest } = useAxios()
  const [trackedGoals, setTrackedGoals] = useState()

  const fetchTrackedGoals = () => {
    makeRequest(
      {
        method: 'get',
        url: TRACKED_GOALS_URL,
      },
      setTrackedGoals
    )
  }
  return (
    <div>
      <h2>Tracked Goals</h2>
      <button onClick={fetchTrackedGoals}>Get Tracked Goals</button>
      {trackedGoals &&
        trackedGoals.map((trackedGoal) => (
          <TrackedGoal id={trackedGoal.id} trackedGoal={trackedGoal} />
        ))}
    </div>
  )
}
export default TrackedGoals
