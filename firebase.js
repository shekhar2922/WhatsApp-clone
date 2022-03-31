import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import  'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBgKPNkIgX4gpiaHWY0lPCwuyjXSIkFfMY",
    authDomain: "whatsapp-e4247.firebaseapp.com",
    projectId: "whatsapp-e4247",
    storageBucket: "whatsapp-e4247.appspot.com",
    messagingSenderId: "61062812084",
    appId: "1:61062812084:web:f3baeda633e0502ecf22e1"
  };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
export default firebaseApp;