import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Button from '../../Ui/button';
import TextField from "@material-ui/core/TextField";
import DataTable from 'react-data-table-component';
import EditIcon from '@material-ui/icons/Edit';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { asesoriaActionRequest, asesoriaUpdateRequest, asesoriaActionGetAsesoria } from '../../../Store/asesoriaSlice';
import { activityActionGetAtivities } from '../../../Store/activitySlice';
import { linesActionGetLines } from '../../../Store/linesSlice';



let isUpdate = false
const validationSchema = yup.object({
    identificacion: yup
        .string("Ingresa tu nombre")
        .required("La identificaión es requerido"),
    fecha: yup
        .string("Ingresa tu nombre")
        .required("La fecha es requerido"),
    sede: yup
        .string("Ingresa tu nombre")
        .required("La sede es requerido"),
});

const Fasesorias = ({ getAsesorias, getLines, getActivities, asesorias, lines, activities, asesoriaRequest, updateRequest }) => {
    useEffect(() => {
        getAsesorias();
        getLines();
        getActivities();
    }, [lines, activities, asesorias])
    if (!Array.isArray(asesorias)) getAsesorias();

    const formik = useFormik({
        initialValues: {
            id: "",
            identificacion: "",
            fecha: "",
            linea: " ",
            actividad: " ",
            sede: " ",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (!isUpdate) {
                asesoriaRequest(values)
                resetForm({})
                document.getElementById('sede').value = ""

            }
            if (isUpdate) {
                updateRequest(values)
                resetForm({})
                document.getElementById('sede').value = ""

            }

        },

    });

    const rowChange = (row) => {
        isUpdate = true
        formik.setValues({
            id: row.id,
            identificacion: row.identificacion,
            fecha: row.fecha,
            linea: row.linea,
            actividad: row.actividad,
            sede: row.sede
        })

    }
    const cleanForm = () => {
        isUpdate = false;
        formik.setValues({
            id: "",
            identificacion: "",
            fecha: "",
            linea: "",
            actividad: "",
            sede: ""
        })
        document.getElementById('sede').append = ""

    }
    const headersUser = [
        {
            name: 'Identificación',
            selector: 'identificacion',
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: 'fecha',
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
            name: 'Sede',
            selector: 'sede',
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
                        <TextField
                            id="fecha"
                            name="fecha"
                            variant="outlined"
                            type={"date"}
                            value={formik.values.fecha}
                            onChange={formik.handleChange}
                            error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                            helperText={formik.touched.fecha && formik.errors.fecha}
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
                            <MenuItem value="Poblado">Medellín</MenuItem>
                            <MenuItem value="Bello">Bello</MenuItem>
                            <MenuItem value="Uraba">Urabá</MenuItem>
                            <MenuItem value="Oriente">Oriente</MenuItem>
                        </Select>
                    </Grid>
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

                </Grid>
            </form>

            <Grid container justify='center' >
                <Grid item lg={8} md={8} sm={8} xs={8}>
                    <DataTable
                        style={{ backgroundColor: "floralwhite" }}
                        title="Lista de asesorías"
                        columns={headersUser}
                        data={asesorias}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => ({
    asesorias: state.asesoriaReducer?.data,
    lines: state.linesReducer?.data,
    activities: state.activityReducer?.data,
    requestSuccess: state.asesoriaReducer ? state.asesoriaReducer.type : '',
    requestFail: state.asesoriaReducer,
});
const mapDispatchToPros = (dispatch) => ({
    getAsesorias: () => dispatch(asesoriaActionGetAsesoria()),
    getLines: () => dispatch(linesActionGetLines()),
    getActivities: () => dispatch(activityActionGetAtivities()),
    asesoriaRequest: (data) => dispatch(asesoriaActionRequest(data)),
    updateRequest: (data) => dispatch(asesoriaUpdateRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToPros)(Fasesorias);
