// src/data/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCVBZa3h9uTgz11gt8JDH7u9QIJOGitws",
  authDomain: "afrieuropanews.firebaseapp.com",
  projectId: "afrieuropanews",
  storageBucket: "afrieuropanews.appspot.com",
  messagingSenderId: "77258538474",
  appId: "1:77258538474:web:da2087969fbd059e400693",
  measurementId: "G-VEVW0MXTBN",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
