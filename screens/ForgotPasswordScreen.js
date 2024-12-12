import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handlePasswordReset = () => {
    if (!email) {
      setMessage('Por favor, ingresa tu correo electrónico.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Se ha enviado un enlace a tu correo para restablecer tu contraseña.');
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case 'auth/user-not-found':
            setMessage('No se encontró una cuenta con este correo.');
            break;
          case 'auth/invalid-email':
            setMessage('El formato del correo no es válido.');
            break;
          default:
            setMessage('Ocurrió un error. Inténtalo de nuevo.');
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Contraseña</Text>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          placeholderTextColor="#B0BEC5"
          value={email}
        />

        <Button
          mode="contained"
          style={styles.resetButton}
          onPress={handlePasswordReset}
        >
          Enviar enlace
        </Button>
      </View>
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
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 24,
    textAlign: 'center',
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
  resetButton: {
    backgroundColor: '#003366',
    padding: 10,
  },
  message: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
