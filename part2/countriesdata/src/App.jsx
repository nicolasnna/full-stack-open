import { useEffect, useState } from "react"
import {getCountries} from "./services/countries"
import { getWeather } from "./services/openweather"

const Weather = ({ name, latitude, longitude }) => {
  const [temp, setTemp] = useState(0)
  const [urlIcon, setUrlIcon] = useState('')
  const [weather, setWeather] = useState('')
  const [speedWind, setSpeedWind] = useState(0)

  useEffect(() => {
    getWeather(latitude,longitude)
    .then(response => {
      setTemp(response.main.temp -273.15)
      setUrlIcon(`https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`)
      setWeather(response.weather[0].description)
      setSpeedWind(response.wind.speed)
    })
  },[])

  return (
    <div>
      <h3>Weather in {name}</h3>
      <li>Temperature: {temp.toFixed(2)} Celcius</li>
      <p>{weather}, wind: {speedWind}</p>
      <img src={urlIcon} width={200} height={200} />
    </div>
  )
}

const CountryInfo = ({dataInfo, show}) =>{
  if (show === false) {
    return null
  }
  const keyLanguages = Object.keys(dataInfo.languages)
  

  return (
    <div>
      <h1>{dataInfo.name.common}</h1>
      <li>Capital: {dataInfo.capital}</li>
      <li>Area: {dataInfo.area}</li>
      <h3>languages:</h3>
      {keyLanguages.map(key => (
        <li key={key}>{dataInfo.languages[key]}</li>
      ))}
      <img src={dataInfo.flags.png} width={400} height={200}/>
      <Weather name={dataInfo.name.common} latitude={dataInfo.latlng[0]} longitude={dataInfo.latlng[1]} />
    </div>
  )
}

const Country = ({country}) => {
  const [show, setShow] = useState(false)
  const clickButttonShow = () => (
    setShow(!show)
  )
  return (
    <div>
      <li >{country.name.common} <Button label={'show'} handleClick={clickButttonShow}/></li>
      <CountryInfo dataInfo={country} show={show}/>
    </div>
  )
}

const CountriesList = ({countriesArray}) => {
  if (countriesArray.length >10) {
    return (
    <div>
      Too many matches, specify another filter
    </div>)
  } else if (countriesArray.length >1) {
    return (
      <div>
      {countriesArray.map((element,index) => (
        <Country key={index} country={element} />
       ))}
      </div>
    )} else if (countriesArray.length === 1) {
      return (
        <div>
          <CountryInfo dataInfo={countriesArray[0]} show={true}/>
        </div>
      )
    }
}

const Button = ({label, handleClick}) => {
  return (
    <button onClick={handleClick}>{label}</button>
  )
}

function App() {
  const [countriesData, setCountriesData] = useState([])
  const [countriesDataFilter, setCountriesDataFilter] = useState([])

  useEffect(() => {
    getCountries()
      .then((response) => {
        setCountriesData(response)
      })
  },[])


  const inputCountriesHandle = (event) =>{
    event.preventDefault()
    setCountriesDataFilter(countriesData.filter((countries) => 
      countries.name.common.toLowerCase()
        .includes(event.target.value)))
  }

  return (
    <div>
       <div>find countries <input onChange={inputCountriesHandle} /> </div>
       <CountriesList countriesArray={countriesDataFilter} />
    </div>
  )
}

export default App
