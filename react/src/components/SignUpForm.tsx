import { useState } from 'react'
import { requestConfigParams, useAxios } from '../hooks/useAxios'
import { useAuthContext } from '../hooks/useAuthContext'

const SIGNUP_URL = 'http://localhost:3000/api/v1/signup'

type SignInParams = {
  email: string
  password: string
}

const SignUpForm = () => {
  const [userCreated, setUserCreated] = useState(false)
  const { handleLogIn } = useAuthContext()
  const { makeRequest, loading, error, setError } = useAxios()

  const setTokenResponse = (data) => {
    handleLogIn(data['auth_token'])
    setUserCreated(true)
  }

  const sendRequest = (params: SignInParams) => {
    const requestParams: requestConfigParams = {
      method: 'post',
      url: SIGNUP_URL,
      params: params,
    }
    makeRequest(requestParams, setTokenResponse)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (email === '' || password === '') {
      setError('Must enter email and password')
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters')
    } else {
      sendRequest({ email, password })
      form.reset()
    }
  }
  const formElement = (
    <form onSubmit={handleSubmit}>
      <section>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' />
      </section>
      <section>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' />
      </section>
      <button type='submit'>Sign Up</button>
    </form>
  )
  return (
    <>
      <h3>Sign Up for a new account</h3>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      {!userCreated && formElement}
    </>
  )
}
export default SignUpForm
