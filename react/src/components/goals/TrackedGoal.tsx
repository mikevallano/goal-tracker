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
    <div className='tracked-goal-contianer'>
      <div className='display-flex'>
        <p className='goal-name'>{trackedGoal.goal.name}</p>
        <MdOutlineNoteAdd
          onClick={() => setIsEditing((prev) => !prev)}
          className='display-inline align-self-center'
        />
      </div>
      {!isEditing && (
        <>
          {trackedGoal.notes && <p>Notes: {trackedGoal.notes}</p>}
          {trackedGoal.notes && (
            <p>Progress rating: {trackedGoal.progress_rating}</p>
          )}
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
