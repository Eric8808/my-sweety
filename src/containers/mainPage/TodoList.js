import React from 'react';
import { useState, useEffect } from 'react';
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
import { Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { FcFile } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  list:{
    height: '35vh',
    overflow: 'auto',
    // backgroundColor: theme.palette.background.paper,
    background:"inherit",
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
    backgroundColor:"inherit",
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
  listItem:{
    paddingBottom:theme.spacing(0),
    paddingTop:theme.spacing(0)
  },
  itemButton:{
    textTransform: "none",
    margin:"0px 3px 0px 0px",
  },
  nested: {
    // paddingLeft: theme.spacing(4),
    paddingTop:theme.spacing(0)
  },
  }));


function TodoList({todoList, deleteItem}) {
  const classes = useStyles();
  const [open, setOpen] = useState(Array(todoList.length).fill(false));
  const handleDelete = (i) => {
    deleteItem(i)
  }
  const handleClick = (i) => {
    setOpen((state)=>{
      state[i] = !state[i]
      return [...state]
    })
  };

  useEffect(() => {
    setOpen(Array(todoList.length).fill(false))
    console.log("todo list changed!!!", todoList)
  }, [todoList]);
  console.log(todoList)
  return (
    <Grid item style={{backgroundColor:'inherit'}}>
      <List className={classes.list} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>Your TODO List</ListSubheader>
            {todoList.map((value,i) => (
                <Slide direction='right' in timeout={200}>
                    <div>
                      {(i===0)? <></> : <Divider />}
                      <ListItem button className={classes.listItem} onClick={()=>{handleClick(i)}}>
                        <ListItemText 
                          primary={
                            <>
                            <FcFile style={{marginRight:"10px"}}/>
                            <Button 
                              className={classes.itemButton}
                              size="small"
                              variant="contained" 
                              style={{
                                borderRadius: 50,
                                pointerEvents: "none",
                                color:"black",
                                backgroundColor: '#e0e0e0',
                                fontStyle:"italic"
                              }}
                            >
                              {value.name}
                            </Button>
                            </>
                          }
                          >
                          </ListItemText>
                          {open[i] ? <ExpandLess /> : <ExpandMore />}
                          <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(i)}>
                                  <DeleteIcon />
                              </IconButton>
                          </ListItemSecondaryAction>
                      </ListItem>
                      <Collapse in={open[i]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem button className={classes.nested}>
                            <ListItemText 
                                primary={
                                  <>
                                  {Object.keys(value).map((key)=>{
                                    console.log(key,value[key])
                                    if(key==="_id"){
                                      return
                                    }
                                    return (
                                      <>
                                      <Typography 
                                        size="small"
                                        variant="contained" 
                                        style={{
                                          borderRadius: 0,
                                          height:"20px",
                                          color:"black",
                                          fontStyle:"italic"
                                        }}
                                      >
                                        {key}: {value[key].toString()}
                                        {/* 123 */}
                                      </Typography>
                                      <br></br>
                                      </>
                                    )
                                  })}
                                  </> 
                                }
                            />
                          </ListItem>
                        </List>
                      </Collapse>
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