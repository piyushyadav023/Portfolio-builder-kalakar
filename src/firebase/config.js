// --- File: src/firebase/config.js ---
// Is file mein Firebase ko apne app se connect karne ka code hai.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// IMPORTANT: Yeh details aapko apne Firebase project se milengi.
// Inhe apne actual Firebase config se zaroor replace karein.
const firebaseConfig = {
  apiKey: "AIzaSyBxG_aKu6vNobA1mWCcEGoJeMZf0ehjZ_w",
  authDomain: "portfolio-builder-kalakar.firebaseapp.com",
  projectId: "portfolio-builder-kalakar",
  storageBucket: "portfolio-builder-kalakar.firebasestorage.app",
  messagingSenderId: "36849424522",
  appId: "1:36849424522:web:f32ebe30e13a318c747573"
};

// Firebase ko initialize karein
const app = initializeApp(firebaseConfig);

// Services ko export karein taaki poore app mein use kar sakein
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);