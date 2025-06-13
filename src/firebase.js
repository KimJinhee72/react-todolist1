// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCefrizYrNddWoSWJ5ZCUW90gpiNrcBGVE",
  authDomain: "react-todolist-study.firebaseapp.com",
  projectId: "react-todolist-study",
  storageBucket: "react-todolist-study.firebasestorage.app",
  messagingSenderId: "607771377264",
  appId: "1:607771377264:web:1b3c82b11dd5a33f09feb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// db는 Firestore 데이터베이스 인스턴스를 나타냅니다. TodoForm.jsx에  db를 사용하여 Firestore에 접근할 수 있습니다.
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();