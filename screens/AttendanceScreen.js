import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { firestore } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { UserContext } from '../services/UserContext';

const AttendanceScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [subjects, setSubjects] = useState({});
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      fetchStudents(userId);
      fetchSubjects();
    }
  }, [userId]);

  useEffect(() => {
    if (selectedStudent) {
      fetchAttendance(selectedStudent);
    }
  }, [selectedStudent, currentWeek]);

  const fetchStudents = async (apoderadoId) => {
    try {
      const studentsQuery = query(
        collection(firestore, 'Alumnos'),
        where('apoderadoId', '==', apoderadoId)
      );
      const querySnapshot = await getDocs(studentsQuery);
      const alumnos = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, nombre: data.nombre, apellido: data.apellido };
      });
      setStudents(alumnos);
    } catch (error) {
      console.error('[AttendanceScreen] Error al obtener los alumnos:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const subjectsQuery = collection(firestore, 'Asignaturas');
      const querySnapshot = await getDocs(subjectsQuery);
      const subjectsMap = {};
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        subjectsMap[doc.id] = data.nombre;
      });
      setSubjects(subjectsMap);
    } catch (error) {
      console.error('[AttendanceScreen] Error al obtener las asignaturas:', error);
    }
  };

  const fetchAttendance = async (studentId) => {
    try {
      const studentQuery = query(
        collection(firestore, 'Alumnos'),
        where('id', '==', studentId)
      );
      const querySnapshot = await getDocs(studentQuery);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setAttendance(data.asistencia || []);
      } else {
        setAttendance([]);
      }
    } catch (error) {
      console.error('[AttendanceScreen] Error al obtener la asistencia:', error);
    }
  };

  const getWeekDays = (weekOffset) => {
    const today = new Date();
    today.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);
    const days = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        name: `${['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'][i]} ${date.getDate()}`,
      });
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);

  const handleWeekChange = (direction) => {
    setCurrentWeek(currentWeek + direction);
  };

  const getAttendanceForDay = (date) => {
    const dayAttendance = attendance.find((entry) => entry.fecha === date);
    if (dayAttendance) {
      return {
        status: dayAttendance.asistencia ? 'Presente' : 'Ausente',
        color: dayAttendance.asistencia ? '#4CAF50' : '#F44336',
      };
    }
    return { status: 'Sin datos', color: '#9E9E9E' };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Asistencia</Text>
      <Picker
        selectedValue={selectedStudent}
        onValueChange={(itemValue) => setSelectedStudent(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un alumno" value="" />
        {students.map((student) => (
          <Picker.Item
            key={student.id}
            label={`${student.nombre} ${student.apellido}`}
            value={student.id}
          />
        ))}
      </Picker>

      {selectedStudent && (
        <>
          <TouchableOpacity onPress={() => handleWeekChange(-1)} style={styles.navButtonContainer}>
            <Text style={styles.navButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.weekText}>
            Semana del {weekDays[0].date} al {weekDays[4].date}
          </Text>
          <TouchableOpacity onPress={() => handleWeekChange(1)} style={styles.navButtonContainer}>
            <Text style={styles.navButton}>{'>'}</Text>
          </TouchableOpacity>
        </>
      )}

      {selectedStudent && (
        <>
          {weekDays.map(({ date, name }) => {
            const { status, color } = getAttendanceForDay(date);
            return (
              <Text
                key={date}
                style={[
                  styles.attendanceItem,
                  { backgroundColor: color },
                ]}
              >
                {name} - {status}
              </Text>
            );
          })}
        </>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Volver al Menú Principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  navButtonContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  navButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  weekText: {
    fontSize: 16,
    color: '#003366',
    marginVertical: 8,
    textAlign: 'center',
  },
  attendanceItem: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AttendanceScreen;
