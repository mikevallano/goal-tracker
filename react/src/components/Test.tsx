import { useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1'

const Test = () => {
  const fetchKits = () => {
    axios(`${BASE_URL}/ping`).then((json) => console.log(json))
  }

  useEffect(() => {
    fetchKits()
  }, [])

  return <div>Test</div>
}
export default Test
