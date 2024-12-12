import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import AsistScreen from './screens/AsistScreen';
import ForumScreen from './screens/ForumScreen';
import GradesScreen from './services/GradesScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; // Importar la nueva pantalla
import { UserProvider } from './services/UserContext'; // Importa el UserProvider

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="News" component={NewsScreen} options={{ title: 'Últimas Novedades' }} />
        <Stack.Screen name="Attendance" component={AsistScreen} options={{ title: 'Revisar Asistencia' }} />
        <Stack.Screen name="Forum" component={ForumScreen} options={{ title: 'Foro de Curso' }} />
        <Stack.Screen name="Grades" component={GradesScreen} options={{ title: 'Revisar Calificaciones' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar Contraseña' }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider> {/* Envuelve tu aplicación en el UserProvider */}
      <MainNavigator />
    </UserProvider>
  );
}

