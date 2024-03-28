import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import baseUrl from '../config'

const Test = () => {
  const { authToken } = useAuthContext()
  const fetchKits = () => {
    axios(`${baseUrl}/ping`, {
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
