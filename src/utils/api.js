import axios from 'axios';
import { BASE_URL } from './Constants';

export default {
  auth: (payload) => axios
    .post(`${BASE_URL}api/usuario/getUser`, {
      user: payload.username,
      password: payload.password
    })
    .then((result) => result.data),

  users: () => axios
    .get(`${BASE_URL}api/usuario/getAll`, {
    })
    .then((result) => result.data),

  createUser: (payload) => axios
    .post(`${BASE_URL}api/usuario/`, {
      nombre: payload.name,
      usuario: payload.user,
      correo: payload.email,
      estado: payload.status,
      clave: payload.password
    })
    .then((result) => result.data),

  updateUser: (payload) => axios
    .put(`${BASE_URL}api/usuario/${payload.id}`, {
      nombre: payload.name,
      usuario: payload.user,
      correo: payload.email,
      estado: payload.status,
      clave: payload.password,
    })
    .then((result) => result.data),

  activities: () => axios
    .get(`${BASE_URL}api/activity/getAll`, {
    })
    .then((result) => result.data),

  createActivity: (payload) => axios
    .post(`${BASE_URL}api/activity/`, {
      nombre: payload.name,
      description: payload.description,

    })
    .then((result) => result.data),

  updateActivity: (payload) => axios
    .put(`${BASE_URL}api/activity/${payload.id}`, {
      nombre: payload.name,
      description: payload.description,

    })
    .then((result) => result.data),

  deleteActivity: (payload) => axios
    .delete(`${BASE_URL}api/activity/${payload.idActividad}`)
    .then((result) => result.data),


  peopleEx: () => axios
    .get(`${BASE_URL}api/people/getAll`, {
    })
    .then((result) => result.data),

  createPeople: (payload) => axios
    .post(`${BASE_URL}api/people/`, {
      identificacion: payload.identificacion,
      linea: payload.linea,
      actividad: payload.actividad,
      tipo: payload.type,

    })
    .then((result) => result.data),

  updatePeople: (payload) => axios
    .put(`${BASE_URL}api/people/${payload.id}`, {
      identificacion: payload.identificacion,
      linea: payload.linea,
      actividad: payload.actividad,
      tipo: payload.type,
    })
    .then((result) => result.data),

  asesorias: () => axios
    .get(`${BASE_URL}api/asesoria/getAll`, {
    })
    .then((result) => result.data),

  createAsesoria: (payload) => axios
    .post(`${BASE_URL}api/asesoria/`, {
      identificacion: payload.identificacion,
      fecha: payload.fecha,
      linea: payload.linea,
      actividad: payload.actividad,
      sede: payload.sede
    })
    .then((result) => result.data),

  updateAsesoria: (payload) => axios
    .put(`${BASE_URL}api/asesoria/${payload.id}`, {
      identificacion: payload.identificacion,
      fecha: payload.fecha,
      linea: payload.linea,
      actividad: payload.actividad,
      sede: payload.sede

    })
    .then((result) => result.data),

  lines: () => axios
    .get(`${BASE_URL}api/line/getAll`, {
    })
    .then((result) => result.data),

  createLine: (payload) => axios
    .post(`${BASE_URL}api/line/`, {
      nombre: payload.name,
      description: payload.description,

    })
    .then((result) => result.data),

  updateLine: (payload) => axios
    .put(`${BASE_URL}api/line/${payload.id}`, {
      nombre: payload.name,
      description: payload.description,

    })
    .then((result) => result.data),

  deleteLine: (payload) => axios
    .delete(`${BASE_URL}api/line/${payload.idLinea_Atencion}`)
    .then((result) => result.data),

  createEstudent: (payload) => axios
    .post(`${BASE_URL}api/import/insertEstudents`, {
      idEstudiantes: payload.idEstudiantes,
      carrera: payload.carrera
    })
    .then((result) => result.data),

  createDocente: (payload) => axios
    .post(`${BASE_URL}api/import/insertDocents`, {
      idDocentes: payload.idDocentes,
      Nombre: payload.Nombre
    })
    .then((result) => result.data),

  createPersonal: (payload) => axios
    .post(`${BASE_URL}api/import/insertPersonal`, {
      idPersonal: payload.idPersonal,
      Ocupacion: payload.Ocupacion
    })
    .then((result) => result.data),

  createCarrera: (payload) => axios
    .post(`${BASE_URL}api/import/insertCarres`, {
      idCarrera: payload.idCarrera,
      Nombre: payload.Nombre
    })
    .then((result) => result.data),

  createInforme: (payload) => axios
    .post(`${BASE_URL}api/inform/`, {
      linea: payload.linea,
      actividad: payload.actividad,
      sede: payload.sede,
      carrera: payload.carrera,
      desde: payload.desde,
      hasta: payload.hasta
    })
    .then((result) => result.data),

  carrers: () => axios
    .get(`${BASE_URL}api/import/getAll`, {
    })
    .then((result) => result.data),
};
