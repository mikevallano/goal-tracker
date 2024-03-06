import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from 'react'
import { MakeRequestParams, useAxios } from '../hooks/useAxios'

const LOGIN_URL = 'http://localhost:3000/api/v1/login'

type loginParams = {
  email: string
  password: string
}

type LoginResponse = {
  auth_token: string
}

const LoginForm: React.FC = () => {
  const { handleLogIn, authToken } = useAuthContext()
  const { makeRequest, loading, error, setError, data } =
    useAxios<LoginResponse>()

  const sendRequest = (params: loginParams) => {
    const requestParams: MakeRequestParams = {
      method: 'post',
      url: LOGIN_URL,
      params: params,
    }
    makeRequest(requestParams)
  }

  useEffect(() => {
    if (!authToken && data) {
      const { auth_token: newToken } = data
      handleLogIn(newToken)
    }
  }, [data, error])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (email === '' || password === '') {
      setError('Must enter email and password')
    } else {
      sendRequest({ email, password })
      form.reset()
    }
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h3>Log In to Goal Tracker</h3>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Email:</label>
          <input type='email' name='email' />
        </section>
        <section>
          <label>Password:</label>
          <input type='password' name='password' />
        </section>
        <button type='submit'>Log In</button>
      </form>
    </>
  )
}

export default LoginForm
