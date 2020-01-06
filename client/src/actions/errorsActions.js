/* 
Set/show error msg from API
*/

export const setAuthErrorMsg = (store, error) => {
  console.log(error)
  store.setState({ authError: error })
}
