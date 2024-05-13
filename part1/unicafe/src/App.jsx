import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const StatisticLine = ({ text, count, textCompl}) => (
    <tbody>
    <tr>
        <td>{text}:</td> 
        <td>{count}{textCompl}</td>
    </tr>
    </tbody>
)

const Statistic = ({ good, neutral, bad, all, average, positive }) =>{
    if (all === 0 ) {
        return <h3>No feedback given</h3>
    } else {
        return ( 
            <div>
                <h1>Statistic</h1>
                <table>
                  <StatisticLine text={'Good'} count={good} />
                  <StatisticLine text={'Neutro'} count={neutral} />
                  <StatisticLine text={'Bad'} count={bad} />
                  <StatisticLine text={'All'} count={all} />
                  <StatisticLine text={'Average'} count={average} />
                  <StatisticLine text={'Positive'} count={positive} textCompl={"%"}/>
                </table>
            </div>
        )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = updatedGood + neutral + bad
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    setAverage((updatedGood-bad)/updatedAll)
    setPositive(updatedGood/updatedAll * 100)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = good + updatedNeutral + bad
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
    setAverage((good-bad)/updatedAll)
    setPositive(good/updatedAll * 100)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = good + neutral + updatedBad
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
    setAverage((good-bad)/updatedAll)
    setPositive(good/updatedAll * 100)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text={'Good'} />
      <Button handleClick={handleNeutralClick} text={'Neutral'} />
      <Button handleClick={handleBadClick} text={'Bad'} />
      <Statistic good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App