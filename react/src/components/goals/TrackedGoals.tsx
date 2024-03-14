import { useAxios } from '../../hooks/useAxios'
import TrackedGoal from './TrackedGoal'
import { TrackedGoalType } from '../../types/GoalTypes'
import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import TrackedGoalForm from './TrackedGoalForm'

const TRACKED_GOALS_URL = 'http://localhost:3000/api/v1/tracked_goals'

const TrackedGoals = () => {
  const { loading, error, makeRequest } = useAxios()
  const { trackedGoals, setTrackedGoals } = useGoalManagementContext()

  const handleResponse = (data) => {
    setTrackedGoals(data)
  }

  const fetchTrackedGoals = (param: string | null) => {
    makeRequest(
      {
        method: 'get',
        url: param ? `${TRACKED_GOALS_URL}?${param}` : TRACKED_GOALS_URL,
      },
      handleResponse
    )
  }

  const handleDateSelect = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.target.value
    if (value) {
      fetchTrackedGoals(`timeframe=${value}`)
    }
  }
  return (
    <div>
      <h2>Tracked Goals</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button onClick={fetchTrackedGoals}>Get Tracked Goals</button>
      <select
        name='dateSelect'
        id='trackedGoalDateSelect'
        onChange={handleDateSelect}
      >
        <option value=''>Choose a week</option>
        <option value='this-week'>This week</option>
        <option value='last-week'>Last week</option>
      </select>
      <TrackedGoalForm />
      {trackedGoals &&
        trackedGoals.map((trackedGoal: TrackedGoalType) => (
          <TrackedGoal key={trackedGoal.id} trackedGoal={trackedGoal} />
        ))}
    </div>
  )
}
export default TrackedGoals
