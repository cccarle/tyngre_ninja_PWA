import variabels from '../config/variabels'
import firebase from '../config/firebase'
import history from '../config/history'
import { addPropertyToUser } from '../helpers/dbFunctions'

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
      // history.push('/dashboard')
      console.log(data)
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

export const checkIfUserIsLoggedIn = (store, globalActions) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('logged in')
      history.push('/dashboard')
    } else {
      console.log('not logged in')
    }
  })
}

/*
Sign out user and display loginpage
*/

export const signOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Signed out')
      history.push('/')
    })
    .catch(function(error) {
      console.log(`error accurred${error}`)
    })
}
