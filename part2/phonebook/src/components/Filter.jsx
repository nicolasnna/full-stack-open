const Filter = ({ onChangeHandle }) => {
  return (
    <div>
      filter shown with: <input onChange={onChangeHandle}/>
    </div>
  )
}  

export default Filter