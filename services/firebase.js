// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config'; // Tu configuración de Firebase

// Inicializa la app si no está inicializada
const app = initializeApp(firebaseConfig);

// Exporta instancias de auth y firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);
