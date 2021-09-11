import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    grid: {
        '& .MuiGrid-item':{
            display: 'flex',
            justifyContent: 'center',
        },
      '& .MuiCardContent-root': {
            cursor: 'pointer',
            color: '#357a38',
            border: '2px solid #357a38',
            marginBottom: 50,
            width: 300,
            borderRadius: 50
      }

    }
  }));