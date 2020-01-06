import {
  addWeightRecordToFB,
  addStartWeightRecordToFB
} from '../helpers/dbFunctions'

export const setWeight = (store, selectedWeight, globalActions) => {
  store.setState({ weight: selectedWeight })
}

export const setStartWeight = (store, selectedStartWeight) => {
  store.setState({ startWeight: selectedStartWeight })
}

export const setDate = (store, selectedDate, globalActions) => {
  store.setState({ date: selectedDate })
}

export const addStartWeightRecord = (store, weight, globalActions) => {
  addStartWeightRecordToFB(store, weight, globalActions)
}

export const addWeightRecord = (store, date, weight, globalActions) => {
  addWeightRecordToFB(date, weight, globalActions)
}

export const clearFields = store => {
  store.setState({ date: new Date(), weight: '' })
}
