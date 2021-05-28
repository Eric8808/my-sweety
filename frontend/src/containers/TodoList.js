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
import { makeStyles } from '@material-ui/core/styles';
import {yellow, orange, red } from '@material-ui/core/colors';

import axios from '../api'
import Yuri from '../myimages/yuri.jpg'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        "& .MuiAvatar-root": {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
        }
    },
    prior2: {
        "& .MuiAvatar-root": {
            color: theme.palette.getContrastText(orange[500]),
            backgroundColor: orange[500],
        }
    },
    prior3: {
        "& .MuiAvatar-root": {
            color: theme.palette.getContrastText(yellow[500]),
            backgroundColor: yellow[500],
        }
    },
  }));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
        key: value,
        }),
    );
}

const handleChange = (func) => (event) => {
    func(event.target.value);
};

function TodoList() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [isLogin, setLogin] = useState(false)
    const [accMsg, setAccMsg] = useState()
    const [showMsg, setShowMsg] = useState(false)


    const classes = useStyles();
    const [list, setList] = useState([]);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState(1)

    const handleRegister= async ()=>{
        const {
            data: {message, success},
          } = await axios.post('/api/register',{
            user: user,
            pwd, pwd
        })
        setLogin(success)
        setShowMsg(true)
        setAccMsg(message)
    }
    const handleLogin= async ()=>{
        console.log('Hello')
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
                {list.map((value) => (
                    <ListItem className={classes[`prior${value.priority}`]}>
                        <ListItemAvatar>
                            <Avatar>
                                {value.priority}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={value.name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                </ListItem>
                ))}
            </List>
                    
            {/* Register form */}
            <Snackbar open={showMsg} autoHideDuration={3000} onClose={()=>setShowMsg(false)}>
                {
                    isLogin?
                        (<Alert severity="success">
                            {accMsg}
                        </Alert>
                        )
                        :
                        (<Alert severity="error">
                            {accMsg}
                        </Alert>
                        )
                }
            </Snackbar>
            {isLogin?
                (<Avatar alt="Yuri" src={Yuri}/>)
                :
                null
            }
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={2} alignItems='flex-end'>
                    <Grid item xs={12}>
                        <TextField 
                            id="standard-basic" 
                            label="Username" 
                            value={user} 
                            onChange={handleChange(setUser)}
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="standard-password-input" 
                            label="Password" 
                            type="password"
                            value={pwd} 
                            onChange={handleChange(setPwd)}
                            fullWidth/>
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant="contained" 
                                color='Primary'
                                className={classes.button}
                                onClick={handleLogin}
                                fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" 
                                color='secondary'
                                className={classes.button}
                                onClick={handleRegister}
                                fullWidth>
                            Register
                        </Button>
                    </Grid>
                </Grid>  
            </form>
        </Grid>
    );
}

export default TodoList;