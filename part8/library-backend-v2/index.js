require("dotenv").config()
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Book = require("./models/book")
const Author = require("./models/author")
const { UserInputError } = require("apollo-server")
const jwt = require("jsonwebtoken")
const User = require("./models/user")

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = `
  type Query {
    dummy: Int,
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book!

    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author

    createUser (
      username: String!
      favoriteGenre: String!
    ): User

    login ( 
      username: String!
      password: String!
    ): Token
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async (root, args) => {
      const booksArray = await Book.find({}).populate("author")

      const booksFilter = booksArray.filter(
        (b) => b.author.name === args.author
      )
      return booksFilter.length
    },
    authorCount: async () => {
      const arrayAuthor = await Author.find()
      return arrayAuthor.length
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const booksArray = await Book.find({}).populate("author")
        return booksArray
      }

      const genresFilter = await Book.find({
        genres: args.genre,
      }).populate("author")

      return genresFilter
    },
    allAuthors: async () => {
      const arrayAuthor = await Author.find({})
      const arrayBooks = await Book.find({}).populate("author")

      const listAuthor = arrayAuthor.map((a) => ({
        name: a.name,
        born: a.born || null,
        bookCount: arrayBooks.filter((b) => b.author.name === a.name).length,
      }))

      return listAuthor
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      if (args.title.length < 4) {
        throw new UserInputError("The title must be least 4 character.", {
          invalidArgs: args.title,
        })
      }

      if (args.author.length < 4) {
        throw new UserInputError("The author name must be least 4 character.", {
          invalidArgs: args.author,
        })
      }

      const isAuthor = await Author.findOne({ name: args.author })

      let authorId
      if (!isAuthor) {
        const authorObject = new Author({ name: args.author })
        const savedAuthor = await authorObject.save()
        authorId = savedAuthor._id
      } else {
        authorId = isAuthor._id
      }
      const book = new Book({
        ...args,
        author: authorId,
      })
      const savedBook = await book.save()
      await savedBook.populate("author")

      return savedBook
    },
    editAuthor: async (root, args) => {
      const isAuthor = await Author.findOne({ name: args.name })
      if (!isAuthor) {
        return null
      }

      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )

      const bookByUser = await Book.find({ author: isAuthor._id })
      return {
        name: updatedAuthor.name,
        born: updatedAuthor.born,
        bookCount: bookByUser.length,
      }
    },
    createUser: async (root, args) => {
      const getUser = await User.findOne({ username: args.username })
      if (getUser) {
        throw new UserInputError("The user already exist.", {
          invalidArgs: args.username,
        })
      }
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
