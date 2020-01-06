/* 
Toggel on or off to show spinner.
Show :: boolean
*/

export const setView = (store, view) => {
  console.log(view)
  store.setState({ viewToShow: view })
}
