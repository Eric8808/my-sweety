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
import Fab from '@material-ui/core/Fab';
import Collapse from '@material-ui/core/Collapse';

import { FcBarChart } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  list:{
    height: '41vh',
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
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding:"0px 0px 0px 0px"
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
  nested: {
    // paddingLeft: theme.spacing(4),
    paddingTop:theme.spacing(0)
  },
  doneButton:{
    backgroundColor:"green",
    fontSize:"xx-small",
    color:"white",
    pointerEvents: "none",
    margin:"5px 3px 0px 0px",
  },
  undoneButton:{
    // maxWidth:"300px",
    backgroundColor:"red",
    fontSize:"xx-small",
    color:"white",
    pointerEvents: "none",
    margin:"5px 3px 0px 0px",
  },
  itemButton:{
    textTransform: "none",
    margin:"0px 3px 0px 0px",
  },
  

  }));


function ScheduledList({scheduledList, setScheduledList, setSchedule}) {
  const classes = useStyles();

  const handleDelete = (i) => {
    setSchedule((schedule)=>{
      schedule = schedule.map((day)=>{
        console.log(scheduledList[i].name)
        day.events = day.events.filter((event)=>event.name!==scheduledList[i].name)
        return day
      })

      for(let i = schedule.length-1;i>=0;i--){
        if(schedule[i].events.length === 0){
          schedule.pop()
        }
        else{
          break
        }
      }
      return schedule
    })
    setScheduledList(scheduledList.filter((_,index) => index!==i))
      // deleteItem(i)
    }
  const [open, setOpen] = useState(Array(scheduledList.length).fill(false));
  const [colorList, setColorList] = useState([])
  const handleClick = (i) => {
    setOpen((state)=>{
      state[i] = !state[i]
      return [...state]
    })
  };
  const makeColor=(specifier)=>{
    var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
    while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    return colors;
  }

  useEffect(() => {
    setOpen(Array(scheduledList.length).fill(false))
    console.log("scheduled list changed!!!", scheduledList)
  }, [scheduledList]);

  useEffect(()=>{
    const specifiers = "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"
    const colorList = makeColor(specifiers)
    setColorList(colorList)
  },[])
  return (
    <Grid item style={{backgroundColor:'inherit'}}>
      <List className={classes.list} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>
              Scheduled List
              {/* <Button className={classes.itemButton} size="small" variant="contained" style={{pointerEvents: "none",fontSize:"large",borderRadius: 0,color:"white",backgroundColor: "#e57373",fontStyle:"italic",marginBottom:"10px"}}>Scheduled List</Button> */}
            </ListSubheader>
            {scheduledList.map((value,i) => (
                <Slide direction='right' in timeout={200}>
                    <div>
                      {(i===0)? <></> : <Divider />}
                      <ListItem button className={classes.listItem} onClick={()=>{handleClick(i)}}>
                          <ListItemText 
                              primary={
                                <>
                                <FcBarChart style={{marginRight:"10px"}}/>
                                <Button 
                                  className={classes.itemButton}
                                  size="small"
                                  variant="contained" 
                                  style={{
                                    borderRadius: 50,
                                    pointerEvents: "none",
                                    color:"black",
                                    backgroundColor: colorList[(i+1)%(colorList.length)],
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
                                  {([...Array(parseInt(value.completed))]).map((key)=>(
                                    <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '25px', minHeight: '10px'}} className={classes.doneButton}></Button>
                                  ))}
                                  {([...Array(parseInt(value.separate-value.completed))]).map((key)=>(
                                    <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '25px', minHeight: '10px'}} className={classes.undoneButton}></Button>
                                  ))}
                                  <br></br>
                                  {Object.keys(value).map((key)=>{
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

export default ScheduledList;