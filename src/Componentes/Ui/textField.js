import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// import TextField from '@material-ui/core/TextField';
import {Field} from 'formik'

const useStyles = makeStyles(() => ({
  input: {
    boxSizing: 'border-box',
    borderRadius: 4,
    border: '1px solid black',
    padding: '10px 15px',
    marginBottom: 35,
    fontSize: 14,
  },
  label: {
    paddingLeft:'42%',
    lineHheight: 2,
    display: 'block',
    marginTop: -45,
    color: 'black',
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Open Sans , sans-serif',
  },
  MuiFormControl:{
    display: 'block'
  }
}));

export default function TextField({id,label,type,value,required,msg,onChange}) {
  const classes = useStyles();

  return (
    <FormControl variant='standard' className={classes.MuiFormControl}>
      <InputLabel className={classes.label} htmlFor={id}>
        {label}
      </InputLabel>
      <Field id={id}
      className={classes.input}
       label={label}
       variant="outlined"
       type={type}
       value={value}
       required={required}
       helperText={msg}
       error={msg}
       onChange={onChange}
       />
    </FormControl>
  );
}
