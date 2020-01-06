/* 
Toggel on or off to show spinner.
Show :: boolean
*/

export const toggelSpinner = (store, show) => {
  store.setState({ showSpinner: show })
}
