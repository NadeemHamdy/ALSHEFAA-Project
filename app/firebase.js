// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzLEQeU4bzMvqkSq1TyCQNzxaoLded2HM",
  authDomain: "project-one-5b2af.firebaseapp.com",
  projectId: "project-one-5b2af",
  storageBucket: "project-one-5b2af.firebasestorage.app",
  messagingSenderId: "288179168234",
  appId: "1:288179168234:web:73c81d0fdeb14c89b7c893",
  measurementId: "G-QYCQ9PXXD9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };