import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCdW7fWF6brOpul_5dsIbf0W8FRatGHRLg",
  authDomain: "myapp-60c26.firebaseapp.com",
  databaseURL: "https://myapp-60c26-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myapp-60c26",
  storageBucket: "myapp-60c26.appspot.com",
  messagingSenderId: "250943046987",
  appId: "1:250943046987:web:0dfa468b3da8a30610d4ce",
  measurementId: "G-K8WBQMRSVX"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
