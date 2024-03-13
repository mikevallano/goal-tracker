import { useAxios } from '../../hooks/useAxios'
import { useState } from 'react'
import TrackedGoal from './TrackedGoal'

const TRACKED_GOALS_URL = 'http://localhost:3000/api/v1/tracked_goals'

export type TrackedGoalType = {
  created_at: string
  end_date: string | null
  goal: string
  goal_id: number
  id: number
  progress_rating: number | null
  start_date: string | null
  timeframe_type: string
  updated_at: string
}

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
