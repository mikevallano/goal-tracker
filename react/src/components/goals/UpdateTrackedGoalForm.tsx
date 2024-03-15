import { TrackedGoalType } from '../../types/GoalTypes'
import { useAxios } from '../../hooks/useAxios'
import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import { Dispatch } from 'react'

const UPDATE_URL = 'http://localhost:3000/api/v1/tracked_goals'

type UpdateTrackedGoalFormProps = {
  trackedGoal: TrackedGoalType
  setIsEditing: Dispatch<boolean>
}

const UpdateTrackedGoalForm = ({
  trackedGoal,
  setIsEditing,
}: UpdateTrackedGoalFormProps) => {
  const { loading, error, makeRequest } = useAxios()
  const { setTrackedGoals } = useGoalManagementContext()

  const updateTrackedGoal = (data: {}) => {
    setTrackedGoals((prev) => {
      return prev.map((prevTrackedGoal) => {
        return prevTrackedGoal.id === data.id ? data : prevTrackedGoal
      })
    })
  }

  const sendRequest = (params: {}) => {
    const config = {
      url: `${UPDATE_URL}/${trackedGoal.id}`,
      method: 'put',
      params: params,
    }
    makeRequest(config, updateTrackedGoal)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('got submitted')
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const notes = formData.get('notes') as string
    const progress_rating = formData.get('progressRating') as string

    if (
      notes === trackedGoal.notes &&
      progress_rating == trackedGoal.progress_rating.toString()
    ) {
      setIsEditing(false)
    } else {
      setIsEditing(false)
      sendRequest({ notes: notes, progress_rating: progress_rating })
      form.reset()
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor='notes'>Notes</label>
          <input type='text' name='notes' defaultValue={trackedGoal.notes} />
        </section>
        <section>
          <label htmlFor='progress-rating'>Progress Rating</label>
          <input
            type='number'
            name='progressRating'
            defaultValue={trackedGoal.progress_rating || 1}
            min='1'
            max='5'
            step='1'
          />
        </section>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
export default UpdateTrackedGoalForm
