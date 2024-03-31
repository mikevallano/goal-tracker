import { useAxios } from '../../hooks/useAxios'
import { Dispatch, useEffect } from 'react'
import '../goals/Goals.css'
import baseUrl from '../../config'
import { requestConfigParams } from '../../hooks/useAxios'
import { WinType } from '../../types/WinType'
import useGoalManagementContext from '../../hooks/useGoalManagementContext'
import useFetchCategories from '../../hooks/useFetchCategories'

type AddWinFormProps = {
  setIsAdding: Dispatch<boolean>
  setError: Dispatch<string | null>
  setWins: Dispatch<WinType[]>
}

const ADD_WIN_URL = `${baseUrl}/api/v1/wins`

const AddWinForm = ({ setIsAdding, setWins, setError }: AddWinFormProps) => {
  const { loading, error, makeRequest } = useAxios()
  const { categories } = useGoalManagementContext()
  const { fetchCategories } = useFetchCategories()

  useEffect(() => {
    fetchCategories()
  }, [])

  const addWin = (data) => {
    setWins((prev) => {
      return [data, ...prev]
    })
  }

  const sendRequest = (
    title: string,
    description: string,
    categoryId: string
  ) => {
    const config: requestConfigParams = {
      url: ADD_WIN_URL,
      method: 'post',
      params: {
        title,
        description,
        category_id: categoryId,
      },
    }
    makeRequest(config, addWin)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('got submitted')
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = formData.get('categoryId') as string

    if (title === '' || categoryId === '') {
      setError('Must enter title and category')
    } else {
      setIsAdding(false)
      sendRequest(title, description, categoryId)
      form.reset()
    }
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p>Add a win</p>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Title:</label>
          <input type='text' id='title' name='title' />
        </section>
        <section>
          <label>Description:</label>
          <input type='text' id='description' name='description' />
        </section>
        <section>
          <label htmlFor='categoryId'>Category</label>
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
        <button className='btn btn-sm'>Add</button>
      </form>
    </>
  )
}
export default AddWinForm
