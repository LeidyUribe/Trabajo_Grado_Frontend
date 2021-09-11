import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function IconAlert({type, children}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {type === 'success' &&
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {children}
            </Alert>
         }
         {type === 'error' &&
            <Alert icon={<ClearIcon fontSize="inherit" />} severity="error">
                {children}
            </Alert>
         }
         {type === 'info' &&
            <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
                {children}
            </Alert>
         }

    </div>
  );
}
