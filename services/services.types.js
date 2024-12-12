// services.types.js

// Tipo genérico para respuestas de servicios
export const ServiceResponse = (success, data, error) => ({
	success,
	data,
	error,
  });
  
  // Tipos comunes
  export const RegisterApoderadoPayload = (id, nombre, apellido) => ({
	id,
	nombre,
	apellido,
  });
  
  export const AsistenciaPayload = (asignaturaId, alumnoId, fecha, asistencia) => ({
	asignaturaId,
	alumnoId,
	fecha,
	asistencia,
  });
  
  export const NotaPayload = (calificacion, alumnoId, asignaturaId, fecha) => ({
	calificacion,
	alumnoId,
	asignaturaId,
	fecha,
  });
  
  export const AlumnoResponse = (id, nombre, apellido) => ({
	id,
	nombre,
	apellido,
  });
  
  export const Foro = (id, title, description, profesorId, asignatura, fecha, comentarios) => ({
	id,
	title,
	description,
	profesorId,
	asignatura,
	fecha,
	comentarios,
  });
  
  export const ForoPayload = (title, description, profesorId, asignaturaId, fecha) => ({
	title,
	description,
	profesorId,
	asignaturaId,
	fecha,
  });
  
  export const ComentarioPayload = (userId, comentario, foroId, fecha) => ({
	userId,
	comentario,
	foroId,
	fecha,
  });
  
  export const NotaResponse = (calificacion, asignatura) => ({
	calificacion,
	asignatura,
  });
  
  export const AsistenciaResponse = (nombreAsignatura, fecha, asistencia) => ({
	nombreAsignatura,
	fecha,
	asistencia,
  });
  