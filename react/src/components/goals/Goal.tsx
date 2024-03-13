import { GoalType } from './Goals'

const Goal = ({ goal }: GoalType) => {
  return (
    <div>
      <h4>{goal.name}</h4>
    </div>
  )
}
export default Goal
