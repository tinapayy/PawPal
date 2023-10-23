// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5T8qUxhXBJ-a2oTTBAPiDhiUdNTMmBYk",
  authDomain: "pawpal-c4ade.firebaseapp.com",
  projectId: "pawpal-c4ade",
  storageBucket: "pawpal-c4ade.appspot.com",
  messagingSenderId: "147837843907",
  appId: "1:147837843907:web:b3e0efaea93b7ffad86576"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);