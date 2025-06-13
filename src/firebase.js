// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCefrizYrNddWoSWJ5ZCUW90gpiNrcBGVE",
  authDomain: "react-todolist-study.firebaseapp.com",
  projectId: "react-todolist-study",
  storageBucket: "react-todolist-study.firebasestorage.app",
  messagingSenderId: "607771377264",
  appId: "1:607771377264:web:1b3c82b11dd5a33f09feb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
