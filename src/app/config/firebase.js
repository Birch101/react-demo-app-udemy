import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

// included for demo purposes, but should not normally be checked in - account limits have been set
const firebaseConfig = {
    apiKey: "",
    authDomain: "react-demo-c5653.firebaseapp.com",
    projectId: "react-demo-c5653",
    storageBucket: "react-demo-c5653.appspot.com",
    messagingSenderId: "798146450723",
    appId: "1:798146450723:web:b1a6c633e2a2daaa1e2896",
    measurementId: "G-X8FJFW76JF"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;