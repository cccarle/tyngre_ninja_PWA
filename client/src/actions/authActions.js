import variabels from '../config/variabels'
import firebase from '../config/firebase'
import history from '../config/history'
import {
  addPropertyToUser,
  checkIfFirstLogIn,
  updateFirstTimeLogInStatus,
  addStartProperties
} from '../helpers/dbFunctions'
import { hi } from 'date-fns/locale'

/* 
Register new user to FireBase and write to the DB with userProperties 
*/

export const registerNewUser = async (store, userProperties, globalActions) => {
  const { email, password1 } = userProperties

  globalActions.toggelSpinner(true)

  let registerResult = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password1)
    .then(data => {
      const userID = data.user.uid
      window.localStorage.setItem('userID', userID)
      addPropertyToUser(userID, userProperties)
    })
    .then(() => {
      console.log('push to create profile')
    })
    .catch(function(error) {
      if (error) {
        globalActions.toggelSpinner(false)
        const errorMessage = error.message
        globalActions.setAuthErrorMsg(errorMessage)
      }
    })

  return registerResult
}

/* 
Sign in user.
*/

export const signIn = async (store, userProperties, globalActions) => {
  const { email, password } = userProperties

  globalActions.toggelSpinner(true)

  let loginResult = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      const userID = data.user.uid

      window.localStorage.setItem('userID', userID)

      // addStartProperties(userID)
    })
    .catch(function(error) {
      globalActions.toggelSpinner(false)

      if (error) {
        var errorMessage = error.message
        return errorMessage
      }
    })
  return loginResult
}

/*
Check if user is logged in, if a user exist display dashboard else loginpage
*/

export const checkIfUserIsLoggedIn = async (store, globalActions) => {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      let isFirstLogIn = await checkIfFirstLogIn(user.uid)
      if (isFirstLogIn) {
        history.push('/first-time-login')
      } else {
        history.push('/dashboard')
      }

      globalActions.setLoggedInUserEmail(user.providerData[0].uid)

      window.setTimeout(() => {
        globalActions.setLoggedInStatus(store, true)
      }, 1000)
    } else {
      console.log('not logged in')
      globalActions.setLoggedInStatus(store, false)
    }
  })
}

export const setLoggedInStatus = (store, status) => {
  store.setState({ isLoggedIn: status })
}

export const setFirstTimeLoggedInStatus = (store, status) => {
  store.setState({ firstLogIn: status })
}

export const setLoggedInUserEmail = (store, email) => {
  store.setState({ loggedInUserEmail: email })
}

export const updateFirstTimeLogInStatus1 = () => {
  updateFirstTimeLogInStatus()
}

/*
Sign out user and display loginpage
*/

export const signOutUser = globalActions => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Signed out')
      history.push('/login')
      globalActions.toggelSpinner(false)
    })
    .catch(function(error) {
      console.log(`error accurred${error}`)
    })
}
