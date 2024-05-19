import axios from 'axios'
const urlBase = '/api/persons'

const getPersons = () =>{
  const request = axios.get(urlBase)
  return request.then(response => response.data)
}

const addPersons = ( data_upload ) => {
  const request = axios.post(urlBase, data_upload)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${urlBase}/${id}`)
  return request.then(() => console.log(`Person with id ${id} is deleted`))
}

const updatePerson = (id, person) => {
  const request = axios.put(`${urlBase}/${id}`, person)
  return request.then(response => response.data)
} 

export { getPersons, addPersons, deletePerson, updatePerson }