import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from 'App'
import 'bootstrap/dist/css/bootstrap.min.css'

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from 'context'

ReactDOM.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
// "proxy": "https://tele-mednic.herokuapp.com"
