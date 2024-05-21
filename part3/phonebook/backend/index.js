require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('dist')) 
app.use(express.json())
app.use(cors())

morgan.token('post', function (tokens, req, res) { 
  if (tokens.method(req,res) === 'POST') {
    return JSON.stringify(req.body)
  } 
  })
morgan.token('custom',function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.post(tokens, req, res),
  ].join(' ')
})
app.use(morgan('custom'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)



// let persons = [
//   { 
//     "id": 1,
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": 2,
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": 3,
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": 4,
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]

// Test for init API
app.get(('/api'), (request, response) => {
  response.send('<h2>API is working</h2>')
})
const getDateTime = () => {
  var currentdate = new Date()
  // Get day and month in english
  const day = currentdate.toLocaleDateString('en-US', { weekday: 'long' })
  const month = currentdate.toLocaleDateString('en-US', { month: 'long' })
  const dayOfMonth = currentdate.getDate()
  const year = currentdate.getFullYear()
  // Define time options
  const timeOptions = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    timeZoneName: 'short' 
  }
  const timeWithTimeZone = currentdate.toLocaleTimeString('en-US', timeOptions)                   
  return `${day} ${month} ${dayOfMonth} ${year}, ${timeWithTimeZone}`
}

// Get info 
app.get(('/info'), (request, response, next) => {
  Person.find({}).then(result => {
    const totalPersons = result.length
    const dateTime = getDateTime()
    const msgSend = `<p>Phonebook has info for ${totalPersons} people</p> 
    <p>${dateTime}</p>`
    response.send(msgSend)
  }).catch(error => next(error))
  
})

// Get persons array
app.get(('/api/persons'), (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  }).catch(error => next(error))
})

// Get specific person
app.get(('/api/persons/:id'), (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})
// Delete specific person
app.delete(('/api/persons/:id'), (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

// const generateId = () => {
//   const newId = Math.floor(Math.random() * 100)
//   return newId
// }

// Add a new person
app.post(('/api/persons'), (request, response, next) => {
  const body = request.body
  // Validate that name or number is not missing
  if (!body.name || !body.number) {
    //response.statusMessage = 'The name or number is missing'
    response.statusCode = 400
    response.json({ error: 'The name or number is missing' })
  } 
  // // Validate that name is already exist
  // if (persons.find(el => el.name === body.name)) {
  //   //response.statusMessage = 'The name is already exist'
  //   response.statusCode = 400
  //   response.json({ error: 'name must be unique' })
  // }

  const person = new Person({
    // id: generateId(),
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    response.statusCode = 201
    response.json(savedPerson)
  }).catch(error => next(error))
})

// Modify person data
app.put(('/api/persons/:id'), (request, response, next) => {
  const {name, number} = request.body


  Person.findByIdAndUpdate(request.params.id, 
    { name, number}, 
    { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

