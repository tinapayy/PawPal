// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// import {getAuth} from 'firebase/auth';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';
import {getStorage, ref} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2vj7393wFSD_4lT4LrQOBhgRZ-cf-OEk',
  authDomain: 'pawpal-c87ba.firebaseapp.com',
  projectId: 'pawpal-c87ba',
  storageBucket: 'pawpal-c87ba.appspot.com',
  messagingSenderId: '1092218500010',
  appId: '1:1092218500010:web:79a99a70d29db347eb31d3',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
