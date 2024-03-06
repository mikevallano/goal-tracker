import { useEffect, useState } from 'react'
import { MakeRequestParams, useAxios } from '../hooks/useAxios'

const SIGNUP_URL = 'http://localhost:3000/api/v1/signup'

type SignInParams = {
  email: string
  password: string
}

type SignInResponse = {
  auth_token: string
}

const SignUpForm = () => {
  const [userCreated, setUserCreated] = useState(false)
  const { makeRequest, loading, error, setError, data } =
    useAxios<SignInResponse>()

  const sendRequest = (params: SignInParams) => {
    const requestParams: MakeRequestParams = {
      method: 'post',
      url: SIGNUP_URL,
      params: params,
    }
    makeRequest(requestParams)
  }

  useEffect(() => {
    if (data) {
      setUserCreated(true)
    } else if (error) {
      setUserCreated(false)
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
