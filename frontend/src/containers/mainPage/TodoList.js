import React from 'react';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {yellow, orange, red } from '@material-ui/core/colors';
import Grow from '@material-ui/core/Grow'


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
    prior1: {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
    },
    prior2: {
            color: theme.palette.getContrastText(orange[500]),
            backgroundColor: orange[500],
    },
    prior3: {
            color: theme.palette.getContrastText(yellow[500]),
            backgroundColor: yellow[500],
    },
  }));



const handleChange = (func) => (event) => {
    func(event.target.value);
};

function TodoList() {
    const classes = useStyles();
    const [list, setList] = useState([]);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState(1)

    const handleDelete = (i) => {
        setList(list.filter((_,index) => index!==i))
    }

    const handleAdd = () => {
        if (task && priority) {
            const item = {
                name: task,
                priority: priority
            }
            setList([...list, item])
            setTask('')
            setPriority(1)
        }
    }

    React.useEffect(() => {
        setFadeTimeout(1500);
      }, []);

    return (
        <Grid item xs={3}>
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

            
            <List className={classes.list}>
                {list.map((value,i) => (
                    <Grow in timeout={500}>
                        <div>
                        {(i===0)? <></> : <Divider />}
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes[`prior${value.priority}`]}>
                                    {value.priority}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={value.name}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(i)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        </div>
                    </Grow>
                ))}
            </List> 
        </Grid>
    );
}

export default TodoList;