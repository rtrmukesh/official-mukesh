// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIkqHQxlYtKB_LkK439VhyVL8yV3rRRuA",
  authDomain: "sush-production.firebaseapp.com",
  projectId: "sush-production",
  storageBucket: "sush-production.firebasestorage.app",
  messagingSenderId: "74983996414",
  appId: "1:74983996414:web:f8b5134aeae4f214f49eaf",
  measurementId: "G-HZ9ZY8WJ7Q"
};

// avoid re-initializing (Next.js refresh issue)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// firebase modules
export const auth = getAuth(app);

// analytics only works in browser
export const analytics = typeof window !== "undefined" 
  ? await isSupported().then(supported => supported ? getAnalytics(app) : null)
  : null;

export default app;
