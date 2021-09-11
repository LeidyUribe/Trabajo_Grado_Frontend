/* eslint-disable global-require */
import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Ui/button';
import TextField from "@material-ui/core/TextField";
import Paths from '../../utils/Constants';
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';
import Alert from '@material-ui/lab/Alert';


// import './stylesForms.css';
import { loginActionRequest } from '../../Store/loginSlice';

const validationSchema = yup.object({
  username: yup
    .string("Ingresa el nombre de usuario")
    .required("El nombre de usuario es requerido"),
  password: yup
    .string("Ingresa tu contraseña")
    .required("La contraseña es requerida"),
});

const Flogin = ({ authRequest, requestSuccess, requestFail }) => {
  let error = false
  const history = useHistory();
  const path = require('../../assets/poli.png');

  if (Array.isArray(requestSuccess) && requestSuccess.length > 0) {
    history.push(Paths.HOME);
  } else if(Array.isArray(requestSuccess) && requestSuccess.length === 0) {
    error = true

  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      authRequest(values)
      resetForm({})
    },

  });

  return (
    <>

      { error && 
        <Alert severity="error">El usuario no existe. Pongase en contacto con el administrador</Alert>
      }
      <div data-testid="loginForm">
        <img src={path} alt="logo" width='200' height="200" style={{ marginBottom: '40px' }} />
        <form onSubmit={formik.handleSubmit}>

          <TextField
            id="username"
            name="username"
            label="Nombre de usuario"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <br />
          <br />
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
          <Button
            id="submit"
            size="medium"
            type="submit"
            icon={<ArrowIcon />}
          >
            Iniciar Sesion
              </Button>
        </form>
        <div id="forgot">
          <a href="/">Olvido su contraseña?</a>
        </div>
      </div>
    </>
  );
};

Flogin.propTypes = {
  authRequest: PropTypes.func,
  requestSuccess: PropTypes.string,
  requestFail: PropTypes.string,
};

const mapStateToProps = (state) => ({
  requestSuccess: state.loginReducer?.data,
  requestFail: state.loginReducer?.error,
});
const mapDispatchToPros = (dispatch) => ({
  authRequest: (data) => dispatch(loginActionRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToPros)(Flogin);
