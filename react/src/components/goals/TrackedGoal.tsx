import { TrackedGoalType } from '../../types/GoalTypes'

type TrackedGoalParams = {
  trackedGoal: TrackedGoalType
}

const TrackedGoal = ({ trackedGoal }: TrackedGoalParams) => {
  return (
    <div>
      <p>{trackedGoal.goal}</p>
    </div>
  )
}
export default TrackedGoal
