// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZfO2cTMvD0B1ZHyxbysA0IS4BdXlO54g",
  authDomain: "i-am-safe-56919.firebaseapp.com",
  projectId: "i-am-safe-56919",
  storageBucket: "i-am-safe-56919.appspot.com",
  messagingSenderId: "341220866753",
  appId: "1:341220866753:web:1c0933173a1498d5bc7240",
  measurementId: "G-7D13P6FDXF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
