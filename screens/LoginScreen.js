import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { UserContext } from '../services/UserContext'; // Importar el contexto del usuario

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUserId } = useContext(UserContext); // Obtener la función para actualizar el contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar el mensaje de error

  const handleSignIn = () => {
    if (!email && !password) {
      setErrorMessage('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    if (!email) {
      setErrorMessage('Por favor, ingresa tu correo.');
      return;
    }

    if (!password) {
      setErrorMessage('Por favor, ingresa tu contraseña.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password) // Usa la instancia de auth desde firebase.js
      .then((userCredential) => {
        console.log('Signed In!');
        const user = userCredential.user;
        console.log('Usuario logueado:', user.uid);

        // Guardar el userId en el contexto
        setUserId(user.uid);

        // Navegar a la pantalla de inicio si el inicio de sesión es exitoso
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);

        // Mostrar mensaje de error según el código de Firebase
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('El usuario no existe. Verifica tu correo.');
            break;
          case 'auth/wrong-password':
            setErrorMessage('La contraseña es incorrecta. Inténtalo de nuevo.');
            break;
          case 'auth/invalid-email':
            setErrorMessage('El formato del correo no es válido.');
            break;
          default:
            setErrorMessage('Ocurrió un error. Por favor, intenta de nuevo.');
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.schoolName}>Colegio Bajos del Cerro Chico</Text>
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>¡Bienvenido de vuelta! Por favor inicia sesión</Text>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TextInput
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            placeholderTextColor="#B0BEC5"
            value={email}
          />

          <TextInput
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor="#B0BEC5"
            value={password}
          />

          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
          </TouchableOpacity>

          <Button mode="contained" style={styles.loginButton} onPress={handleSignIn}>
            Iniciar sesión
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#003366',
  },
  container: {
    flex: 1,
    backgroundColor: '#003366',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  innerContainer: {
    padding: 24,
    backgroundColor: '#E0F7FA',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: -16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#003366',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#003366',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;
