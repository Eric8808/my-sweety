import React from 'react';
import { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
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
  grid: {
    height: '25vh'
  },
  addBtn: {
    textTransform: 'none',
    fontSize: 20,
  },
  addIcon: {
    fontSize: 30
  },
  button: {
      textTransform: 'none',
      // marginBottom: '20px'
  },
  list:{
      maxHeight: '35vh',
      overflow: 'auto',
  },
}));

const handleChange = (func) => (event) => {
  func(event.target.value);
};

function Add({addItem}) {
  const classes = useStyles();
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1)
  const [needTime, setNeedTime] = useState(1)
  const [deadline, setDeadline] = useState('')
  const [showBtn, setShowBtn] = useState(true)
  const [showblock, setShowBlock] = useState(false)
  const taskRef = useRef(null)

  const handleAddItem = () => {
    if (task && priority) {
        // const item = {
        //     name: task,
        //     priority: priority
        // }
        // setList([...list, item])
        addItem(task, priority)
        setTask('')
        setPriority(1)
        taskRef.current.focus()
        console.log('click')
    }
  }
  const handleAdd = () => {
    setShowBlock(true)
  }
  const handleBack = () => {
    setShowBlock(false)
  }
  return (
    
      <Grid container xs={12} justify='center' alignItems='center' className={classes.grid}>
        {(showBtn) ? (
            <Fab color="primary" 
                variant="extended" 
                className={classes.addBtn}
                onClick={handleAdd}>
                <AddIcon className={classes.addIcon}/>
                Add
            </Fab>
          ) : ( <></>)}
          <Slide
            in={showblock}
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
        </Slide>
        {/* )} */}
      </Grid>
  )
}


export default Add