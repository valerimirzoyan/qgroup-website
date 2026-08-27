import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB1zMzbaElhFiFq0azJR7gAVHZHyxeP7XA",
  authDomain: "q-group-armenia.firebaseapp.com",
  projectId: "q-group-armenia",
  storageBucket: "q-group-armenia.firebasestorage.app",
  messagingSenderId: "108736713389",
  appId: "1:108736713389:web:7abb40ea273fa4523fac24",
  measurementId: "G-BRRWELYEVH",
};

// Initialize Firebase App singleton
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics safely on client-side
export let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
