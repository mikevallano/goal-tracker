import { useAxios } from '../../hooks/useAxios'
import TrackedGoal from './TrackedGoal'
import { TrackedGoalType } from '../../types/GoalTypes'
import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import TrackedGoalForm from './TrackedGoalForm'
import './Goals.css'
import { useState } from 'react'

const TRACKED_GOALS_URL = 'http://localhost:3000/api/v1/tracked_goals'

const TrackedGoals = () => {
  const { loading, error, makeRequest } = useAxios()
  const { trackedGoals, setTrackedGoals } = useGoalManagementContext()
  const [addNewGoal, setAddNewGoal] = useState(false)

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
      <div className='get-tracked-goals'>
        <select
          name='dateSelect'
          id='trackedGoalDateSelect'
          onChange={handleDateSelect}
        >
          <option value=''>Choose a week</option>
          <option value='this-week'>This week</option>
          <option value='last-week'>Last week</option>
          <option value='next-week'>Next week</option>
        </select>
        {!trackedGoals && (
          <button onClick={fetchTrackedGoals}>Get Tracked Goals</button>
        )}
      </div>
      {!addNewGoal && (
        <button onClick={() => setAddNewGoal(true)}>Add new goal</button>
      )}
      {addNewGoal && <TrackedGoalForm setAddNewGoal={setAddNewGoal} />}
      <div className='tracked-goals-container'>
        {trackedGoals &&
          trackedGoals.map((trackedGoal: TrackedGoalType) => (
            <TrackedGoal key={trackedGoal.id} trackedGoal={trackedGoal} />
          ))}
      </div>
    </div>
  )
}
export default TrackedGoals
