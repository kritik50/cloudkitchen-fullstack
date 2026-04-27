import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

const invalidKey = (value) =>
  !value || String(value).trim() === "" || String(value).includes("your-");

const missing = requiredKeys.filter((key) => invalidKey(firebaseConfig[key]));

export const firebaseInitError =
  missing.length > 0
    ? `Firebase is not configured. Missing/placeholder keys: ${missing.join(", ")}`
    : "";

const app = firebaseInitError ? null : initializeApp(firebaseConfig);

export const isFirebaseConfigured = !firebaseInitError;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
