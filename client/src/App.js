import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import useGlobal from './store/store'
import history from './config/history'
import { checkIfUserIsLoggedIn } from './actions'
import './App.css'
/* 
Components
*/
import SignInPage from './pages/Auth/SignIn'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    checkIfUserIsLoggedIn(globalActions)
  }, [])

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
