import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AttendanceScreen = ({ navigation }) => {
  // Estado de la asistencia (Presente, Ausente, Tarde)
  const [attendance, setAttendance] = useState({
    '2024-09-02': 'Presente',
    '2024-09-03': 'Tarde',
    '2024-09-04': 'Ausente',
    '2024-09-05': 'Presente',
    '2024-09-06': 'Presente',
    '2024-09-09': 'Tarde',
    '2024-09-10': 'Ausente',
    // Más días pueden ser agregados aquí...
  });

  // Función para generar días de lunes a viernes
  const getWeekdays = (month, year) => {
    const days = [];
    const date = new Date(year, month - 1, 1);

    while (date.getMonth() === month - 1) {
      const dayOfWeek = date.getDay(); // 0 = domingo, 6 = sábado
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        days.push(formattedDate);
      }
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const weekdays = getWeekdays(9, 2024); // Ejemplo para septiembre 2024

  // Función para obtener el color basado en el estado de asistencia
  const getAttendanceColor = (status) => {
    switch (status) {
      case 'Presente':
        return '#4CAF50'; // Verde
      case 'Ausente':
        return '#F44336'; // Rojo
      case 'Tarde':
        return '#CDDC39'; // Amarillo verdoso
      default:
        return '#9E9E9E'; // Gris si no hay datos
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Asistencia de Juanito Pérez</Text>
        <Text style={styles.subtitle}>Curso: Cuarto Medio B</Text>
      </View>

      <View style={styles.attendanceList}>
        {weekdays.map((day) => (
          <View
            key={day}
            style={[
              styles.attendanceItem,
              { borderColor: getAttendanceColor(attendance[day]) }, // Color dinámico en el borde
            ]}
          >
            <Text style={styles.dateText}>{day}</Text>
            <Text
              style={[
                styles.statusText,
                { color: getAttendanceColor(attendance[day]) }, // Color dinámico en el texto
              ]}
            >
              {attendance[day] || 'Sin datos'}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
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
  header: {
    paddingVertical: 16,
    backgroundColor: '#003366',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  attendanceList: {
    marginVertical: 16,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2, // Aumentamos el borde para que el color sea más visible
  },
  dateText: {
    fontSize: 16,
    color: '#003366',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
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
