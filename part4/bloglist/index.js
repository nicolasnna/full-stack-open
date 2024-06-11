require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const PORT = require('./utils/config').PORT

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app