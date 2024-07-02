import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {  
  const anecdotesState = useSelector(state => state.anecdotes)
  const filterState = useSelector(state => state.filter)
  const anecdotes = anecdotesState.filter(anecdote => anecdote.content.toLowerCase().includes(filterState.toLowerCase()))

  const dispatch = useDispatch()
  
  const addVote = (id, content) => {
    dispatch(vote(id))
    dispatch(voteNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    },5000)
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
            <button onClick={() => addVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList