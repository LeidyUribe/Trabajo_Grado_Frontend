import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Button from '../Ui/button';
import TextField from "@material-ui/core/TextField";
import DataTable from 'react-data-table-component';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';



import Paths from '../../utils/Constants';

import { userActionGetUsers, userActionRequest, userUpdateRequest } from '../../Store/userSlice';

let isUpdate = false
const validationSchema = yup.object({
  name: yup
    .string("Ingresa tu nombre")
    .required("El nombre es requerido"),
  user: yup
    .string("Ingresa tu usuario")
    .required("El nombre de usuario es requerido"),
  email: yup
    .string("Enter your email")
    .email("Ingresa una dirección de correo valida")
    .required("El correo eléctronico es requerida"),
  password: yup
    .string("Enter your password")
    .min(6, "La contraseña debe ser minimo de 6 caracteres")
    .required("La contraseña es requerida"),
  confirmPassword: yup
    .string("Confirm your password")
    .min(6, "La contraseña debe ser minimo de 6 caracteres")
});

const Fusers = ({ getUsers, users, userRequest, updateRequest, requestSuccess }) => {
  useEffect(() => {
    getUsers()
  }, [getUsers])
  if (!Array.isArray(users)) getUsers();

  const [validPass, setValidPass] = React.useState(false)

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      id: "",
      user: "",
      name: "",
      email: "",
      status: "Activo",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {

      if ((values.password !== values.confirmPassword) && !isUpdate) {
        setValidPass(true)
      } else {
        setValidPass(false)
      }

      if (validPass && !isUpdate) {
        userRequest(values)
        resetForm({})
      }
      if (isUpdate) {
        updateRequest(values)
        resetForm({})
      }

    },

  });

  const showPassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const rowChange = (row) => {
    isUpdate = true
    formik.setValues({
      id: row.idUser,
      user: row.Usuario,
      name: row.Nombre,
      email: row.Correo,
      status: row.Estado,
      password: row.Clave
    })
  }
  const cleanForm = () => {
    isUpdate = false;
    formik.setValues({
      user: "",
      name: "",
      email: "",
      status: "",
      password: "",
      confirmPassword: "",

    })
  }
  const headersUser = [
    {
      name: 'Nombre',
      selector: 'Nombre',
      sortable: true,
    },
    {
      name: 'Correo electronico',
      selector: 'Correo',
      sortable: true,
    },
    {
      name: 'Usuario',
      selector: 'Usuario',
      sortable: true,
    },
    {
      name: 'Estado',
      selector: 'Estado',
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) =>
        <Button color="#357a38" size="small" variant="contained" type="button" handleclick={() => rowChange(row)}>
          <EditIcon/>
    </Button>
    },
  ]

  return (

    <div>
      <div>
        <div style={{ textAlign: 'initial' }}><IconButton aria-label="delete" onClick={() => history.push(Paths.HOME)} >
          <HomeIcon />
        </IconButton></div>
        <h1 style={{ color: "#357a38" }}>Usuarios</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
        {requestSuccess &&
            <Grid item lg={6} md={6} sm={6} xs={6} style={{ marginLeft: '20%' }}>
              <Alert severity="success">Usuario registrado exitosamente</Alert>
            </Grid>

          }
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
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
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <TextField
              id="user"
              name="user"
              label="Nombre de usuario"
              variant="outlined"
              value={formik.values.user}
              onChange={formik.handleChange}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <TextField
              id="email"
              name="email"
              label="Correo eléctronico"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <FormLabel component="legend">Estado</FormLabel>
            <RadioGroup style={{ display: 'inline' }} name="status" value={formik.values.status} onChange={formik.handleChange}>
              <FormControlLabel value="Activo" control={<Radio color={'default'} />} label="Activo" />
              <FormControlLabel value="Inactivo" control={<Radio color={'default'} />} label="Inactivo" />
            </RadioGroup>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <TextField
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <br />

            {isUpdate && <FormControlLabel style={{marginRight: '70px'}} control={<Checkbox color={'default'} onChange={() => showPassword()} />} label="Ver contraseña" />}

          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between" />
          <Grid item lg={6} md={6} sm={6} xs={6} justify="space-between">
            <div style={{ display: 'inline-flex' }}>
              <Button color="#357a38" size="medium" variant="contained" type="submit">
                Guardar
            </Button>
              <Button color="#357a38" size="medium" variant="contained" type="button" handleclick={() => cleanForm()}>
                Reset
            </Button>
            </div>

          </Grid>
          {validPass &&
            <Grid item lg={6} md={6} sm={6} xs={6} style={{ marginLeft: '20%' }}>
              <Alert severity="error">La contraseña y su confirmación no coindicen</Alert>
            </Grid>
          }
        </Grid>
      </form>

      <Grid container justify='center' >
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <DataTable
            style={{ backgroundColor: "floralwhite" }}
            title="Lista de usuarios"
            columns={headersUser}
            data={users}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.UserReducer?.data,
  requestSuccess: state.UserReducer?.data.message,
  requestFail: state.UserReducer,
});
const mapDispatchToPros = (dispatch) => ({
  getUsers: () => dispatch(userActionGetUsers()),
  userRequest: (data) => dispatch(userActionRequest(data)),
  updateRequest: (data) => dispatch(userUpdateRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToPros)(Fusers);
