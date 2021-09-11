import React from 'react';
import { useHistory } from 'react-router-dom';
import Paths from '../../../utils/Constants';
import SimpleCard  from '../../Ui/simpleCard';
import Grid from '@material-ui/core/Grid';
import {useStyles} from '../../Ui/styles'




const Home = () => {
    const history = useHistory();
    const classes = useStyles();
  return (
    <div >
        <div style={{textAlign:'center',margin:'50px', color:'#357a38'}} >
            <h1>Menú</h1>
        </div>
        <div style={{ padding: 20 }}>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <SimpleCard handleClick={() => history.push(Paths.USERS)}>
                        <h3>Usuarios</h3>
                    </SimpleCard>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <SimpleCard handleClick={() => history.push(Paths.INFORMES)}>
                        <h3>Informes</h3>
                    </SimpleCard>
                </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                <SimpleCard handleClick={() => history.push(Paths.EXTRAS)}>
                        <h3>Gestionar información</h3>
                    </SimpleCard>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <SimpleCard handleClick={() => history.push(Paths.IMPORT)}>
                        <h3>Importar Documentos</h3>
                    </SimpleCard>
                </Grid>
            </Grid>
        </div>
    </div>
  );
};

export default Home;
