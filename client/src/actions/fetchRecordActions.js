import { getRecordsFromFB } from '../helpers/dbFunctions'

export const fetchRecords = async (store, globalActions) => {
  let recordsFromFB = await getRecordsFromFB(store, globalActions)
  globalActions.setRecords(recordsFromFB, globalActions)
}

export const setRecords = (store, recordsFromFB) => {
  store.setState({ records: recordsFromFB })
}
