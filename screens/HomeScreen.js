import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { firestore } from '../services/firebase'; // Importa Firestore desde firebase.js
import { UserContext } from '../services/UserContext'; // Importa el contexto del usuario
import { doc, getDoc } from 'firebase/firestore'; // IMPORTA ESTAS FUNCIONES

const HomeScreen = ({ navigation }) => {
  const { userId } = useContext(UserContext); // Obtén el userId del contexto
  const [apoderadoNombre, setApoderadoNombre] = useState('');

  useEffect(() => {
    const fetchApoderado = async () => {
      try {
        console.log('Obteniendo datos del apoderado con ID:', userId);
        const apoderadoRef = doc(firestore, 'Apoderados', userId); // Refiere el documento en Firestore
        const apoderadoSnap = await getDoc(apoderadoRef); // Obtén el documento

        if (apoderadoSnap.exists()) {
          const data = apoderadoSnap.data();
          console.log('Datos del apoderado:', data);
          setApoderadoNombre(`${data.nombre} ${data.apellido}`); // Ajusta según los campos de tu colección
        } else {
          console.log('No se encontró el apoderado con el ID proporcionado.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del apoderado:', error);
      }
    };

    if (userId) {
      fetchApoderado();
    }
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.schoolName}>Colegio Bajos del Cerro Chico</Text>
        {apoderadoNombre ? (
          <Text style={styles.welcomeText}>Bienvenido, {apoderadoNombre}</Text>
        ) : (
          <Text style={styles.welcomeText}>Cargando...</Text>
        )}
      </View>

      <View style={styles.notificationContainer}>
        <Card style={styles.notificationCard}>
          <Card.Content>
            <Text style={styles.notificationTitle}>Última notificación:</Text>
            <Text style={styles.notificationText}>
              Tu profesor ha publicado una actualización importante en el foro.
            </Text>
            <TouchableOpacity
              style={styles.moreInfoButton}
              onPress={() => navigation.navigate('News')} // Asegúrate de usar el nombre correcto
            >
              <Text style={styles.moreInfoText}>Ver las últimas novedades</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Attendance')} // Revisa el nombre de tu pantalla
        >
          <Text style={styles.menuItemText}>Revisar asistencia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Forum')} // Revisa el nombre de tu pantalla
        >
          <Text style={styles.menuItemText}>Foro de curso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Grades')} // Revisa el nombre de tu pantalla
        >
          <Text style={styles.menuItemText}>Revisar calificaciones</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#003366',
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
  },
  notificationContainer: {
    padding: 16,
    backgroundColor: '#E0F7FA',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 14,
    color: '#000000',
  },
  moreInfoButton: {
    marginTop: 12,
    backgroundColor: '#003366',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  moreInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
});

export default HomeScreen;
