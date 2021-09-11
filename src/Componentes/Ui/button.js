import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    '&.MuiButton-containedPrimary': {
      backgroundColor: '#357a38'
    }
  },
}));

export default function IconButton({ id, size, type, disabled, handleclick, icon, color, children }) {
  const classes = useStyles();

  return (
    <div>
      <Button
        id={id}
        variant="contained"
        color={"primary" || color}
        className={classes.button}
        disabled={disabled}
        endIcon={icon}
        type={type}
        onClick={handleclick}
        size={size}
      >
        {children}
      </Button>

    </div>
  );
}
