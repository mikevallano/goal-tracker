import useGoalManagementContext from '../hooks/useGoalManagementContext'
import { useAxios } from '../hooks/useAxios'
import { Dispatch } from 'react'
import baseUrl from '../config'

const CATEGORIES_URL = `${baseUrl}/api/v1/categories`

type CategoryFormProps = {
  setIsAdding: Dispatch<boolean>
}

const CategoryForm = ({ setIsAdding }: CategoryFormProps) => {
  const { setCategories } = useGoalManagementContext()
  const { error, setError, loading, makeRequest } = useAxios()

  const addCategory = (data) => {
    setCategories((prev) => [data, ...prev])
  }

  const sendRequest = (name: string) => {
    const config = {
      method: 'post',
      url: CATEGORIES_URL,
      params: { name },
    }
    makeRequest(config, addCategory)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('got submitted')
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    console.log('name: ', name)

    if (name === '') {
      setError('Must enter a name')
    } else {
      setIsAdding(false)
      sendRequest(name)
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
          <input type='name' name='name' />
        </section>
        <button type='submit' className='btn btn-sm'>
          Add
        </button>
      </form>
    </>
  )
}
export default CategoryForm
