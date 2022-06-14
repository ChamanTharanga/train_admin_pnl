
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import 'firebase/storage';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  projectId: process.env.REACT_APP_firebase_projectId,
  storageBucket: process.env.REACT_APP_firebase_storageBucket,
  messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
  appId: process.env.REACT_APP_firebase_appId,
  measurementId: process.env.REACT_APP_firebase_measurementId
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

export const firestore = getFirestore(firebaseApp);


export const trainCollection = collection(firestore, 'trains');
export const stationCollection = collection(firestore, 'stations');
export const routerCollection = collection(firestore, 'routers');
export const bookingCollection = collection(firestore, 'bookings');
export const usersCollection = collection(firestore, 'users');
export const categoryCollection = collection(firestore, 'category');