import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Picker } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { getAlumnosdeUnApoderado, obtenerNotas } from '../services/auth.services';

const GradesScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    console.log('Fetching students...');
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAlumnosdeUnApoderado('USER_ID'); // Reemplaza con ID dinámico si aplica
      if (response.success) {
        console.log('Students fetched successfully:', response.data);
        setStudents(Array.isArray(response.data) ? response.data : []);
      } else {
        console.error('Error fetching students:', response.error);
        setStudents([]);
      }
    } catch (error) {
      console.error('Unexpected error fetching students:', error);
      setStudents([]);
    }
  };

  const fetchGrades = async (studentId) => {
    console.log('Fetching grades for student ID:', studentId);
    try {
      const response = await obtenerNotas(studentId);
      if (response.success) {
        console.log('Grades fetched successfully:', response.data);
        setEvaluations(ordenarNotas(response.data));
      } else {
        console.error('Error fetching grades:', response.error);
      }
    } catch (error) {
      console.error('Unexpected error fetching grades:', error);
    }
  };

  const ordenarNotas = (notas) => {
    const evaluaciones = [];
    notas.forEach((nota) => {
      const index = evaluaciones.findIndex((e) => e.asignatura === nota.asignatura);
      if (index === -1) {
        evaluaciones.push({ asignatura: nota.asignatura, notas: [nota.calificacion] });
      } else {
        evaluaciones[index].notas.push(nota.calificacion);
      }
    });
    return evaluaciones;
  };

  const calculateAverage = (grades) => {
    if (grades.length === 0) return '-';
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return (total / grades.length).toFixed(2);
  };

  const overallAverage = (
    evaluations.reduce((sum, evaluation) => {
      const avg = evaluation.notas.length ? parseFloat(calculateAverage(evaluation.notas)) : 0;
      return sum + avg;
    }, 0) / evaluations.filter((e) => e.notas.length > 0).length
  ).toFixed(2);

  const handleStudentChange = (studentId) => {
    setSelectedStudent(studentId || '');
    console.log('Selected student ID:', studentId);
    if (studentId) fetchGrades(studentId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.schoolName}>Colegio Bajos del Cerro Chico</Text>
      </View>

      <View style={styles.content}>
        <Picker
          selectedValue={selectedStudent}
          onValueChange={(itemValue) => handleStudentChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un alumno" value="" />
          {Array.isArray(students) &&
            students.map((student) => (
              <Picker.Item key={student.id} label={`${student.nombre} ${student.apellido}`} value={student.id} />
            ))}
        </Picker>

        {selectedStudent !== '' && (
          <View>
            {evaluations.map((evaluation) => (
              <Card key={evaluation.asignatura} style={styles.gradeCard}>
                <Card.Content>
                  <Text style={styles.subject}>{evaluation.asignatura}</Text>
                  {evaluation.notas.map((nota, index) => (
                    <Text key={index} style={styles.grade}>Nota {index + 1}: {nota}</Text>
                  ))}
                  <Text style={styles.average}>Promedio: {calculateAverage(evaluation.notas)}</Text>
                </Card.Content>
              </Card>
            ))}

            <Card style={styles.overallCard}>
              <Card.Content>
                <Text style={styles.subject}>Promedio General</Text>
                <Text style={styles.overallAverage}>{overallAverage}</Text>
              </Card.Content>
            </Card>
          </View>
        )}

        <Button mode="contained" style={styles.backButton} onPress={() => console.log('Back to main menu')}>
          <Text style={styles.buttonText}>Volver al menú principal</Text>
        </Button>
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
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7FA',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: -16,
  },
  picker: {
    height: 50,
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  gradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  grade: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  average: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  overallCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
  },
  overallAverage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 24,
    backgroundColor: '#003366',
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default GradesScreen;
