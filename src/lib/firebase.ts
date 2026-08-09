import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "med-ai-9876543210.firebaseapp.com",
  projectId: "med-ai-9876543210",
  storageBucket: "med-ai-9876543210.firebasestorage.app",
  messagingSenderId: "571020504201",
  appId: "1:571020504201:web:09e6b9989a0b2a207b2a58"
};

// Initialize Firebase for SSR compatibility
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
