import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1'

type TestProps = {
  authHeader: string
}

const Test = ({ authHeader }: TestProps) => {
  const fetchKits = () => {
    axios(`${BASE_URL}/ping`, {
      headers: { Authorization: `Bearer ${authHeader}` },
    }).then((json) => console.log(json))
  }

  return (
    <div>
      <h3>Tester</h3>
      <button onClick={fetchKits}>Test Connection</button>
    </div>
  )
}
export default Test
