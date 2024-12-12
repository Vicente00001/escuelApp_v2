import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { UserContext } from '../services/UserContext';
import { Picker } from '@react-native-picker/picker'; // Importar Picker desde @react-native-picker/picker

const GradesScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState({});
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      console.log('[GradesScreen] Buscando alumnos con apoderadoId:', userId);
      fetchStudents(userId);
      fetchSubjects();
    } else {
      console.warn('[GradesScreen] No se encontró un ID de usuario en el contexto.');
    }
  }, [userId]);

  const fetchStudents = async (apoderadoId) => {
    try {
      console.log('[GradesScreen] Consultando la colección "Alumnos" en Firestore con apoderadoId:', apoderadoId);

      const studentsQuery = query(
        collection(firestore, 'Alumnos'),
        where('apoderadoId', '==', apoderadoId)
      );
      const querySnapshot = await getDocs(studentsQuery);

      if (!querySnapshot.empty) {
        console.log(`[GradesScreen] Se encontraron ${querySnapshot.size} documentos en la colección "Alumnos".`);
        const alumnos = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(`[GradesScreen] Documento ID=${doc.id}:`, data);
          return {
            id: doc.id,
            nombre: data.nombre,
            apellido: data.apellido,
            notas: data.notas || [], // Manejar si "notas" no existe
          };
        });
        setStudents(alumnos);
      } else {
        console.warn('[GradesScreen] No se encontraron alumnos asociados al apoderado.');
        setStudents([]);
      }
    } catch (error) {
      console.error('[GradesScreen] Error al obtener los alumnos desde Firestore:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      console.log('[GradesScreen] Consultando la colección "Asignaturas" en Firestore...');
      const subjectsQuery = collection(firestore, 'Asignaturas');
      const querySnapshot = await getDocs(subjectsQuery);

      if (!querySnapshot.empty) {
        const subjectsMap = {};
        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          subjectsMap[doc.id] = data.nombre; // Mapear el ID al nombre de la asignatura
        });
        console.log('[GradesScreen] Mapeo de asignaturas:', subjectsMap);
        setSubjects(subjectsMap);
      } else {
        console.warn('[GradesScreen] No se encontraron asignaturas en Firestore.');
      }
    } catch (error) {
      console.error('[GradesScreen] Error al obtener las asignaturas desde Firestore:', error);
    }
  };

  const handleStudentChange = (studentId) => {
    setSelectedStudent(studentId);
    const student = students.find((s) => s.id === studentId);
    if (student) {
      console.log('[GradesScreen] Notas del alumno seleccionado:', student.notas);
      const processedGrades = processGrades(student.notas);
      setGrades(processedGrades);
    } else {
      setGrades([]);
    }
  };

  const processGrades = (notas) => {
    const gradeMap = {};
    notas.forEach((nota) => {
      if (!gradeMap[nota.asignaturaId]) {
        gradeMap[nota.asignaturaId] = { evaluaciones: [0, 0, 0] };
      }
      const index = gradeMap[nota.asignaturaId].evaluaciones.findIndex((val) => val === 0);
      if (index !== -1) {
        gradeMap[nota.asignaturaId].evaluaciones[index] = nota.calificacion;
      } else {
        gradeMap[nota.asignaturaId].evaluaciones.push(nota.calificacion);
      }
    });
    return Object.keys(gradeMap).map((asignaturaId) => ({
      asignaturaId,
      evaluaciones: gradeMap[asignaturaId].evaluaciones,
    }));
  };

  const calculateAverage = (evaluations) => {
    const validEvaluations = evaluations.filter(evaluation => evaluation > 0);
    if (validEvaluations.length === 0) return '-';
    const total = validEvaluations.reduce((sum, evaluation) => sum + evaluation, 0);
    return (total / validEvaluations.length).toFixed(2);
  };

  const calculateOverallAverage = () => {
    if (!grades || grades.length === 0) return '-';
    const totalAverages = grades.reduce((sum, grade) => {
      const average = parseFloat(calculateAverage(grade.evaluaciones));
      return sum + (isNaN(average) ? 0 : average);
    }, 0);
    return (totalAverages / grades.length).toFixed(2);
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
          {students.length > 0 ? (
            students.map((student) => (
              <Picker.Item
                key={student.id}
                label={`${student.nombre} ${student.apellido}`}
                value={student.id}
              />
            ))
          ) : (
            <Picker.Item label="No hay alumnos disponibles" value="" />
          )}
        </Picker>

        {selectedStudent !== '' && grades.length > 0 && (
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>Tabla de Notas</Text>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.boldText]}>Asignatura</Text>
              <Text style={[styles.tableCell, styles.boldText]}>Evaluación 1</Text>
              <Text style={[styles.tableCell, styles.boldText]}>Evaluación 2</Text>
              <Text style={[styles.tableCell, styles.boldText]}>Evaluación 3</Text>
              <Text style={[styles.tableCell, styles.boldText]}>Promedio</Text>
            </View>
            {grades.map((grade, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {subjects[grade.asignaturaId] || 'Asignatura desconocida'}
                </Text>
                {grade.evaluaciones.map((evaluation, evalIndex) => (
                  <Text key={evalIndex} style={styles.tableCell}>
                    {evaluation > 0 ? evaluation : ''}
                  </Text>
                ))}
                <Text style={styles.tableCell}>{calculateAverage(grade.evaluaciones)}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.boldText]}>Promedio General</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={[styles.tableCell, styles.boldText]}>{calculateOverallAverage()}</Text>
            </View>
          </View>
        )}
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
  tableContainer: {
    marginTop: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#003366',
    padding: 4,
    backgroundColor: '#FFF',
  },
  boldText: {
    fontWeight: 'bold',
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