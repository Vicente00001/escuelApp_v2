import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebase-config'; // Tu configuración de Firebase

// Inicializa la app si no está inicializada
const app = initializeApp(firebaseConfig);

// Inicializa Auth con persistencia
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Exporta instancias de auth y firestore
export { auth };
export const firestore = getFirestore(app);