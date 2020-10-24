import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB5JN1H02TrlNiKDNXLDRm-D25yOQPeDzc",
  authDomain: "clone-d7a99.firebaseapp.com",
  databaseURL: "https://clone-d7a99.firebaseio.com",
  projectId: "clone-d7a99",
  storageBucket: "clone-d7a99.appspot.com",
  messagingSenderId: "524045198334",
  appId: "1:524045198334:web:af3fa3f289da9e9226d6af",
  measurementId: "G-7B62DS3MMR",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

//
