import React, { useState, useEffect } from 'react'
import axios from 'axios'

const urlBase = 'https://studies.cs.helsinki.fi/restcountries/'

const searchCountry = async (name) => {
  if (name) {
    const request = await axios.get(`${urlBase}/api/name/${name}`)
    return {found: true, ...request.data}
  } else{
    return {found: false}
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const fetchCountry = async () => {
    const countryData = await searchCountry(name)
    setCountry(countryData)
  }

  useEffect(() => {
    fetchCountry()
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }
  
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App