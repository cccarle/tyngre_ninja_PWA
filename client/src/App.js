import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './config/history'
import './App.css'
/* 
Components
*/
import SignInPage from './pages/Auth/SignIn'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <Router history={history}>
      <div className="appContainer">
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
