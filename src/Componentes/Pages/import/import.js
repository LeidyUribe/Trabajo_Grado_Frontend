import React, { useRef, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Paths from '../../../utils/Constants';
import Button from '../../Ui/button';

import * as XLSX from 'xlsx';

import { imporEstudiantestActionRequest, imporDocentestActionRequest, imporPersonaltActionRequest, imporCarrerastActionRequest, importActionSuccess, importActionFail } from '../../../Store/importSlice';


function Upload(file) {
  const fileUpload = file;
  const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xlsm)$/;
  if (regex.test(fileUpload.name.toLowerCase())) {
    let fileName = fileUpload.name;
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      if (reader.readAsBinaryString) {
        reader.onload = (e) => {
          processExcel(reader.result);
        };
        reader.readAsBinaryString(fileUpload);
      }
    } else {
      console.log("This browser does not support HTML5.");
    }
  } else {
    console.log("Please upload a valid Excel file.");
  }
}
let carrers = [];
let documents = [];
let docentes = [];
let personal = [];

function processExcel(data) {
  const workbook = XLSX.read(data, { type: 'binary' });
  const firstSheet = workbook.SheetNames[1];
  const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
  carrers = excelRows.map(doc => doc["PROGRAMA ACADEMICO"])
  documents = excelRows.filter(carreer => (carreer["PROGRAMA ACADEMICO"] !== 'EMPLEADO' && carreer["PROGRAMA ACADEMICO"] !== 'DOCENTE'))
  docentes = excelRows.filter(carreer => (carreer["PROGRAMA ACADEMICO"] === 'DOCENTE')).map(doc => doc.DOCUMENTO)
  personal = excelRows.filter(carreer => (carreer["PROGRAMA ACADEMICO"] === ('EMPLEADO'))).map(doc => doc.DOCUMENTO)
}

const ImportDocument = ({ importERequest, importDRequest, importPRequest, importCRequest, requestSuccess, requestFail }) => {
  const history = useHistory();
  const ref = useRef();
  const [viewResult, setView] = useState(true);
  const [loading, setloading] = useState(false);

  const procesarDoc = () => {
    setloading(true)
    documents.map(doc => {
      importERequest({ idEstudiantes: doc.DOCUMENTO, carrera: doc["PROGRAMA ACADEMICO"] })
    })
    docentes.map(doc => {
      importDRequest({ idDocentes: doc, Nombre: 'DOCENTE' })
    })
    personal.map(doc => {
      importPRequest({ idPersonal: doc , Ocupacion: 'EMPLEADO'})
    })
    carrers.map((doc, index) => {
      importCRequest({ idCarrera: index, Nombre: doc  })
    })
  }

  if(requestSuccess){
    setloading(false)
  }

  const reset = () => {
    ref.current.value = "";
    setView(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <div style={{ textAlign: 'initial' }}><IconButton aria-label="delete" onClick={() => history.push(Paths.HOME)} >
          <HomeIcon />
        </IconButton></div>
        <h1 style={{ color: "#357a38" }}>Importar Archivo</h1>
      </div>

      <Grid container justify='center' >
        <Grid item lg={12} md={12} sm={12} xs={8}>
          <br />
          <input type="file" ref={ref} onChange={(e) => Upload(e.target.files[0])} />
          
          <br />
          <br />

          <div style={{ display: 'inline-flex' }}>
            <Button color="#357a38" size="medium" variant="contained" handleclick={() => procesarDoc()} >
              Procesar
          </Button>
            <Button color="#357a38" size="medium" variant="contained" handleclick={() => reset()} >
              RESET
          </Button>
          </div>

          <br />
          <br />

          <div style={{ width: '400px', height: '100px', border: '1px solid', marginLeft: '500px' }} >
         
            {/* {requestSuccess && viewResult && */}
              <p>
                Información importada exitosamente!!
            </p>
            {requestFail && viewResult && <div>
              <br/>
              Ha ocurrido un error al realizar la importación.<br />
            Por favor, vuelva a intentarlo.
            </div>}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  requestSuccess: state.importReducer?.message,
  requestFail: state.importReducer?.error
});
const mapDispatchToPros = (dispatch) => ({
  importERequest: (data) => dispatch(imporEstudiantestActionRequest(data)),
  importDRequest: (data) => dispatch(imporDocentestActionRequest(data)),
  importPRequest: (data) => dispatch(imporPersonaltActionRequest(data)),
  importCRequest: (data) => dispatch(imporCarrerastActionRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToPros)(ImportDocument);;
