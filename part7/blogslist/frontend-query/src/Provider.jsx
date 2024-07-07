import { BlogContextProvider } from "./context/blogContext"
import { LoginContextProvider } from "./context/loginContext"
import { NotificationContextProvider } from "./context/notificationContext"
import { UserContextProvider } from "./context/userContext"

const Provider = ({ children }) =>{
  return(
  <NotificationContextProvider>
    <BlogContextProvider>
      <LoginContextProvider>
        <UserContextProvider>
            {children}
        </UserContextProvider>
      </LoginContextProvider>
    </BlogContextProvider>
  </NotificationContextProvider>
  )
}

export default Provider