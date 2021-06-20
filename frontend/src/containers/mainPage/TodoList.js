import React from 'react';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {yellow, orange, red } from '@material-ui/core/colors';
import Grow from '@material-ui/core/Grow'
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  list:{
    height: '50vh',
    overflow: 'auto',
    // backgroundColor: theme.palette.background.paper,
    background:"#c5cae9",
    '& .MuiListItem-container': {
      '& .MuiIconButton-root': {
        display: 'none' 
      },
      '&:hover': {
        '& .MuiIconButton-root': {
          display: 'block' 
        },
      }

    }
  },
  listSection: {
    backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
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


function TodoList({todoList, deleteItem}) {
  const classes = useStyles();

  const handleDelete = (i) => {
      deleteItem(i)
    }

  // React.useEffect(() => {
  //     setFadeTimeout(1500);
  //   }, []);

  return (
    <Grid item>
      <List className={classes.list} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>Your TODO List</ListSubheader>
            {todoList.map((value,i) => (
                <Slide direction='right' in timeout={200}>
                    <div>
                      {(i===0)? <></> : <Divider />}
                      <ListItem button className={classes.listItem}>
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
                </Slide>
            ))}
          </ul>
        </li>
      </List> 
    </Grid>
  );
}

export default TodoList;