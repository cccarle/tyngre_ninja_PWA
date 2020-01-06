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

  let record = {
    recordDate: currentDate.toJSON(),
    weight: weight
  }

  db.collection('users')
    .doc(userId)
    .collection('records')
    .doc()
    .set(record, { merge: true })
    .then(function() {
      globalActions.toggelChipModal(true)
      globalActions.clearFields()
    })
    .catch(function(error) {
      console.log(error)
      globalActions.toggelModal(true)
    })
}

export const getRecordsFromFB = async (store, globalActions) => {
  let userId = getUserID()
  let records = []

  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('records')
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          records.push({
            weight: doc.data().weight,
            recordDate: doc.data().recordDate
          })
        }
      })

      globalActions.setRecords(records, globalActions)
      records = []
    })
}
const getUserID = () => {
  return window.localStorage.getItem('userID')
}
