import { TrackedGoalType } from './TrackedGoals'

type TrackedGoalParams = {
  trackedGoal: TrackedGoalType
}

const TrackedGoal = ({ trackedGoal }: TrackedGoalParams) => {
  return (
    <div>
      <p>
        {trackedGoal.goal}{' '}
        <span> tracked by: {trackedGoal.timeframe_type}</span>
      </p>
    </div>
  )
}
export default TrackedGoal
