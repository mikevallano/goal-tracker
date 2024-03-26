import { TrackedGoalType } from '../../types/GoalTypes'
import UpdateTrackedGoalForm from './UpdateTrackedGoalForm'
import { useState } from 'react'
import { MdOutlineNoteAdd } from 'react-icons/md'
import './Goals.css'

type TrackedGoalParams = {
  trackedGoal: TrackedGoalType
}

const TrackedGoal = ({ trackedGoal }: TrackedGoalParams) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className='card'>
      <div className='display-flex align-center'>
        <p className='card-header'>{trackedGoal.goal.name}</p>
        <MdOutlineNoteAdd
          onClick={() => setIsEditing((prev) => !prev)}
          className='add-notes-icon'
        />
      </div>
      {!isEditing && (
        <div className='goal-notes'>
          {trackedGoal.notes && (
            <p>
              <strong>Notes:</strong> {trackedGoal.notes}
            </p>
          )}
          {trackedGoal.notes && (
            <p>
              <strong>Rating:</strong> {trackedGoal.progress_rating}
            </p>
          )}
        </div>
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
