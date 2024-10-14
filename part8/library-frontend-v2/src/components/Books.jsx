import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [filter, setFilter] = useState("")
  const result = useQuery(ALL_BOOKS)
  const bookFilter = useQuery(ALL_BOOKS, { variables: { genre: filter } })

  if (!props.show) {
    return null
  }

  if (result.loading || bookFilter.loading) {
    return <div>loading...</div>
  }

  const getGenres = (booksList) => {
    let setGenres = new Set()
    booksList.forEach((b) => {
      if (b.genres.length > 0) {
        b.genres.forEach((g) => setGenres.add(g))
      }
    })

    return Array.from(setGenres)
  }
  const books = result.data.allBooks
  const filterBooks = bookFilter.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {getGenres(books).map((genres) => (
          <button key={genres} onClick={() => setFilter(genres)}>
            {genres}
          </button>
        ))}
        <button onClick={() => setFilter("")}>All</button>
      </div>
    </div>
  )
}

export default Books
