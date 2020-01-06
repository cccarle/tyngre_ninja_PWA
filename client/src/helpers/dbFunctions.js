import firebase from '../config/firebase'
let db = firebase.firestore()
let realtimeDB = firebase.database()
const moment = require('moment')

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

export const addStartWeightRecordToFB = (weight, store, globalActions) => {
  let userId = getUserID()

  db.collection('users')
    .doc(userId)
    .set({
      startWeight: weight
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

      records.sort((a, b) => (a.recordDate > b.recordDate ? 1 : -1))

      records.map(
        record =>
          (record.recordDate = moment(record.recordDate).format('MMMM D, YYYY'))
      )

      globalActions.setRecords(records.reverse(), globalActions)

      records = []
    })
}

export const getRecordsStartWeightFB = async (store, globalActions) => {
  let userId = getUserID()
  let startWeight
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot.exists) {
        startWeight = querySnapshot.data().startWeight
      }
      globalActions.setStartWeights(startWeight, globalActions)
      globalActions.toggelStartWeightModal(false)
    })
}

const getUserID = () => {
  return window.localStorage.getItem('userID')
}
