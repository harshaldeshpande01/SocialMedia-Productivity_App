import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBNOJeXAEdGM7glbVtnjRJDy8BFH7ODiYA",
  authDomain: "socioprod-app.firebaseapp.com",
  projectId: "socioprod-app",
  storageBucket: "socioprod-app.appspot.com",
  messagingSenderId: "481574330027",
  appId: "1:481574330027:web:5a365dc40b26f45ee721ee"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, googleProvider, facebookProvider, storage };


