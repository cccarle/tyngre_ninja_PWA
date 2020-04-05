import { listenNinjaChangedFromFB } from '../helpers/dbFunctions'
const alexImage = require('../assets/img/alex.jpg')
const andreasImage = require('../assets/img/andreas.jpg')

export const listenForNinjaRecords = (globalState, globalActions) => {
  listenNinjaChangedFromFB(globalActions, globalState)
}

export const setNinjaRecords = (
  store,
  ninjaRecord,
  globalActions,
  globalState
) => {
  store.setState({ ninjaRecords: ninjaRecord })
  calculateNinjaOfTheDay(ninjaRecord, store)
}

export const calculateNinjaOfTheDay = (ninjaRecords, store) => {
  let ninjaData = []

  if (ninjaRecords.length > 2) {
    ninjaRecords.pop()
  }

  if (ninjaRecords.length == 2) {
    if (
      ninjaRecords[0].weightDiffFromLatest ==
      ninjaRecords[1].weightDiffFromLatest
    ) {
      let ninjaOfTheDayObj = {
        user: 'Både Andreas och Alex är ninjor idag.',
        weightDiff: ninjaRecords[0].weightDiffFromLatest,
      }
      ninjaData.ninjaRecords = ninjaRecords
      ninjaData.ninjaOfTheDayObj = ninjaOfTheDayObj
      store.setState({ ninjaOfTheDay: ninjaData })
    } else {
      ninjaRecords = removeDuplicates(ninjaRecords, 'user')
      addProfileImageToRecords(ninjaRecords)

      let ninjaOfTheDayObj = ninjaRecords.reduce((prev, current) =>
        prev.weightDiffFromLatest > current.weightDiffFromLatest
          ? prev
          : current
      )

      ninjaData.ninjaRecords = ninjaRecords
      ninjaData.ninjaOfTheDayObj = ninjaOfTheDayObj
      store.setState({ ninjaOfTheDay: ninjaData })
    }
  }

  if (ninjaRecords.length == 1) {
    if (ninjaRecords[0].user == 'Alex') {
      ninjaData.message = 'Vi väntar på Andreas, påminn han vetja!'
      ninjaData.weight = ninjaRecords[0].weight
      ninjaData.user = ninjaRecords[0].user
      store.setState({ ninjaOfTheDay: ninjaData })
    }

    if (ninjaRecords[0].user == 'Andreas') {
      ninjaData.message = 'Vi väntar på Alex, påminn han vetja!'
      ninjaData.weight = ninjaRecords[0].weight
      ninjaData.user = ninjaRecords[0].user

      store.setState({ ninjaOfTheDay: ninjaData })
    }
  }

  if (ninjaRecords.length == 0) {
    ninjaData.message =
      'Varken Alex eller Andreas har vägt in sig idag, påminn dem!'
    store.setState({ ninjaOfTheDay: ninjaData })
  }
}

const addProfileImageToRecords = (ninjaRecords) => {
  ninjaRecords.map((record) => {
    if (record.user == 'Alex') {
      record.img = alexImage
    }

    if (record.user == 'Andreas') {
      record.img = andreasImage
    }
  })
}

const removeDuplicates = (originalArray, prop) => {
  var newArray = []
  var lookupObject = {}

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i])
  }

  return newArray
}
