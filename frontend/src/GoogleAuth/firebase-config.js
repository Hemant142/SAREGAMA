import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxqU-jista8B01wNeOJF-SSumWnqxdN4s",
  authDomain: "auth-67398.firebaseapp.com",
  projectId: "auth-67398",
  storageBucket: "auth-67398.appspot.com",
  messagingSenderId: "869203406728",
  appId: "1:869203406728:web:20f864ba81d0d0e9e5d43d",
  measurementId: "G-2XX76VL3JD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { app, auth, provider, analytics };
