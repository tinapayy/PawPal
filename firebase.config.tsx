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
  apiKey: 'AIzaSyAE_w2PYZUdG6RcOmCMxuJgw-5MOtfj0uE',
  authDomain: 'pawpal-bf0d3.firebaseapp.com',
  projectId: 'pawpal-bf0d3',
  storageBucket: 'pawpal-bf0d3.appspot.com',
  messagingSenderId: '747495959390',
  appId: '1:747495959390:web:91528f916887411ff33dcf',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
