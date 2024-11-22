import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD91V-WN5bH7cTpzXD7Zs9_-z-8HfgzDiY",
    authDomain: "docapp-4d9b0.firebaseapp.com",
    projectId: "docapp-4d9b0",
    storageBucket: "docapp-4d9b0.firebasestorage.app",
    messagingSenderId: "469388992891",
    appId: "1:469388992891:web:9d609ce6ffb1e67e509dde",
    measurementId: "G-R229Q8QV3X"
  };

  const app = initializeApp(firebaseConfig)
  export const db = getFirestore(app);