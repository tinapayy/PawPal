import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAE_w2PYZUdG6RcOmCMxuJgw-5MOtfj0uE',
  authDomain: 'pawpal-bf0d3.firebaseapp.com',
  projectId: 'pawpal-bf0d3',
  storageBucket: 'pawpal-bf0d3.appspot.com',
  messagingSenderId: '747495959390',
  appId: '1:747495959390:web:91528f916887411ff33dcf',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
