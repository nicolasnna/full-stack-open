import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { EditAuthor } from "./components/EditAuthor"
import Login from "./components/Login"
import { useApolloClient } from "@apollo/client"
import Recommendation from "./components/Recommendation"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("library-user-token"))
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const setLoginPag = () => setPage("login")

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommendation")}>
            recommendation
          </button>
        )}
        <button onClick={token ? logout : setLoginPag}>
          {token ? "logout" : "login"}
        </button>
      </div>

      <Authors show={page === "authors"} />
      <EditAuthor show={page === "authors"} />
      <Books show={page === "books"} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
      <Recommendation show={page === "recommendation"} />
      {token && <NewBook show={page === "add"} />}
    </div>
  )
}

export default App
