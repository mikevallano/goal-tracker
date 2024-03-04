import axios, { AxiosError } from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

const LOGIN_URL = 'http://localhost:3000/api/v1/login'

type ErrorResponseType = {
  error: string
}

type loginParams = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const { handleLogIn } = useAuthContext()
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const sendLoginRequest = async (params: loginParams) => {
    try {
      setLoading(true)
      setError(null)
      const { email, password } = params
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      })
      setLoading(false)
      setError(null)
      handleLogIn(response.data['auth_token'])
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseType>
        if (axiosError.response && axiosError.response.data.error) {
          setError(axiosError.response.data.error)
        } else {
          setError('Something went wrong...')
        }
      } else {
        setError('Something went wrong...')
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (email === '' || password === '') {
      setError('Must enter email and password')
    } else {
      sendLoginRequest({ email, password })
      form.reset()
    }
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <section>
          <label>Email:</label>
          <input type='email' name='email' />
        </section>
        <section>
          <label>Password:</label>
          <input type='password' name='password' />
        </section>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default LoginForm
