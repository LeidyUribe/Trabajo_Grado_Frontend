import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Paths from '../../../utils/Constants';
import FlineasAtencion from './lineasAtencion';
import Factividades from './actividades';
import Fexternas from './externas';
import Fasesorias from './asesoría';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsClass: {
    backgroundColor: '#357a38',
  },
  'MuiSelect-root':{
    width: 150
  }
}));

export default function Extras() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className={classes.tabsClass} value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Líneas de atención" {...a11yProps(0)} />
          <Tab label="Actividades" {...a11yProps(1)} />
          <Tab label="Externos" {...a11yProps(2)} />
          <Tab label="Asesorias" {...a11yProps(3)} />
          <Tab label="Menú" onClick={() => history.push(Paths.HOME)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FlineasAtencion />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Factividades />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Fexternas />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Fasesorias />
      </TabPanel>
    </div>
  );
}
