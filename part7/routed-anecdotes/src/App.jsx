import { 
  Routes, Route, Link,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import NotificationContext, {NotificationContextProvider} from './context/NotificationContext'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link> 
        </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const contentField = useField('text', 'content')
  const authorField = useField('text', 'author')
  const infoField = useField('text', 'info')

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const navigate = useNavigate()

  contentField.value
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    })
    navigate('/')
    notificationDispatch({ type: 'SET', payload: `a new anecdote ${contentField.value} created!`})
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR'})
    }, 5000)
  }

  const resetButton = (e) => {
    e.preventDefault()
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
            value={contentField.value} 
            type={contentField.type} 
            onChange={contentField.onChange}
            name={contentField.name}
            />
        </div>
        <div>
          author
          <input 
            value={authorField.value} 
            type={authorField.type} 
            onChange={authorField.onChange}
            name={authorField.name}
            />
        </div>
        <div>
          url for more info
          <input 
            value={infoField.value} 
            type={infoField.type} 
            onChange={infoField.onChange}
            name={infoField.name}
            />
        </div>
        <button>create</button>
        <button onClick={resetButton}>Reset</button>
      </form>
      
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <div>{notification}</div>
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}/> 
        <Route path='/about' element={<About/>}/> 
        <Route path='/create' element={<CreateNew addNew={addNew} />}/> 
      </Routes>
      <Footer />
    </div>
  )
}

export default App
