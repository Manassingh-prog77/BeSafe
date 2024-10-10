// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Add_Your_Api_key",
  authDomain: "Add_Your_Domain",
  projectId: "Add_Your_Project_Id",
  storageBucket: "Enter your Crednetials",
  messagingSenderId: "Enter your Crednetials",
  appId: "Enter your Crednetials",
  measurementId: "Enter your Crednetials"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
