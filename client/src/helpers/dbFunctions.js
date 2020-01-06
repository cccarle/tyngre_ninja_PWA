import firebase from '../config/firebase'
let db = firebase.firestore()
let realtimeDB = firebase.database()

export const addPropertyToUser = (userID, userProperties) => {
  const { email, firstName, lastName, username } = userProperties

  db.collection('users')
    .doc(userID)
    .set({
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName
    })
}

export const addWeightRecordToFB = (currentDate, weight, globalActions) => {
  let userId = getUserID()
  let ref = firebase.database().ref('users/' + userId)

  let record = {
    recordDate: currentDate.toJSON(),
    weight: weight
  }

  ref.push().set(record, error => {
    if (error) {
      console.log(error)
      globalActions.toggelModal(true)
    } else {
      console.log('saved')
      globalActions.toggelChipModal(true)
    }
  })
}

const getUserID = () => {
  return window.localStorage.getItem('userID')
}
