import { useAxios } from '../../hooks/useAxios'
import TrackedGoal from './TrackedGoal'
import { TrackedGoalType } from '../../types/GoalTypes'
import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import TrackedGoalForm from './TrackedGoalForm'
import './Goals.css'
import { useState, useEffect } from 'react'
import useFetchTrackedGoals from '../../hooks/useFetchTrackedGoals'

const TrackedGoals = () => {
  const { loading, error } = useAxios()
  const { trackedGoals } = useGoalManagementContext()
  const [addNewGoal, setAddNewGoal] = useState(false)
  const [week, setWeek] = useState('this-week')
  const { fetchTrackedGoals } = useFetchTrackedGoals()

  useEffect(() => {
    fetchTrackedGoals(week)
  }, [week])

  const handleDateSelect = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.target.value
    if (value && value != week) {
      setWeek(value)
      fetchTrackedGoals(value)
    }
  }
  return (
    <div>
      <h2>Tracked Goals for {week}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='get-tracked-goals'>
        <select
          name='dateSelect'
          id='trackedGoalDateSelect'
          onChange={handleDateSelect}
          value={week}
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
      {addNewGoal && (
        <TrackedGoalForm setAddNewGoal={setAddNewGoal} setWeek={setWeek} />
      )}
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
