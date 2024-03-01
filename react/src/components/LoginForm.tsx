import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const LoginForm: React.FC = () => {
  const { handleLogIn } = useAuthContext()

  const sendLoginRequest = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/v1/login', {
      email,
      password,
    })
    handleLogIn(response.data['auth_token'])
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    sendLoginRequest(email, password)
    form.reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Email:</label>
          <input type='text' name='email' />
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
