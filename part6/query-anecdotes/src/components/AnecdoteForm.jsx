import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from '../request'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (res) =>{
      notificationDispatch({ type: 'SET', payload: `${res.response.data.error}`})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR'})
      },5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content: content, votes: 0})
    notificationDispatch({ type: 'SET', payload: `anecdote '${content}' created`})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR'})
    },5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
