import { TrackedGoalType } from '../../types/GoalTypes'
import UpdateTrackedGoalForm from './UpdateTrackedGoalForm'
import { useState } from 'react'

type TrackedGoalParams = {
  trackedGoal: TrackedGoalType
}

const TrackedGoal = ({ trackedGoal }: TrackedGoalParams) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div>
      <p>{trackedGoal.goal}</p>
      <p>Notes: {trackedGoal.notes}</p>
      <p>Progress rating: {trackedGoal.progress_rating}</p>
      <button onClick={() => setIsEditing(true)}>Track</button>
      {isEditing && <UpdateTrackedGoalForm trackedGoal={trackedGoal} />}
    </div>
  )
}
export default TrackedGoal
