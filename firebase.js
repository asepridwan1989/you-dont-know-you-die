import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: "AIzaSyDh6Sgm7XzLfwGDipaKcneydGJHt4rjqz8",
  authDomain: "ydkyd-d115e.firebaseapp.com",
  databaseURL: "https://ydkyd-d115e.firebaseio.com",
  projectId: "ydkyd-d115e",
  storageBucket: "",
  messagingSenderId: "497915472610"
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
