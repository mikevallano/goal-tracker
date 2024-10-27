import { GoalType } from '../../types/GoalTypes'
import ArchiveGoalForm from './ArchiveGoalForm'
import './Goals.css'

type GoalProps = {
  goal: GoalType
}

const Goal = ({ goal }: GoalProps) => {
  return (
    <div className='card'>
      <p className='card-header'>{goal.name}</p>
      <p>{goal.category.name}</p>
      <ArchiveGoalForm goal={goal} />
    </div>
  )
}
export default Goal
