import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './context/NotificationContext'
import { 
  BrowserRouter as Router
} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Router>
)