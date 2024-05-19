const PersonsList = ({ personArray, deleteHandle}) => {
  return (
    <div>
      {personArray.map((element) => (
      <li key={element.id}>
        {element.name} {element.number} <button onClick={() => {deleteHandle(element)}}> delete</button>
      </li>
    ))}
    </div> 
  )
}

export default PersonsList