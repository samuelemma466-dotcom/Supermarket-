import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-PPWpBA7_TtQur177IsVpz1i0408WFDU",
  authDomain: "supermarket-genius.firebaseapp.com",
  projectId: "supermarket-genius",
  storageBucket: "supermarket-genius.firebasestorage.app",
  messagingSenderId: "57329016772",
  appId: "1:57329016772:web:863f44e0933e9aef974e91",
  measurementId: "G-45QDN4BK4Y"
};

const app = initializeApp(firebaseConfig);

// Safely initialize analytics to prevent app crash if it fails
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Firebase Analytics failed to initialize:", error);
}

export { analytics };
export const db = getFirestore(app);
export const auth = getAuth(app);