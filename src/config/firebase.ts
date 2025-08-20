import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIeVu7hS76cLV8PMwy11sjUA7v3Y4qVF4",
  authDomain: "positive-reinforcement-tracker.firebaseapp.com",
  projectId: "positive-reinforcement-tracker",
  storageBucket: "positive-reinforcement-tracker.firebasestorage.app",
  messagingSenderId: "654076723968",
  appId: "1:654076723968:web:e6d731812bc86c5022e9e5",
  measurementId: "G-46RGRPBTSW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();