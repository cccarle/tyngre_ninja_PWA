import { addWeightRecordToFB } from '../helpers/dbFunctions'

/* 
Toggel on or off to show spinner.
Show :: boolean
*/

export const setWeight = (store, selectedWeight, globalActions) => {
  store.setState({ weight: selectedWeight })
}

/* 
Toggel on or off to show spinner.
Show :: boolean
*/

export const setDate = (store, selectedDate, globalActions) => {
  store.setState({ date: selectedDate })
}

export const addWeightRecord = (store, date, weight, globalActions) => {
  addWeightRecordToFB(date, weight, globalActions)
}
