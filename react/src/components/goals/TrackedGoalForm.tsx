import { Dispatch, useEffect } from 'react'
import { useAxios } from '../../hooks/useAxios'
import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import './Goals.css'
import useFetchGoals from '../../hooks/useFetchGoals'

const TRACKED_GOAL_URL = 'http://localhost:3000/api/v1/tracked_goals'

type TrackedGoalCreateParams = {
  goal_id: string
  timeframe: string
  timeframe_type: string
}

type TrackedGoalFormProps = {
  setAddNewGoal: Dispatch<boolean>
}

const TrackedGoalForm = ({ setAddNewGoal }: TrackedGoalFormProps) => {
  const { error, setError, loading, makeRequest } = useAxios()
  const { goals, setTrackedGoals } = useGoalManagementContext()
  const { fetchGoals } = useFetchGoals()

  useEffect(() => {
    {
      !goals && fetchGoals()
    }
  }, [])

  const handleCreate = (data: {}) => {
    setTrackedGoals((prev: []) => [data, ...prev])
  }

  const sendRequest = (params: TrackedGoalCreateParams) => {
    const config = {
      method: 'post',
      url: TRACKED_GOAL_URL,
      params: params,
    }
    console.log('params: ', params)
    makeRequest(config, handleCreate)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('got submitted')
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const goalId = formData.get('goalId') as string
    const timeframe = formData.get('timeframe') as string

    if (goalId === '' || timeframe === '') {
      setError('Must enter goalId and timeframe')
    } else {
      setAddNewGoal(false)
      sendRequest({ goal_id: goalId, timeframe, timeframe_type: 'week' })
      form.reset()
    }
  }
  return (
    <div className='add-tracked-goal-form-container'>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <h4>Track a new goal</h4>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Select Goal</label>
          <select name='goalId' id='goal'>
            {goals.map((goal) => {
              return (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              )
            })}
          </select>
        </section>
        <section>
          <select name='timeframe'>
            <option value='this-week'>This Week</option>
            <option value='next-week'>Next Week</option>
          </select>
        </section>
        <button type='submit'>Add Tracked Goal</button>
      </form>
    </div>
  )
}
export default TrackedGoalForm
