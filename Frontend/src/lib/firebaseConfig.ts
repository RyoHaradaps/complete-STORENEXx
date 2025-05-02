// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfJ3hR1yYPxMpkKdFsPPpRgcG4iMWsqUs",
  authDomain: "storenex-firebase.firebaseapp.com",
  projectId: "storenex-firebase",
  storageBucket: "storenex-firebase.firebasestorage.app",
  messagingSenderId: "474604346317",
  appId: "1:474604346317:web:a25317acee0a3867478284",
  measurementId: "G-F1N4XMLK8C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export auth for authentication