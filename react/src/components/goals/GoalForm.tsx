import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import { useAxios } from '../../hooks/useAxios'
import { Dispatch } from 'react'

const GOALS_URL = 'http://localhost:3000/api/v1/goals'

type GoalFormProps = {
  setIsAdding: Dispatch<boolean>
}

const GoalForm = ({ setIsAdding }: GoalFormProps) => {
  const { setGoals, categories } = useGoalManagementContext()
  const { loading, error, setError, makeRequest } = useAxios()

  const addGoal = (data) => {
    setGoals((prev) => [data, ...prev])
  }

  const sendRequest = (
    name: string,
    description: string,
    category_id: string
  ) => {
    const config = {
      method: 'post',
      url: GOALS_URL,
      params: { name, description, category_id },
    }
    makeRequest(config, addGoal)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const categoryId = formData.get('categoryId') as string
    const description = formData.get('description') as string

    if (name === '' || categoryId === '') {
      setError('Must enter a name and category')
    } else {
      setIsAdding(false)
      sendRequest(name, description, categoryId)
      form.reset()
    }
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' />
        </section>
        <section>
          <label htmlFor='category'>Select Category</label>
          <select name='categoryId'>
            {[
              <option value='' key='0'>
                Select
              </option>,
              ...categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              }),
            ]}
          </select>
        </section>
        <section>
          <label htmlFor='description'>Description</label>
          <input type='text' name='description' />
        </section>
        <button className='btn btn-sm' onSubmit={handleSubmit}>
          Add Goal
        </button>
      </form>
    </>
  )
}
export default GoalForm
