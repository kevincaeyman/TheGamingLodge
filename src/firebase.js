// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaQXWWUdPxFEQf4XAvo92itGQmqwVaw4E",
  authDomain: "gaming-lodge.firebaseapp.com",
  projectId: "gaming-lodge",
  storageBucket: "gaming-lodge.appspot.com",
  messagingSenderId: "400367238436",
  appId: "1:400367238436:web:1d640bcd023718f12147b1",
  measurementId: "G-20T2K7JBW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);