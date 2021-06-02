import React from 'react';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '500px',
    // width: '100%',
    // backgroundColor: 'green',
    color: 'white',
    padding: theme.spacing(2)
  },
  root: {
      '& > *': {
        margin: 0,
      //   margin: theme.spacing(0),
        width: '100%',
      },
  },
  button: {
      textTransform: 'none',
      marginBottom: '20px'
  },
  list:{
      maxHeight: '35vh',
      overflow: 'auto',
  },
}));

const handleChange = (func) => (event) => {
  func(event.target.value);
};

function Add() {
  const classes = useStyles();
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1)

  const handleAdd = () => {
    if (task && priority) {
        // const item = {
        //     name: task,
        //     priority: priority
        // }
        // setList([...list, item])
        // setTask('')
        // setPriority(1)
    }
}
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={3} alignItems='flex-end'>
        <Grid item xs={12}>
          <TextField 
              id="standard-basic"
              label="Task" 
              value={task} 
              onChange={handleChange(setTask)}
              fullWidth/>
        </Grid>
        <Grid item xs={6}>
          <TextField
              id="date"
              label="Deadline"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
              shrink: true,
              }}
              fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
              id="outlined-number"
              inputProps={{style: { textAlign: 'center' }}} 
              label="NeedTime"
              type="number"
              InputLabelProps={{
                  shrink: true,
              }}
              fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
              id="filled-number"
              inputProps={{style: { textAlign: 'center' }}}
              label="Priority"
              value={priority}
              onChange={handleChange(setPriority)}
              type="number"
              InputLabelProps={{
                  shrink: true,
              }}
              variant="filled"
              fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" 
                  color="primary" 
                  className={classes.button}
                  onClick={handleAdd}
                  fullWidth>
              Add
          </Button>
        </Grid>
      </Grid>  
    </form>
  )
}


export default Add