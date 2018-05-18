import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyANY9ar717wz0zn9wI1YNyjYy-AnrCMxps",
  authDomain: "ydkyd-3322c.firebaseapp.com",
  databaseURL: "https://ydkyd-3322c.firebaseio.com",
  projectId: "ydkyd-3322c",
  storageBucket: "ydkyd-3322c.appspot.com",
  messagingSenderId: "986548035683"
})

export const db = firebaseApp.database()