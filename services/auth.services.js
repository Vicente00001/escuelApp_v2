// auth.service.js
import axiosInstance from './AxiosInstance';

export const registerApoderado = async (payload) => {
  try {
    const response = await axiosInstance.post('/apoderados/createApoderado', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/users/createUser', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarEstudiantes = async () => {
  try {
    const response = await axiosInstance.get('/alumnos');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarApoderados = async () => {
  try {
    const response = await axiosInstance.get('/apoderados');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarCursos = async () => {
  try {
    const response = await axiosInstance.get('/cursos');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerAlumno = async (payload) => {
  try {
    const response = await axiosInstance.post('/alumnos/createAlumno', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};

export const updateAlumno = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(`/alumnos/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarAlumno = async (payload) => {
  try {
    const response = await axiosInstance.delete(`/alumnos/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerAsignatura = async (payload) => {
  try {
    const response = await axiosInstance.post('/asignatura/createAsignatura', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarAsignatura = async () => {
  try {
    const response = await axiosInstance.get('/asignatura');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarAsignatura = async (payload) => {
  try {
    const response = await axiosInstance.delete(`/asignatura/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const updateAsignatura = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(`/asignatura/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en updateAlumno:', error);
    return { success: false, error: String(error) };
  }
};

export const mostrarProfesores = async () => {
  try {
    const response = await axiosInstance.get('/profesores');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarApoderado = async (payload) => {
  try {
    const response = await axiosInstance.delete(`/apoderados/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const updateApoderado = async (payload) => {
  try {
    const response = await axiosInstance.patch(`/apoderados/update`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerProfesores = async (payload) => {
  try {
    const response = await axiosInstance.post('/profesores/createProfesor', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarProfesor = async (payload) => {
  try {
    const response = await axiosInstance.delete(`/profesores/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarAdmins = async () => {
  try {
    const response = await axiosInstance.get('/admins');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getAsignaturasdeUnProfesor = async (id) => {
  try {
    const response = await axiosInstance.get(`/profesores/${id}/asignaturas`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getAlumnosCurso = async (id) => {
  try {
    const response = await axiosInstance.get(`/asignatura/${id}/alumnos`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const enviarAsistencia = async (payload) => {
  try {
    await axiosInstance.post('/asistencia/bulk', payload);
    return { success: true, data: "Asistencia enviada" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const enviarNotas = async (payload) => {
  try {
    await axiosInstance.post('/notas/bulk', payload);
    return { success: true, data: "Notas enviadas" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getForosdeUnProfesor = async (id) => {
  try {
    const response = await axiosInstance.get(`/foro/${id}/forosProfesor`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const createForo = async (payload) => {
  try {
    await axiosInstance.post('/foro/createForo', payload);
    return { success: true, data: "Foro creado" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const comentarForo = async (payload) => {
  try {
    await axiosInstance.post(`foro-comentario`, payload);
    return { success: true, data: "Comentario creado" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarForo = async (idForo) => {
  try {
    await axiosInstance.delete(`foro/${idForo}`);
    return { success: true, data: "Comentario creado" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const obtenerNotas = async (idAlumno) => {
  try {
    const response = await axiosInstance.get(`notas/${idAlumno}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getAlumnosdeUnApoderado = async (idApoderado) => {
  try {
    const response = await axiosInstance.get(`apoderados/alumnos/${idApoderado}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const obtenerAsistencia = async (idAlumno) => {
  try {
    const response = await axiosInstance.get(`alumnos/asistencia/${idAlumno}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getForosdeUnAlumno = async (idAlumno) => {
  try {
    const response = await axiosInstance.get(`foro/alumno/${idAlumno}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};
