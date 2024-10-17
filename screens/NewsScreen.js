import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

const newsTopics = [
  { title: 'Actualización del Plan de Estudios', teacher: 'Prof. Martínez', content: 'Se han realizado actualizaciones importantes en el plan de estudios para este semestre. Revisa los cambios en el sitio web del colegio.' },
  { title: 'Próximo Examen de Matemáticas', teacher: 'Prof. González', content: 'El examen de matemáticas se realizará el próximo lunes. Asegúrate de revisar los temas en el portal de exámenes.' },
  { title: 'Actividades Extracurriculares', teacher: 'Prof. Rodríguez', content: 'Este mes comenzaremos una serie de actividades extracurriculares. Consulta la agenda para más detalles sobre horarios y fechas.' },
  { title: 'Reunión de Padres', teacher: 'Prof. Fernández', content: 'La próxima reunión de padres se llevará a cabo el viernes a las 18:00 en el auditorio. Tu asistencia es muy importante.' },
];

const NewsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.schoolName}>Colegio Bajos del Cerro Chico</Text>
        <Text style={styles.title}>Noticias</Text>
      </View>

      <View style={styles.content}>
        {newsTopics.map((topic, index) => (
          <Card key={index} style={styles.topicCard}>
            <Card.Content>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicTeacher}>Publicado por: {topic.teacher}</Text>
              <Text style={styles.topicContent}>{topic.content}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver al Menú Principal</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7FA', // Celeste
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: -16, // Para que se sobreponga ligeramente al área azul
  },
  topicCard: {
    backgroundColor: '#FFFFFF', // Blanco
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366', // Azul marino
  },
  topicTeacher: {
    fontSize: 14,
    color: '#003366', // Azul marino
    marginVertical: 4,
  },
  topicContent: {
    fontSize: 16,
    color: '#000000', // Negro
  },
  backButton: {
    backgroundColor: '#003366', // Azul marino
    padding: 12,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF', // Blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewsScreen;
