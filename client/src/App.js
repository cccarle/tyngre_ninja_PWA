import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import useGlobal from './store/store'
import history from './config/history'
import { makeStyles } from '@material-ui/core/styles'
import { checkIfUserIsLoggedIn, listenForNinjaRecords } from './actions'
import Spinner from './components/spinner'
import './App.css'
import firebase from './config/firebase'
/* 
Components
*/
import SignInPage from './pages/Auth/SignIn'
import Dashboard from './pages/Dashboard/Dashboard'
import NijaOfTheDay from './pages/PublicView/PublicView'
import FirstTimeLogIn from './pages/Auth/FirstTimeLogIn'
import NotFoundView from './pages/NotFoundView/NotFoundView'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    marginTop: '4%'
  }
}))

function App() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  useEffect(() => {
    checkIfUserIsLoggedIn(globalState, globalActions)
    listenForNinjaRecords(globalState, globalActions)
    firebase.performance()
    firebase.analytics()
  }, [])

  if (!globalState.isLoggedIn) {
    return (
      <div className="center">
        <span className="textFontXL">ninja-projektet</span>
        <span className="textFontPublic">not approved by tyngre.</span>
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
          <Route exact path="/login" component={SignInPage} />
          <Route exact path="/" component={NijaOfTheDay} />
          <Route exact path="/first-time-login" component={FirstTimeLogIn} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={NotFoundView} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
