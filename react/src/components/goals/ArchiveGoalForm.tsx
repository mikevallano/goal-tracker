import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import { useAxios } from '../../hooks/useAxios'
import { GoalType } from '../../types/GoalTypes'
import './Goals.css'
import '../../App.css'
import baseUrl from '../../config'

type ArchiveGoalProps = {
  goal: GoalType
}

const ArchiveGoalForm = ({ goal }: ArchiveGoalProps) => {
  const { setGoals } = useGoalManagementContext()
  const { loading, error, makeRequest } = useAxios()

  const goalUrl = `${baseUrl}/api/v1/goals/${goal.id}`

  const archiveGoal = (data: GoalType) => {
    setGoals((prevGoals: [GoalType]) => {
      return prevGoals.filter((prevGoal: GoalType) => prevGoal.id !== data.id)
    })
  }

  const sendRequest = (archivedAt: string) => {
    const config = {
      method: 'patch',
      url: goalUrl,
      params: { archived_at: archivedAt },
    }
    makeRequest(config, archiveGoal)
  }

  const handleArchive = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userConfirmed = window.confirm(
      'Are you sure you want to archive this goal?'
    )
    if (!userConfirmed) return
    const archivedAt = new Date().toISOString()
    sendRequest(archivedAt)
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className='warning'>Error archiving goal: {error}</p>}
      <form onSubmit={handleArchive}>
        <button className='btn btn-xs'>Archive</button>
      </form>
    </>
  )
}
export default ArchiveGoalForm
