import { useEffect, useState } from 'react'
import { useAxios } from '../../hooks/useAxios'
import useFetchGoals from '../../hooks/useFetchGoals'
import useGoalManagmentContext from '../../hooks/useGoalManagementContext'
import Goal from './Goal'
import GoalForm from './GoalForm'
import './Goals.css'
import useFetchCategories from '../../hooks/useFetchCategories'

const Goals = () => {
  const { loading, error } = useAxios()
  const { goals } = useGoalManagmentContext()
  const { fetchGoals } = useFetchGoals()
  const { fetchCategories } = useFetchCategories()
  const [isAdding, setisAdding] = useState(false)

  useEffect(() => {
    fetchGoals()
    fetchCategories()
  }, [])

  return (
    <div>
      <h2>Goalzzz</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!goals && <button onClick={fetchGoals}>Get goals</button>}
      {isAdding && <GoalForm setIsAdding={setisAdding} />}
      {!isAdding && (
        <button className='btn btn-sm' onClick={() => setisAdding(true)}>
          Add new goal
        </button>
      )}
      <div className='cards-container'>
        {goals && goals.map((goal) => <Goal key={goal.id} goal={goal} />)}
      </div>
    </div>
  )
}
export default Goals
