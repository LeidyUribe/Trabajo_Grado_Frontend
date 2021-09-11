import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import { replace, useFormik } from "formik";
import Grid from "@material-ui/core/Grid";
import Button from '../../Ui/button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import DataTable from 'react-data-table-component';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import * as XLSX from 'xlsx';
import _ from 'lodash';

import Paths from '../../../utils/Constants';
import { Typography } from "@material-ui/core";

import { activityActionGetAtivities } from '../../../Store/activitySlice';
import { linesActionGetLines } from '../../../Store/linesSlice';
import { getActionCarrers } from '../../../Store/importSlice';
import { informeActionRequest } from '../../../Store/informeSlice'

const validationSchema = yup.object({
  carrera: yup
    .string("Ingresa tu nombre")
    .required("La carrera es requerida"),
});


const Informes = ({ getCarrers, getLines, getActivities, carrees, lines, activities, informeRequest, informe }) => {
  useEffect(() => {
    getCarrers();
    getLines();
    getActivities();
  }, [])
  const history = useHistory();
  const [sedeVar, setSede] = useState("1")
  const [carreraVar, setCarrera] = useState("1")

  const formik = useFormik({
    initialValues: {
      id: "",
      linea: " ",
      actividad: " ",
      sede: " ",
      carrera: " ",
      desde: "",
      hasta: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setSede(values.sede);
      setCarrera(values.carrera);
      informeRequest(values);
      resetForm({});
    },
  });

  const exportFile = () => {
    const wb = XLSX.utils.book_new();

    wb.Props = {
      Title: "Informe",
      Author: "Bienestar institucional",
      CreatedDate: new Date()
    };
  
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    let lines = informe?.data.filter(data => (data.linea !== "" && data.linea !== " "))
    let activities = informe?.data.filter(data => (data.actividad !== "" && data.actividad !== " "))

    lines = lines.sort(function (a, b) {
      let nameA = a.linea?.toUpperCase()
      let nameB = b.linea?.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    })

    let array = lines.map(dt => {
      return JSON.parse(JSON.stringify(dt).replace("identificacion", dt.linea.toUpperCase()))
    })

    array = array.map(dt => {
      return JSON.parse(JSON.stringify(dt).replace(dt.Nombre, _.startCase(dt.Nombre.toLowerCase())))
    })

    array.map(m_a => {
      delete m_a["sede"] 
      delete m_a["Nombre"]
      delete m_a["linea"]
      delete m_a["actividad"]
    })

    activities = activities.sort(function (a, b) {
      let nameA = a.actividad?.toUpperCase()
      let nameB = b.actividad?.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    })

    let arrayAc = activities.map(dt => {
      return JSON.parse(JSON.stringify(dt).replace("identificacion", dt.actividad.toUpperCase()))
    })

    arrayAc = arrayAc.map(dt => {
      return JSON.parse(JSON.stringify(dt).replace(dt.Nombre, _.startCase(dt.Nombre.toLowerCase())))
    })

    arrayAc.map(m_a => {
      delete m_a["sede"]
      delete m_a["Nombre"]
      delete m_a["linea"]
      delete m_a["actividad"]
    })
    
    let arrayProps = [{"SEDE": sedeVar === "1" || sedeVar === " " ? "Todas" : sedeVar, "PROGRAMA ACADEMICO": carreraVar === "1" ? "Todos" : carreraVar, " ":" " }]
  
    const data = arrayProps.concat(array).concat(arrayAc)

    const ws = XLSX.utils.json_to_sheet(data,{origin:{r:0, c:0}});
    XLSX.utils.book_append_sheet(wb, ws , "CONSOLIDADO");
    XLSX.writeFile(wb, "Informe.xlsx")
  }

  if (informe?.data.length > 0) {
    exportFile()
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <div style={{ textAlign: 'initial' }}><IconButton aria-label="delete" onClick={() => history.push(Paths.HOME)} >
          <HomeIcon />
        </IconButton></div>
        <h1 style={{ color: "#357a38" }}>Informes</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <InputLabel id="typelabel">Carreras</InputLabel>
            <Select
              required
              variant="outlined"
              labelId="typelabel"
              id="carrera"
              name="carrera"
              value={formik.values.carrera}
              onChange={formik.handleChange}
              label="Carreras"
              style={{ width: '195px' }}

            >
              <MenuItem value=" ">Selecione</MenuItem>
              <MenuItem value="1">TODAS</MenuItem>
              {carrees?.map(car =>
                <MenuItem value={car.Nombre}>{car.Nombre}</MenuItem>
              )}
            </Select>
          </Grid>
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
            <InputLabel id="typelabel">Sede</InputLabel>
            <Select
              required
              variant="outlined"
              labelId="typelabel"
              id="sede"
              name="sede"
              value={formik.values.sede}
              onChange={formik.handleChange}
              label="Sede"
              style={{ width: '195px' }}
              error={formik.touched.sede && Boolean(formik.errors.sede)}
              helperText={formik.touched.sede && formik.errors.sede}
            >
              <MenuItem value=" ">Selecione</MenuItem>
              <MenuItem value="1">TODAS</MenuItem>
              <MenuItem value="Poblado">Medellín</MenuItem>
              <MenuItem value="Bello">Bello</MenuItem>
              <MenuItem value="Uraba">Urabá</MenuItem>
              <MenuItem value="Oriente">Oriente</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <InputLabel id="typelabel">Graficas</InputLabel>
            <Select
              variant="outlined"
              labelId="typelabel"
              id="grafica"
              name="grafica"
              value={formik.values.grafica}
              onChange={formik.handleChange}
              label="Grafica"
              style={{ width: '195px' }}
              error={formik.touched.grafica && Boolean(formik.errors.grafica)}
              helperText={formik.touched.grafica && formik.errors.grafica}
            >
              <MenuItem value="Barras">Barras</MenuItem>
              <MenuItem value="Torta">Torta</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <Typography>Fecha desde</Typography>
            <TextField
              id="desde"
              name="desde"
              variant="outlined"
              type={"date"}
              value={formik.values.desde}
              onChange={formik.handleChange}
              error={formik.touched.desde && Boolean(formik.errors.desde)}
              helperText={formik.touched.desde && formik.errors.desde}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <Typography>Fecha hasta</Typography>
            <TextField
              id="hasta"
              name="hasta"
              variant="outlined"
              type={"date"}
              value={formik.values.hasta}
              onChange={formik.handleChange}
              error={formik.touched.hasta && Boolean(formik.errors.hasta)}
              helperText={formik.touched.hasta && formik.errors.hasta}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={6} xs={6} justify="center">
            <Button color="#357a38" size="medium" variant="contained" type="submit">
              Generar
            </Button>
          </Grid>

        </Grid>
      </form>
      <Grid container justify='center' >
        <Grid item lg={8} md={8} sm={8} xs={8}>
          {/* <DataTable
            style={{ backgroundColor: "floralwhite" }}
            title="Resultados"
            selectableRows
            columns={headersAtention}
            data={[]}
          /> */}
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  lines: state.linesReducer?.data,
  activities: state.activityReducer?.data,
  carrees: state.importReducer?.data,
  informe: state.informeReducer?.data
});
const mapDispatchToPros = (dispatch) => ({
  getLines: () => dispatch(linesActionGetLines()),
  getActivities: () => dispatch(activityActionGetAtivities()),
  getCarrers: () => dispatch(getActionCarrers()),
  informeRequest: (data) => dispatch(informeActionRequest(data))
});

export default connect(mapStateToProps, mapDispatchToPros)(Informes);
