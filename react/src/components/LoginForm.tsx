import { useState } from 'react'
import axios from 'axios'
import Test from './Test'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authHeader, setAuthHeader] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const sendLoginRequest = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/v1/login', {
      email,
      password,
    })
    console.log('response: ', response)
    setAuthHeader(response.data['auth_token'])
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendLoginRequest(email, password)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type='email' value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
      <Test authHeader={authHeader} />
    </>
  )
}

export default LoginForm
