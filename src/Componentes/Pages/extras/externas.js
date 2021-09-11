import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Button from '../../Ui/button';
import TextField from "@material-ui/core/TextField";
import DataTable from 'react-data-table-component';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { peopleActionGetPeople, peopleActionRequest, peopleUpdateRequest } from '../../../Store/externalSlice';
import { activityActionGetAtivities } from '../../../Store/activitySlice';
import { linesActionGetLines } from '../../../Store/linesSlice';

let isUpdate = false
const validationSchema = yup.object({
  identificacion: yup
    .string("Ingresa tu número de identificación")
    .required("El número de identificación es requerido"),
  type: yup
    .string("Confirm your password")
    .required("El tipo de Persona es requerido")
});

const Fexternas = ({ getPeople, people, peopleRequest, updateRequest, getLines, getActivities, lines, activities, }) => {
  useEffect(() => {
    getPeople();
    getLines();
    getActivities();
  }, [])
  if (!Array.isArray(people)) getPeople();

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      id: "",
      identificacion: "",
      linea: " ",
      actividad: " ",
      type: " ",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!isUpdate) {
        peopleRequest(values)
        resetForm({})
        document.getElementById('type').value = ""
      }
      if (isUpdate) {
        updateRequest(values)
        resetForm({})
        document.getElementById('type').value = ""

      }
    },

  });

  const rowChange = (row) => {
    isUpdate = true
    formik.setValues({
      id: row.idPersona_Externa,
      identificacion: row.identificacion,
      linea: row.linea,
      actividad: row.actividad,
      type: row.TipoPersona
    })

  }
  const cleanForm = () => {
    isUpdate = false;
    formik.setValues({
      id: "",
      identificacion: "",
      linea: "",
      actividad: "",
    })
    document.getElementById('type').append = ""

  }
  const headersUser = [
    {
      name: 'Identificación',
      selector: 'identificacion',
      sortable: true,
    },
    {
      name: 'Linea de atención',
      selector: 'linea',
      sortable: true,
    },
    {
      name: 'Actividad',
      selector: 'actividad',
      sortable: true,
    },
    {
      name: 'Tipo de Persona',
      selector: 'TipoPersona',
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) =>
        <Button color="#357a38" size="small" variant="contained" type="button" handleclick={() => rowChange(row)}>
          <EditIcon />
        </Button>
    },
  ]

  return (

    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <TextField
              id="identificacion"
              name="identificacion"
              label="Identificación"
              variant="outlined"
              value={formik.values.identificacion}
              onChange={formik.handleChange}
              error={formik.touched.identificacion && Boolean(formik.errors.identificacion)}
              helperText={formik.touched.identificacion && formik.errors.identificacion}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <InputLabel id="typelabel">Linea de atención</InputLabel>
            <Select
              variant="outlined"
              labelId="typelabel"
              id="linea"
              name="linea"
              value={formik.values.linea}
              onChange={formik.handleChange}
              label="Linea de atención"
              style={{ width: '195px' }}

            >
              <MenuItem value=" ">Selecione</MenuItem>
              {lines?.map(line =>
                <MenuItem value={line.Nombre}>{line.Nombre}</MenuItem>
              )}
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <InputLabel id="typelabel">Actividad</InputLabel>
            <Select
              variant="outlined"
              labelId="typelabel"
              id="actividad"
              name="actividad"
              value={formik.values.actividad}
              onChange={formik.handleChange}
              label="Actividad"
              style={{ width: '195px' }}

            >
              <MenuItem value=" ">Selecione</MenuItem>
              {activities?.map(activity =>
                <MenuItem value={activity.Nombre}>{activity.Nombre}</MenuItem>
              )}
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <InputLabel id="typelabel">Tipo de persona</InputLabel>
            <Select
              variant="outlined"
              labelId="typelabel"
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              label="Tipo de persona"
              style={{ width: '195px' }}
            >
              <MenuItem value=" ">Selecione</MenuItem>
              <MenuItem value="Entidad publica">Entidad Pública</MenuItem>
              <MenuItem value="Padre de familia">Padre de familia</MenuItem>
              <MenuItem value="Estudiante externo">Estudiante externo</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </Grid>


          <Grid item lg={8} md={8} sm={8} xs={8} justify="center" style={{ marginLeft: '300px' }}>
            <div style={{ display: 'inline-flex' }}>
              <Button color="#357a38" size="medium" variant="contained" type="submit">
                Guardar
            </Button>
              <Button color="#357a38" size="medium" variant="contained" type="button" handleclick={() => cleanForm()}>
                Reset
            </Button>
            </div>

          </Grid>
        </Grid>
      </form>

      <Grid container>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <DataTable
            style={{ backgroundColor: "floralwhite" }}
            title="Lista de personas externas"
            columns={headersUser}
            data={people}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  people: state.peopleReducer?.data,
  requestSuccess: state.peopleReducer ? state.peopleReducer.type : '',
  requestFail: state.peopleReducer,
  lines: state.linesReducer?.data,
  activities: state.activityReducer?.data,
});
const mapDispatchToPros = (dispatch) => ({
  getPeople: () => dispatch(peopleActionGetPeople()),
  peopleRequest: (data) => dispatch(peopleActionRequest(data)),
  updateRequest: (data) => dispatch(peopleUpdateRequest(data)),
  getLines: () => dispatch(linesActionGetLines()),
  getActivities: () => dispatch(activityActionGetAtivities()),
});

export default connect(mapStateToProps, mapDispatchToPros)(Fexternas);
