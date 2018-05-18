import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: `AIzaSyCLk81C1DDRWQc8CpdSyZ32tkMtfMwn8ww`,
  authDomain: `group-project-3-6cf9b.firebaseapp.com`,
  databaseURL: `https://group-project-3-6cf9b.firebaseio.com`,
  projectId: `group-project-3-6cf9b`,
  storageBucket: `group-project-3-6cf9b.appspot.com`,
  messagingSenderId: `472450284958`
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
