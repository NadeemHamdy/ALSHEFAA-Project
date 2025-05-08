import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDHe15a7Fq_Pl9lThsiUrXpGmoux5NliYM",
  authDomain: "project-test-35fb7.firebaseapp.com",
  projectId: "project-test-35fb7",
  storageBucket: "project-test-35fb7.appspot.com", 
  messagingSenderId: "765689248226",
  appId: "1:765689248226:web:d674c51e4425d455c761bb"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };