// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"
import { getAnalytics } from "firebase/analytics";

import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7JyWTODow9lU1sucUF33ycjqohUxg2nQ",
  authDomain: "doorstep-depot.firebaseapp.com",
  projectId: "doorstep-depot",
  storageBucket: "doorstep-depot.appspot.com",
  messagingSenderId: "750874379929",
  appId: "1:750874379929:web:ecef32384d9a187be51a08",
  measurementId: "G-G0DXHH66WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)
export const auth=getAuth()



export default app