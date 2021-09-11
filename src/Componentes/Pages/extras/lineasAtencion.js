import React, { useEffect } from "react";
import { useFormik } from "formik";
import { connect } from 'react-redux';
import * as yup from "yup";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import Button from '../../Ui/button';
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DataTable from 'react-data-table-component';

import { linesActionGetLines, linesActionRequest, linesUpdateRequest, linesDeleteRequest } from '../../../Store/linesSlice';

let isUpdate = false
const validationSchema = yup.object({
  name: yup
    .string("Ingresa tu nombre")
    .required("El nombre es requerido"),
});

const FlineasAtencion = ({ getLines, lines, lineRequest, updateRequest, deleteRequest }) => {
  useEffect(() => {
    getLines()
  }, [getLines])
  if (!Array.isArray(lines)) getLines();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!isUpdate) {
        lineRequest(values)
        resetForm({})
        document.getElementById('description').value = ""

      } else {
        updateRequest(values)
        resetForm({})
        document.getElementById('description').value = ""

      }
    },
  });
  const rowChange = (row) => {
    isUpdate = true
    formik.setValues({
      id: row.idActividad,
      name: row.Nombre,
    })
    document.getElementById('description').value = row.Descripcion
  }
  const cleanForm = () => {
    isUpdate = false;
    formik.setValues({
      id: "",
      name: "",
    })
    document.getElementById('description').value = ""

  }

  const headersActivity = [
    {
      name: 'Nombre',
      selector: 'Nombre',
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: 'Descripcion',
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) =>
        <>
          <Button size="small" variant="contained" type="button" handleclick={() => rowChange(row)}>
            <EditIcon />
          </Button>
          <Button size="small" variant="contained" type="button" handleclick={() => deleteRequest(row)}>
            <DeleteIcon />
          </Button>
        </>
    },
  ]
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item lg={4} md={4} sm={4} xs={4} justify="space-between">
            <TextField
              id="name"
              name="name"
              label="Nombre"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4} justify="space-between">
            <TextareaAutosize
              id="description"
              name="description"
              rowsMin={5}
              cols={30}
              aria-label="maximum height"
              placeholder="Descripción"
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}

            />
          </Grid>
          <Grid item lg={8} md={8} sm={8} xs={8} justify="center" style={{ marginLeft: '215px' }}>
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
      <br />
      <Grid container >
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <DataTable
            style={{ backgroundColor: "floralwhite" }}
            title="Lista de lineas"
            columns={headersActivity}
            data={lines}
          />
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  lines: state.linesReducer?.data,
  requestSuccess: state.linesReducer ? state.linesReducer.type : '',
  requestFail: state.linesReducer,
});
const mapDispatchToPros = (dispatch) => ({
  getLines: () => dispatch(linesActionGetLines()),
  lineRequest: (data) => dispatch(linesActionRequest(data)),
  updateRequest: (data) => dispatch(linesUpdateRequest(data)),
  deleteRequest: (data) => dispatch(linesDeleteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToPros)(FlineasAtencion);;
