import { useAxios } from '../../hooks/useAxios'
import { useEffect, useState } from 'react'
import baseUrl from '../../config'
import { WinType } from '../../types/WinType'
import Win from './Win'
import { requestConfigParams } from '../../hooks/useAxios'

const WINS_URL = `${baseUrl}/api/v1/wins`

const Wins = () => {
  const { loading, error, makeRequest } = useAxios()
  const [wins, setWins] = useState<WinType[]>([])

  const fetchWins = () => {
    const config: requestConfigParams = {
      url: WINS_URL,
      method: 'get',
    }
    makeRequest(config, setWins)
  }

  useEffect(() => {
    fetchWins()
  }, [])

  return (
    <div>
      <h2>Wins</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {wins &&
        wins.map((win) => {
          return <Win win={win} key={win.id} />
        })}
    </div>
  )
}
export default Wins
