import {
  getCommentsFromFB,
  getPublicCommentsFromFB
} from '../helpers/dbFunctions'

export const fetchComments = async (store, globalState, globalActions) => {
  getCommentsFromFB(store, globalState, globalActions)
}

export const fetchPublicComments = async (
  store,
  globalState,
  globalActions
) => {
  getPublicCommentsFromFB(store, globalState, globalActions)
}
