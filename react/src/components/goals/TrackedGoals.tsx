import { useAxios } from '../../hooks/useAxios'
import TrackedGoal from './TrackedGoal'
import { TrackedGoalType } from '../../types/GoalTypes'
import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import TrackedGoalForm from './TrackedGoalForm'
import './Goals.css'
import { useState } from 'react'
import useFetchTrackedGoals from '../../hooks/useFetchTrackedGoals'

const TrackedGoals = () => {
  const { loading, error } = useAxios()
  const { trackedGoals } = useGoalManagementContext()
  const [addNewGoal, setAddNewGoal] = useState(false)
  const { fetchTrackedGoals } = useFetchTrackedGoals()

  const handleDateSelect = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.target.value
    if (value) {
      fetchTrackedGoals(value)
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
          <button className='btn btn-sm' onClick={fetchTrackedGoals}>
            Get Tracked Goals
          </button>
        )}
      </div>
      {!addNewGoal && (
        <button className='btn btn-sm' onClick={() => setAddNewGoal(true)}>
          Add new goal
        </button>
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
