import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';

const grades = {
  Matematicas: (Math.random() * 3 + 4).toFixed(1),
  Lenguaje: (Math.random() * 3 + 4).toFixed(1),
  Inglés: (Math.random() * 3 + 4).toFixed(1),
  Biología: (Math.random() * 3 + 4).toFixed(1),
  Química: (Math.random() * 3 + 4).toFixed(1),
  Física: (Math.random() * 3 + 4).toFixed(1),
  Educación: (Math.random() * 3 + 4).toFixed(1),
};

const GradesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.schoolName}>Colegio Bajos del Cerro Chico</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.studentName}>Juanito Pérez</Text>
        <Text style={styles.course}>Curso: Cuarto Medio B</Text>

        {Object.keys(grades).map((subject) => (
          <Card key={subject} style={styles.gradeCard}>
            <Card.Content>
              <Text style={styles.subject}>{subject}</Text>
              <Text style={styles.grade}>Calificación: {grades[subject]}</Text>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsText}>Ver detalles</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}

        <Button mode="contained" style={styles.backButton}>
          Volver al menú principal
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366', // Azul marino
  },
  header: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#003366', // Azul marino
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7FA', // Celeste
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: -16, // Para que se sobreponga ligeramente al área azul
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366', // Azul marino
    marginBottom: 8,
  },
  course: {
    fontSize: 18,
    color: '#003366', // Azul marino
    marginBottom: 24,
  },
  gradeCard: {
    backgroundColor: '#FFFFFF', // Blanco
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366', // Azul marino
  },
  grade: {
    fontSize: 16,
    color: '#000000', // Negro
    marginBottom: 8,
  },
  detailsButton: {
    marginTop: 8,
    backgroundColor: '#003366', // Azul marino
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  detailsText: {
    color: '#FFFFFF', // Blanco
    fontSize: 14,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 24,
    backgroundColor: '#003366', // Azul marino
  },
});

export default GradesScreen;
