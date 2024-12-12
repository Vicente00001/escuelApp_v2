import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import AsistScreen from './screens/AttendanceScreen';
import ForumScreen from './screens/ForumScreen';
import GradesScreen from './screens/GradesScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { UserProvider } from './services/UserContext';
import { UserNameProvider } from './services/UserNameContext';

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
    <UserProvider>
      <UserNameProvider>
        <MainNavigator />
      </UserNameProvider>
    </UserProvider>
  );
}

