import { WinType } from '../../types/WinType'

type WinProps = {
  win: WinType
}

const Win = ({ win }: WinProps) => {
  return (
    <div className='card'>
      <p className='card-header'>{win.title}</p>
      <p>{win.description}</p>
      <p>{win.happened_at}</p>
    </div>
  )
}
export default Win
