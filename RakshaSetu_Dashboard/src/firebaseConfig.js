// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Corrected import
import { getAnalytics } from "firebase/analytics"; // Corrected import

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRD6pmrMCcuAksz8hqxXAkP8hV3jih47c",
  authDomain: "rakshasetu-c9e0b.firebaseapp.com",
  projectId: "rakshasetu-c9e0b",
  storageBucket: "rakshasetu-c9e0b.firebasestorage.app",
  messagingSenderId: "704291591905",
  appId: "1:704291591905:web:ffde7bd519cfad3106c9a0",
  measurementId: "G-JJ881F4VBQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app); // Initialize analytics if needed