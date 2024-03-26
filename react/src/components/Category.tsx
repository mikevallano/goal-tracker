type CategoryProps = {
  name: 'string'
}

const Category = ({ name }: CategoryProps) => {
  return (
    <div className='card'>
      <p className='card-header'>{name}</p>
    </div>
  )
}
export default Category
