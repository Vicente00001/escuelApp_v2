import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';

const LoginScreen = () => {
  const navigation = useNavigation(); // Obtener la referencia de la navegación
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Account created!')
            const user = userCredential.user;
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log('Signed In!');
            const user = userCredential.user;
            console.log(user);
      
            navigation.navigate('Home');
          })
          .catch(error => {
            console.log(error);
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

          <TextInput
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            placeholderTextColor="#B0BEC5"
          />

          <TextInput
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor="#B0BEC5"
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            style={styles.loginButton}
            onPress={handleSignIn}  // Solo llama a la función handleSignIn aquí
>
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
});

export default LoginScreen;
