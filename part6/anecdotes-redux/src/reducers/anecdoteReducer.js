import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const sortAnecdote = (anecA, anecB) => {
  if (anecA.votes > anecB.votes) {
    return -1
  } else if (anecA.votes < anecB.votes) {
    return 1
  }
  return 0
} 


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id
        ? anecdote = action.payload
        : anecdote).sort(sortAnecdote)
    }
  },
})


export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteUpdated = {...anecdote, votes: anecdote.votes +1}
    const response = await anecdoteService.update(anecdote.id, anecdoteUpdated)
    dispatch(updateAnecdote(response))
  }
}

export default anecdoteSlice.reducer