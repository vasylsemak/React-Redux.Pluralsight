import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App.js'
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from './redux/configureStore'

// if store is fetched from localStorage or server - it may be added here as f-n parameter
const store = configureStore()
// console.log('state ===> ', store.getState())

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
)
