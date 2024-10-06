const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Query {
    dummy: Int,
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book

    editAuthor (
      name: String!,
      setBornTo: Int!
    ): Author
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    bornAuthor: Int
    id: ID!
    genres: [String!]
  }
`;

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => books.length,
    authorCount: () => {
      const arrayAuthor = books.map((b) => b.author);
      const uniqueArray = [...new Set(arrayAuthor)];
      return uniqueArray.length;
    },
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      }
      const authorFilter = args.author
        ? books.filter((b) => b.author === args.author)
        : books;
      const genresFilter = args.genre
        ? authorFilter.filter((a) => a.genres.includes(args.genre))
        : authorFilter;
      return genresFilter;
    },
    allAuthors: () => {
      const arrayAuthor = books.map((b) => b.author);
      const uniqueArray = [...new Set(arrayAuthor)];
      const response = uniqueArray.map((a) => ({
        name: a,
        bookCount: arrayAuthor.filter((array) => array === a).length,
        born: arrayAuthor[0].bornAuthor,
      }));
      return response;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const findAuthor = books.find((b) => b.author === args.author);
      const newBook = {
        ...args,
        id: uuid(),
        bornAuthor: findAuthor ? findAuthor.bornAuthor : null,
      };
      books = books.concat(newBook);
      return newBook;
    },
    editAuthor: (root, args) => {
      if (!books.find((b) => b.author === args.name)) {
        return null;
      }
      const newBooks = books.map((b) =>
        b.author === args.name ? { ...b, bornAuthor: args.setBornTo } : b
      );
      books = newBooks;
      return { name: args.name, born: args.setBornTo };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
