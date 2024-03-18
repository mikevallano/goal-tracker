import { TrackedGoalType } from '../../types/GoalTypes'
import UpdateTrackedGoalForm from './UpdateTrackedGoalForm'
import { useState } from 'react'
import './Goals.css'

type TrackedGoalParams = {
  trackedGoal: TrackedGoalType
}

const TrackedGoal = ({ trackedGoal }: TrackedGoalParams) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className='tracked-goal-contianer'>
      <h4>{trackedGoal.goal.name}</h4>
      {!isEditing && (
        <>
          <p>Notes: {trackedGoal.notes}</p>
          <p>Progress rating: {trackedGoal.progress_rating}</p>
          <button onClick={() => setIsEditing(true)}>Track</button>
        </>
      )}
      {isEditing && (
        <UpdateTrackedGoalForm
          trackedGoal={trackedGoal}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  )
}
export default TrackedGoal
