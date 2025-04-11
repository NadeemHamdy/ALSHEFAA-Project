// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHe15a7Fq_Pl9lThsiUrXpGmoux5NliYM",
  authDomain: "project-test-35fb7.firebaseapp.com",
  projectId: "project-test-35fb7",
  storageBucket: "project-test-35fb7.firebasestorage.app",
  messagingSenderId: "765689248226",
  appId: "1:765689248226:web:d674c51e4425d455c761bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;