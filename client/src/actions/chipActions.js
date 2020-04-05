export const toggelChipModal = (store, show, globalActions) => {
  store.setState({ showChip: show })
}

export const toggelCommentChipModal = (store, show) => {
  store.setState({ showCommentChip: show })
}
