import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { useState } from 'react'

const LoginOrSignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(true)
  const linkText = isSignedUp ? 'Or Sign Up' : 'Or Log In'
  return (
    <>
      <h2>Must be logged in to continue</h2>
      {isSignedUp && <LoginForm />}
      {!isSignedUp && <SignUpForm />}
      <p
        className='login-signup-link'
        onClick={() => setIsSignedUp((prev) => !prev)}
      >
        {linkText}
      </p>
    </>
  )
}
export default LoginOrSignUp
