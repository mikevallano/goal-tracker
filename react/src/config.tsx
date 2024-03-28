const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://goal-tracking-1ee07128703e.herokuapp.com'
    : 'http://localhost:3000'

export default baseUrl
