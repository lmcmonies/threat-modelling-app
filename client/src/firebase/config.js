import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYsHmoxHo4TKeTzp-SQl5viKjjqP_0stw",
    authDomain: "elevation-of-privilege.firebaseapp.com",
    databaseURL: "https://elevation-of-privilege-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "elevation-of-privilege",
    storageBucket: "elevation-of-privilege.appspot.com",
    messagingSenderId: "512099461949",
    appId: "1:512099461949:web:ccbff10c7b7cf85e713354",
    measurementId: "G-LY22KWB6DM"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
const aUnion = firebase.firestore.FieldValue.arrayUnion
const increment = firebase.firestore.FieldValue.increment(1)
//const decrement = firebase.firestore.FieldValue.increment(-1)

export { projectAuth, projectFirestore, timestamp, aUnion, increment}