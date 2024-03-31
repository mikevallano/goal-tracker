import { useAxios } from '../../hooks/useAxios'
import { useEffect, useState } from 'react'
import baseUrl from '../../config'
import { WinType } from '../../types/WinType'
import Win from './Win'
import { requestConfigParams } from '../../hooks/useAxios'
import AddWinForm from './AddWinForm'

const WINS_URL = `${baseUrl}/api/v1/wins`

const Wins = () => {
  const { loading, error, setError, makeRequest } = useAxios()
  const [wins, setWins] = useState<WinType[]>([])
  const [isAdding, setIsAdding] = useState(false)

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
      {isAdding && (
        <AddWinForm
          setIsAdding={setIsAdding}
          setWins={setWins}
          setError={setError}
        />
      )}
      {!isAdding && (
        <button className='btn btn-sm' onClick={() => setIsAdding(true)}>
          Add a win
        </button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='cards-container'>
        {wins &&
          wins.map((win) => {
            return <Win win={win} key={win.id} />
          })}
      </div>
    </div>
  )
}
export default Wins
