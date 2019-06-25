import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyApUQ2w09VxholeaQ6i2zG7xLbCkMtL4O8",
  authDomain: "note-react-app-1b304.firebaseapp.com",
  databaseURL: "https://note-react-app-1b304.firebaseio.com",
  projectId: "note-react-app-1b304",
  storageBucket: "",
  messagingSenderId: "70125977560",
  appId: "1:70125977560:web:c06e94c462f4c7a1"
};
// Initialize Firebase
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
