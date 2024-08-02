import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './store/authContext.jsx'
import { ScrollProvider } from './store/scrollContext.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>

      <UserProvider>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </UserProvider>

    </BrowserRouter>
    
  </React.StrictMode>,
)
