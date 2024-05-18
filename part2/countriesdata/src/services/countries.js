import axios from 'axios'

const urlBase = 'https://studies.cs.helsinki.fi/restcountries/'

const getCountries = () => {
  const request = axios.get(`${urlBase}/api/all`)
  return request.then(response => response.data)
}

export {getCountries}