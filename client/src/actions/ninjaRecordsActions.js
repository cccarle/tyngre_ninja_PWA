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
  if (ninjaRecords.length == 2) {
    addProfileImageToRecords(ninjaRecords)
    let ninjaOfTheDayObj = ninjaRecords.reduce((prev, current) =>
      prev.weightDiff > current.weightDiff ? prev : current
    )

    ninjaData.ninjaRecords = ninjaRecords
    ninjaData.ninjaOfTheDayObj = ninjaOfTheDayObj
    store.setState({ ninjaOfTheDay: ninjaData })
  }

  if (ninjaRecords.length == 1) {
    if (ninjaRecords[0].user == 'Alex') {
      ninjaData.message = 'Vi väntar på Andreas, påminn han vetja!'
      store.setState({ ninjaOfTheDay: ninjaData })
    }

    if (ninjaRecords[0].user == 'Andreas') {
      ninjaData.message = 'Vi väntar på Alex, påminn han vetja!'
      store.setState({ ninjaOfTheDay: ninjaData })
    }
  }

  if (ninjaRecords.length == 0) {
    ninjaData.message =
      'Varken Alex eller Andreas har vägt in sig idag, påminn dem!'
    store.setState({ ninjaOfTheDay: ninjaData })
  }
}

const addProfileImageToRecords = ninjaRecords => {
  ninjaRecords.map(record => {
    if (record.user == 'Alex') {
      record.img = alexImage
    }

    if (record.user == 'Andreas') {
      record.img = andreasImage
    }
  })
}
