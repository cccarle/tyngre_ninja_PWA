import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import useGlobal from './store/store'
import history from './config/history'
import { makeStyles } from '@material-ui/core/styles'

import { checkIfUserIsLoggedIn } from './actions'
import Spinner from './components/spinner'
import './App.css'
/* 
Components
*/
import SignInPage from './pages/Auth/SignIn'
import Dashboard from './pages/Dashboard/Dashboard'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    marginTop: '1%'
  }
}))

function App() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  useEffect(() => {
    checkIfUserIsLoggedIn(globalState, globalActions)
  }, [])

  if (!globalState.isLoggedIn) {
    return (
      <div className="center">
        <h1 className="textFontHeader">Ninja Projektet</h1>
        <div className={classes.spinner}>
          <Spinner className={classes.spinner} />
        </div>
      </div>
    )
  }

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
