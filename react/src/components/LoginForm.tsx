import { useAuthContext } from '../hooks/useAuthContext'
import { requestConfigParams, useAxios } from '../hooks/useAxios'

const LOGIN_URL = 'http://localhost:3000/api/v1/login'

type loginParams = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const { handleLogIn } = useAuthContext()
  const { makeRequest, loading, error, setError } = useAxios()

  const setTokenResponse = (data) => {
    handleLogIn(data['auth_token'])
  }

  const sendRequest = (params: loginParams) => {
    const requestConfig: requestConfigParams = {
      method: 'post',
      url: LOGIN_URL,
      params: params,
    }
    makeRequest(requestConfig, setTokenResponse)
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
        <button className='btn btn-sm' type='submit'>
          Log In
        </button>
      </form>
    </>
  )
}

export default LoginForm
