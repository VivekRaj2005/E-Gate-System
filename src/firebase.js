// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWIRig_QwxFNbSxdVgGpgN5dN11UuJpTw",
  authDomain: "hackrush-39cba.firebaseapp.com",
  projectId: "hackrush-39cba",
  storageBucket: "hackrush-39cba.appspot.com",
  messagingSenderId: "1007422687348",
  appId: "1:1007422687348:web:049d0846e1af7d8a84a921",
  measurementId: "G-8S789MMP6W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

