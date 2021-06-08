import React from 'react';
import { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
      '& > *': {
        margin: 0,
      //   margin: theme.spacing(0),
        width: '100%',
        height: '100%'
      },
  },
  button: {
      textTransform: 'none',
      // marginBottom: '20px'
  },
}));

const handleChange = (func) => (event) => {
  func(event.target.value);
};

function AddDialog({showBlock, handleBack, setShowBtn, addItem}) {
  const classes = useStyles();
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1)
  const [needTime, setNeedTime] = useState(1)
  const [deadline, setDeadline] = useState('')
  const taskRef = useRef(null)

  const handleAddItem = () => {
    if (task && priority) {
        addItem(task, priority)
        setTask('')
        setPriority(1)
        taskRef.current.focus()
        console.log('click')
    }
  }

  return (
  <Slide
    in={showBlock}
    timeout={300}
    style={{
      // transitionDelay: `${!showBtn ? 500 : 0}ms`,
    }}
    onEnter={() => {setShowBtn(false)}}
    onEntered={() => {taskRef.current.focus()}}
    onExited={() => {setShowBtn(true)}}
    mountOnEnter
    unmountOnExit
  >
    <Card style={{height: '100%'}}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={2} alignItems='flex-end' justify='space-between'>
          <Grid item xs={6}>
            <TextField 
                id="standard-basic"
                label="Task" 
                value={task} 
                onChange={handleChange(setTask)}
                fullWidth
                inputRef={taskRef}
                />
          </Grid>
          
          <Grid item xs={3}>
            <TextField
                id="outlined-number"
                inputProps={{style: { textAlign: 'center' }}} 
                label="NeedTime"
                value={needTime}
                onChange={handleChange(setNeedTime)}
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
            <Grid item xs={6}>
              <TextField
                  id="date"
                  label="Deadline"
                  type="date"
                  value={deadline}
                  onChange={handleChange(setDeadline)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
              />
          </Grid>
          <Grid container item xs={12} spacing={2} justify='flex-end'>
            <Grid item xs={2}>
              <Button color="primary" 
                      className={classes.button}
                      onClick={handleBack}
                      fullWidth>
                  Back
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" 
                      color="primary" 
                      className={classes.button}
                      onClick={handleAddItem}
                      fullWidth>
                  Add
              </Button>
            </Grid>
          </Grid>
        </Grid>  
      </form>
    </Card>
  </Slide>)
}

export default AddDialog;