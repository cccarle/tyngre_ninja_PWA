import variabels from '../config/variabels'
import firebase from '../config/firebase'
import { addPropertyToUser } from '../helpers/dbFunctions'

const axios = require('axios')

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
