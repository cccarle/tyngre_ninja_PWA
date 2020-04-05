import firebase from '../config/firebase'
let db = firebase.firestore()
let realtimeDB = firebase.database()
const moment = require('moment')

let alexImage = require('../assets/img/alex.jpg')

let andreasImage = require('../assets/img/andreas.jpg')

export const addStartProperties = (userID) => {
  db.collection('users').doc(userID).set({
    startWeight: '',
    firstTimeLogIn: true,
  })
}
export const addPropertyToUser = (userID, userProperties) => {
  const { email, firstName, lastName, username } = userProperties

  db.collection('users').doc(userID).set({
    email: email,
    username: username,
    firstName: firstName,
    lastName: lastName,
  })
}

export const addStartWeightRecordToFB = (weight, store, globalActions) => {
  let userId = getUserID()

  db.collection('users').doc(userId).set(
    {
      startWeight: weight,
    },
    { merge: true }
  )
}

export const updateFirstTimeLogInStatus = () => {
  let userId = getUserID()
  var washingtonRef = db.collection('users').doc(userId)

  return washingtonRef
    .update({
      firstTimeLogIn: false,
    })
    .then(function () {
      console.log('Document successfully updated!')
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error)
    })
}

const getlatestRecord = async (userID) => {
  let a = await db
    .collection('users')
    .doc(userID)
    .collection('records')
    .orderBy('recordDate')
    .limitToLast(1)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach(function (doc) {
        console.log(doc.data())

        let a = doc.data()
        return a
      })
    })
    .catch(function (error) {
      console.log('Error getting document:', error)
    })

  return a
}

export const addWeightRecordToFB = async (
  currentDate,
  weight,
  globalActions,
  globalState
) => {
  let latestRecord
  let userId = getUserID()

  await db
    .collection('users')
    .doc(userId)
    .collection('records')
    .orderBy('recordDate')
    .limitToLast(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        latestRecord = doc.data()
      })
    })
    .catch(function (error) {
      console.log('Error getting document:', error)
    })

  let doc = db.collection('users').doc(userId).collection('records').doc()

  let record = {
    recordDate: currentDate.toJSON(),
    weight: weight,
    startWeight: globalState.startWeightFromDB,
    latestWeight: latestRecord.weight,
  }

  doc
    .set(record, { merge: true })
    .then(() => {
      let properDate = moment(record.recordDate)

      let userDB
      if (globalState.loggedInUserEmail === 'alex@tyngre.se') {
        userDB = 'Alex'
      }

      if (globalState.loggedInUserEmail === 'andreas@tyngre.se') {
        userDB = 'Andreas'
      }

      if (moment(properDate).isSame(moment(), 'day')) {
        let diff
        let diffFromLatest
        if (
          record.weight > record.startWeight ||
          record.weight > record.latestWeight
        ) {
          diff = 0
          diffFromLatest = 0
        } else {
          diff = Math.abs(record.startWeight - record.weight).toFixed(1)

          diffFromLatest = Math.abs(
            record.latestWeight - record.weight
          ).toFixed(1)
        }

        db.collection('ninjaOfTheDay').doc(doc.id).set(
          {
            day: record.recordDate,
            user: userDB,
            weightDiff: diff,
            weightDiffFromLatest: diffFromLatest,
            latestWeightRecord: record.latestWeight,
            weight: record.weight,
            startWeight: record.startWeight,
          },
          { merge: true }
        )
      }

      globalActions.toggelChipModal(true)
      globalActions.clearFields()
    })
    .catch(function (error) {
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
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          records.push({
            id: doc.id,
            weight: doc.data().weight,
            recordDate: doc.data().recordDate,
          })
        }
      })

      records.sort((a, b) => (a.recordDate > b.recordDate ? 1 : -1))

      records.map(
        (record) =>
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

      db.collection('ninjaOfTheDay').doc(record.id).delete()
    })
    .catch(function (error) {
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
    .onSnapshot(function (querySnapshot) {
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
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
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

      ninjaRecords = []
    })
}

/* 
First login
*/

export const checkIfFirstLogIn = async (userID) => {
  var docRef = firebase.firestore().collection('users').doc(userID)

  let a = await docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        return doc.data().firstTimeLogIn
      } else {
        console.log('No such document!')
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error)
    })

  return a
}

/* 
Comments
*/

export const addCommentToFB = (user, sender, msg, globalActions) => {
  let userID
  if (user == 'Alex') {
    userID = 's4BCaCc1XFNaWACMQNrfTpXHyqn1'
  }

  if (user == 'Andreas') {
    userID = '1tejIan4jccwU1kZUAjf9ZjVwcj1'
  }

  let comment = {
    user: user,
    sender: sender,
    commentMSG: msg,
    confirmed: false,
    time: new Date().getDate(),
  }

  db.collection('users')
    .doc(userID)
    .collection('comments')
    .doc()
    .set(comment, { merge: true })
    .then(() => {
      globalActions.toggleShowAddCommentModal(false)

      globalActions.toggelCommentChipModal(true)
    })
    .catch(function (error) {
      console.log('Error getting document:', error)
    })
}

export const getCommentsFromFB = (store, globalState, globalActions) => {
  let userId = getUserID()
  let commentsFromFB = []

  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('comments')
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          let date = doc.data().time.seconds

          commentsFromFB.push({
            id: doc.id,
            sender: doc.data().sender,
            msg: doc.data().commentMSG,
            user: doc.data().user,
            confirmed: doc.data().confirmed,
            time: toDateTime(date),
          })
        }
      })

      commentsFromFB.sort((a, b) => (a.time > b.time ? 1 : -1))

      commentsFromFB.map(
        (record) => (record.time = moment(record.time).format('MMMM D, YYYY'))
      )

      store.setState({ comments: commentsFromFB })

      commentsFromFB = []
    })
}

function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}

export const getPublicCommentsFromFB = (store, globalState, globalActions) => {
  let commentsFromFB = []

  firebase
    .firestore()
    .collection('comments')

    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          let img
          if (doc.data().user == 'Alex') {
            img = alexImage
          }

          if (doc.data().user == 'Andreas') {
            img = andreasImage
          }

          commentsFromFB.push({
            id: doc.id,
            sender: doc.data().sender,
            msg: doc.data().msg,
            user: doc.data().user,
            img: img,
            time: doc.data().time,
          })
        }
      })

      commentsFromFB.sort((a, b) => (a.time > b.time ? 1 : -1))

      commentsFromFB.map(
        (record) => (record.time = moment(record.time).format('MMMM D, YYYY'))
      )

      store.setState({ publicComments: commentsFromFB })

      commentsFromFB = []
    })
}

export const addCommentToPublicList = (comment) => {
  let userId = getUserID()

  db.collection('comments')
    .doc()
    .set(comment, { merge: true })
    .then(() => {
      db.collection('users')
        .doc(userId)
        .collection('comments')
        .doc(comment.id)
        .update({ confirmed: true })
      console.log('added comment to public list')
    })
    .catch(function (error) {
      console.log('Error getting document:', error)
    })
}

export const deleteCommentFromFB = (comment) => {
  let userId = getUserID()
  db.collection('users')
    .doc(userId)
    .collection('comments')
    .doc(comment.id)
    .delete()
    .then(() => {})
    .catch(function (error) {
      console.log('Error getting document:', error)
    })
}
const getUserID = () => {
  return window.localStorage.getItem('userID')
}
