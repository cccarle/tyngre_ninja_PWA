import firebase from '../config/firebase'
let db = firebase.firestore()

export const addPropertyToUser = (userID, userProperties) => {
  const { email, firstName, lastName, username } = userProperties

  db.collection('users')
    .doc(userID)
    .set({
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName
    })
}
