
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: reemplaza con tus credenciales de Firebase (web) - RN usa las mismas
export const firebaseConfig = {
  apiKey: "AIzaSyD0p5C9AFVl3ieO7v4EQdF0v53m2j16sdE",
  authDomain: "proyecto-final-f4772.firebaseapp.com",
  projectId: "proyecto-final-f4772",
  storageBucket: "proyecto-final-f4772.firebasestorage.app",
  mensajeríaSenderId: "725456515413",
  appId: "1:725456515413:web:cae6d74c5953ca6ab83fdc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
