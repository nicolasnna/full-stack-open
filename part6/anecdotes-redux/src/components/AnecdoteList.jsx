import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {  
  const anecdotesState = useSelector(state => state.anecdotes)
  const filterState = useSelector(state => state.filter)
  const anecdotes = anecdotesState.filter(anecdote => anecdote.content.toLowerCase().includes(filterState.toLowerCase()))

  const dispatch = useDispatch()
  
  const addVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(createNotification(`You voted ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList