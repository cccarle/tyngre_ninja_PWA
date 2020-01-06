import {
  getRecordsFromFB,
  getRecordsStartWeightFB
} from '../helpers/dbFunctions'

export const fetchRecords = async (store, globalActions) => {
  await getRecordsFromFB(store, globalActions)
}

export const setRecords = (store, recordsFromFB) => {
  store.setState({ records: recordsFromFB })
}

export const fetchStartWeight = async (store, globalActions) => {
  await getRecordsStartWeightFB(store, globalActions)
}

export const setStartWeights = (store, weight) => {
  store.setState({ startWeightFromDB: weight })
}
