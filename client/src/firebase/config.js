/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//the firebaseConfig object must be inserted here. This requires that you create a project on firebase.
//Firebase provides this object that includes an apiKey, databaseURL etc. for working with the database.
//This is required or the app won't work. 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 //Insert Firebase Object Here
  };

// init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
const aUnion = firebase.firestore.FieldValue.arrayUnion
const increment = firebase.firestore.FieldValue.increment(1)
const decrement = firebase.firestore.FieldValue.increment(-1)

export { projectAuth, projectFirestore, timestamp, aUnion, increment, decrement}