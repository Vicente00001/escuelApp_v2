import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import AsistScreen from './screens/AsistScreen';
import ForumScreen from './screens/ForumScreen';
import GradesScreen from './screens/GradesScreen';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import {intitializeApp } from 'firebase/app';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <MainNavigator />
  );
}
