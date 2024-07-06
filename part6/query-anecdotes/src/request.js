import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdotes = newAnecdote => {
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const updateAnecdotes = (updateAnecdote) => {
  return axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(res => res.data)
}
