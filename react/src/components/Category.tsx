type CategoryProps = {
  name: 'string'
  description?: 'string'
}

const Category = ({ name, description }: CategoryProps) => {
  return (
    <div>
      <h3>Category name: {name}</h3>
      <p>Description: {description}</p>
    </div>
  )
}
export default Category
