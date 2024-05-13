import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const Button = ({ handleClick, text }) => {
  return (
      <button onClick={handleClick}>{text}</button>
  )
}
const Anecdote = ({ title, textContent, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{textContent}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleRandom = () => {
    const random_select = Math.floor(Math.random()*anecdotes.length)
    setSelected(random_select)
  }
  const handleVote = () => {
    const copy_points = [...points]
    copy_points[selected] += 1
    setPoints(copy_points)
    setMostVoted(copy_points.indexOf(Math.max(...copy_points)))
  }

  return (
    <div>
      <Anecdote title={"Anecdote of the day"} textContent={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVote} text={"vote"} />
      <Button handleClick={handleRandom} text={"next anecdote"} />
      <Anecdote title={"Anecdote with most votes"} textContent={anecdotes[mostVoted]} votes={points[mostVoted]} />
    </div>
  )
}

export default App