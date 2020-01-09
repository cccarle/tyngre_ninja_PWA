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

export const addWeightRecordToFB = (
  currentDate,
  weight,
  globalActions,
  globalState
) => {
  let userId = getUserID()

  let record = {
    recordDate: currentDate.toJSON(),
    weight: weight,
    startWeight: globalState.startWeightFromDB
  }

  let doc = db
    .collection('users')
    .doc(userId)
    .collection('records')
    .doc()

  doc
    .set(record, { merge: true })
    .then(() => {
      console.log(doc.id)

      console.log(globalState)
      let properDate = moment(record.recordDate)

      let userDB
      if (globalState.loggedInUserEmail === 'ninjaalex@tyngre.com') {
        userDB = 'Alex'
      }

      if (globalState.loggedInUserEmail === 'ninjaandreas@tyngre.com') {
        userDB = 'Andreas'
      }
      if (moment(properDate).isSame(moment(), 'day')) {
        let diff = Math.abs(record.startWeight - record.weight)
        db.collection('ninjaOfTheDay')
          .doc(doc.id)
          .set(
            {
              day: record.recordDate,
              user: userDB,
              weightDiff: diff,
              weight: record.weight,
              startWeight: record.startWeight
            },
            { merge: true }
          )
      }

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
            id: doc.id,
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

export const deleteRecordFromFB = (record, globalActions) => {
  let userId = getUserID()

  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('records')
    .doc(record.id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!')

      db.collection('ninjaOfTheDay')
        .doc(record.id)
        .delete()
    })
    .catch(function(error) {
      console.error('Error removing document: ', error)
      globalActions.toggelModal(true)
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

export const listenNinjaChangedFromFB = (globalActions, globalState) => {
  let ninjaRecords = []

  firebase
    .firestore()
    .collection('ninjaOfTheDay')
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          let properDate = moment(doc.data().day)
          if (moment(properDate).isSame(moment(), 'day')) {
            ninjaRecords.push(doc.data())
            globalActions.setNinjaRecords(
              ninjaRecords,
              globalActions,
              globalState
            )
          }
        }
      })

      globalActions.setNinjaRecords(ninjaRecords, globalActions, globalState)

      //  console.log(ninjaRecords)
      ninjaRecords = []
    })
}

const getUserID = () => {
  return window.localStorage.getItem('userID')
}
