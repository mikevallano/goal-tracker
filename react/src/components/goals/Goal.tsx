import { GoalType } from '../../types/GoalTypes'

type GoalProps = {
  goal: GoalType
}

const Goal = ({ goal }: GoalProps) => {
  return (
    <div>
      <h4>{goal.name}</h4>
    </div>
  )
}
export default Goal
