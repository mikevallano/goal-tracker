type CategoryProps = {
  name: 'string'
}

const Category = ({ name }: CategoryProps) => {
  return (
    <div>
      <h3>Category name: {name}</h3>
    </div>
  )
}
export default Category
