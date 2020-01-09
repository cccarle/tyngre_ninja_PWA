const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')
const serviceAccount = require('./tyngreninja-41171be7dd62.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tyngreninja.firebaseio.com'
})

const firestore = admin.firestore()
const andreasID = 'XaKmtXftBIh649C4juhLsWZTnBp2'
const alexID = 'a2eN8Aa1AcQxA4FLxZy7HG1TwUr2'

exports.listenForAndreasRecords = functions.firestore
  .document(`users/${andreasID}/records/{record}`)
  .onCreate((snap, context) => {
    const record = snap.data()
    let properDate = moment(record.recordDate)

    if (moment(properDate).isSame(moment(), 'day')) {
      let diff = Math.abs(record.startWeight - record.weight)
      firestore
        .collection('ninjaOfTheDay')
        .doc(snap.id)
        .set(
          {
            day: record.recordDate,
            user: 'Andreas',
            weightDiff: diff,
            weight: record.weight,
            startWeight: record.startWeight
          },
          { merge: true }
        )
    }

    return record
  })

exports.listenForAndreasNinjaRecords = functions.firestore
  .document(`users/${andreasID}/records/{record}`)
  .onDelete((snap, context) => {
    const record = snap.data()
    const recordID = snap.id

    console.log(recordID)

    firestore
      .collection('ninjaOfTheDay')
      .doc(recordID)
      .delete()

    return record
  })

exports.listenForAlexRecords = functions.firestore
  .document(`users/${alexID}/records/{record}`)
  .onCreate((snap, context) => {
    const record = snap.data()
    let properDate = moment(record.recordDate)

    if (moment(properDate).isSame(moment(), 'day')) {
      let diff = Math.abs(record.startWeight - record.weight)
      firestore
        .collection('ninjaOfTheDay')
        .doc(snap.id)
        .set(
          {
            day: record.recordDate,
            user: 'Alex',
            weightDiff: diff,
            weight: record.weight,
            startWeight: record.startWeight
          },
          { merge: true }
        )
    }

    return record
  })

exports.listenForAlexNinjaRecords = functions.firestore
  .document(`users/${alexID}/records/{record}`)
  .onDelete((snap, context) => {
    const record = snap.data()
    const recordID = snap.id
    let properDate = moment(record.recordDate)

    firestore
      .collection('ninjaOfTheDay')
      .doc(recordID)
      .delete()

    return record
  })
