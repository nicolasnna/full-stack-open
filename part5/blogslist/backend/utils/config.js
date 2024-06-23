require('dotenv').config()

const PORT = process.env.PORT
const WORD_SECRET = process.env.SECRET

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI 
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  WORD_SECRET
}