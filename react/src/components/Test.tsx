import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const BASE_URL = 'http://localhost:3000/api/v1'

const Test = () => {
  const { authToken } = useAuthContext()
  const fetchKits = () => {
    axios(`${BASE_URL}/ping`, {
      headers: { Authorization: `Bearer ${authToken}` },
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
