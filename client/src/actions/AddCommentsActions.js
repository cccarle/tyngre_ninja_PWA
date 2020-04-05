import {
  addCommentToFB,
  addCommentToPublicList,
  deleteCommentFromFB
} from '../helpers/dbFunctions'

export const openAddCommentModal = (store, user) => {
  //store.setState({ showAddComment: true })
  //   store.setState({ showAddComment: true })
}

export const toggleShowAddCommentModal = (store, show) => {
  store.setState({ showAddComment: show })
}

export const selectWhichHost = (store, user) => {
  store.setState({ selectedHost: user })
}

export const handleCommentOnChange = (store, msg) => {
  store.setState({ addCommentMSG: msg })
}

export const addComment = (store, user, sender, msg, globalActions) => {
  if (sender == '') {
    sender = 'Anonym'
  }

  addCommentToFB(user, sender, msg, globalActions)
}

export const addCommentSenderName = (store, sender) => {
  store.setState({ commentSender: sender })
}

export const confirmComment = (store, comment) => {
  addCommentToPublicList(comment)
}

export const deleteComment = (store, comment) => {
  deleteCommentFromFB(comment)
}
