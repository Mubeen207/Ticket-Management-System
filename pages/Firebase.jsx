import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAE37jgIzcp3cBJ1FhNTogR34WHO4YtthI",
  authDomain: "ticket-management-system-4b4d3.firebaseapp.com",
  projectId: "ticket-management-system-4b4d3",
  storageBucket: "ticket-management-system-4b4d3.firebasestorage.app",
  messagingSenderId: "586684307304",
  appId: "1:586684307304:web:59ff15514c47c9363ea8dd",
  measurementId: "G-NVX05J5VLE",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
