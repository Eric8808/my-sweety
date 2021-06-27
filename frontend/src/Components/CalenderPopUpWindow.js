import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {React, useState} from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import Button from '@material-ui/core/Button'
import ScheduledList from '../containers/mainPage/ScheduledList';

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
export default function CalendarPopUpWindow({drawerOpen, setDrawerOpen, content, setMyAnimation, setSchedule, setScheduledList, setCompleteDate, scheduledList, myAnimation}) {
  
  
    const handleClose = ({type}) => {
      setDrawerOpen(false)
      if(type==="Completed"){  
        setTimeout(()=>{
          setMyAnimation("RumbaDance")
        },1500)
        setMyAnimation("JoyfulJump2")
      }
      else if(type==="Remove"){
        setTimeout(()=>{
          setMyAnimation("RumbaDance")
        },5000)
        setMyAnimation("assasination")
      }
      else{
        setMyAnimation("RumbaDance")
      }
    };

    const handleCompleted = (date, eventName, completed) => {
      let periodTime = 0
      const i = scheduledList.findIndex((event)=>(event.name===eventName))
      periodTime = parseInt(scheduledList[i].needtime,10)/parseInt(scheduledList[i].separate, 10)
      setCompleteDate((completeDate)=>{
        if(completeDate[`${date.getMonth()+1}/${date.getDate()}`] === undefined){
          completeDate[`${date.getMonth()+1}/${date.getDate()}`] = 0
        }
        completeDate[`${date.getMonth()+1}/${date.getDate()}`] = completeDate[`${date.getMonth()+1}/${date.getDate()}`] + (completed?-1*periodTime:1*periodTime)
        return completeDate
      })

      let allCompleted = false // 檢查是否要從scheduledList和schedule刪掉該事件
      setScheduledList((scheduledList) => {
        const i = scheduledList.findIndex((event)=>(event.name===eventName))
        console.log('completed',scheduledList)
        // 如果事件原本是completed，按下後變 uncompleted，scheduledList的completed要減1
        if (completed) {
          scheduledList[i].completed -= 1
        }
        else {
          scheduledList[i].completed += 1
          console.log('completed',scheduledList[i].completed)
          if (scheduledList[i].completed === scheduledList[i].separate) {
            allCompleted = true;
          }
        }
        console.log('completed',scheduledList)
        if (allCompleted) {
          scheduledList = scheduledList.filter((event)=>(event.separate !== 0 && event.separate !== event.completed))
        }
        return [...scheduledList]
      })

      // 從schedule刪除事件
      if (allCompleted) {
        setSchedule((schedule)=> {
          schedule = schedule.map((day)=>{
            day.events = day.events.filter((event)=>event.name!==eventName)
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
      }
      // schedule的該事件標示為完成
      else {
        setSchedule((schedule)=>{
          const i = schedule.findIndex((day)=>{
            let temp = new Date(day.date)
            temp.setDate(temp.getDate()-1)
            
            return temp.toDateString() === date.toDateString()
          })
          const eventIndex = schedule[i].events.findIndex((event)=>(event.name===eventName))
          schedule[i].events[eventIndex].completed = !completed
          return [...schedule]
        })
      }
      
      handleClose({type:"Completed"})
    }
    const handleRemove = (date, eventName, completed) => {
      let allCompleted = false // 檢查是否要從scheduledList和schedule刪掉該事件
      setScheduledList((scheduledList)=>{
        const i = scheduledList.findIndex((event)=>(event.name===eventName))
        scheduledList[i].needtime -= parseInt(scheduledList[i].needtime, 10)/parseInt(scheduledList[i].separate, 10)
        scheduledList[i].separate = parseInt(scheduledList[i].separate, 10) - 1
        if(completed){
          scheduledList[i].completed -= 1
        }
        if (scheduledList[i].completed === scheduledList[i].separate || scheduledList[i].separate===0) {
          allCompleted = true;
        }
        if (allCompleted) {
          scheduledList = scheduledList.filter((event)=>(event.separate !== 0 && event.separate !== event.completed))
        }
        
        return [...scheduledList]
      })
      // schedule裡全部的該事件都要刪除
      if (allCompleted) {
        setSchedule((schedule)=> {
          schedule = schedule.map((day)=>{
            day.events = day.events.filter((event)=>event.name!==eventName)
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
      }
      // 只刪除schedule那一天的事件
      else {
        setSchedule((schedule)=>{
          const i = schedule.findIndex((day)=>{
            let temp = new Date(day.date)
            temp.setDate(temp.getDate()-1)
            
            return temp.toDateString() === date.toDateString()
          })
          schedule[i].events = schedule[i].events.filter((event)=>(event.name!==eventName))
          
          return [...schedule]
        })
      }
      
      handleClose({type:"Remove"})
    }
    
    const {id: event, value: hours, indexValue: day, data, completed } = content
    // const date=''
    // if (content.data) {
    //   const {data:{date}} = content
    // }
    return (
      <div>
        <Dialog
          open={drawerOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth='xs'
          fullWidth={true}
          PaperComponent={PaperComponent}
          PaperProps={{style:{
              backgroundImage: "url('dialog.png')",
              backgroundColor:"transparent",
              backgroundRepeat:"no-repeat",
              backgroundSize:"20vw 23vh",
              boxShadow: 'none',
              position: 'absolute',
              left:"15vw",
              height:"28vh",
              width:"20vw"

          }}}
        >
          <DialogTitle id="draggable-dialog-title" style={{ cursor: 'move' }}></DialogTitle>
          <DialogContent 
            style={{
                borderRadius:"30px",
                padding:"5vh 2vw 0vh 2vw",
                marginBottom:"1vh",
                }}>
            <DialogContentText id="alert-dialog-description" style={{color:"black", fontSize:"large"}}>
                {`Event: ${event}`}
                <br></br>
                {`Hours: ${hours}`}
                <br></br>
                {`Working Day: ${day}`}
            </DialogContentText>
            
          </DialogContent>
          {(event==='empty')? (<></>) : (
            <DialogActions style={{
                borderRadius:"30px",
                padding:"0px 0px 0px 0px",
                }}>
            <Button size="small" variant="contained"
                style={{
                borderRadius: 50,
                color:"white",
                background:"#4caf50",
                fontStyle:"italic",
                margin:"0px 0px 0px 10px",
                }}
                onClick={() => handleCompleted(data.date, event, completed)}>
              {(completed)? ('Uncompleted'): ('Completed')}
            </Button>
            <Button size="small" variant="contained" 
                style={{
                borderRadius: 50,
                color:"white",
                background:"#f44336",
                fontStyle:"italic",
                margin:"0px 0px 0px 10px",
                }}
                onClick={() => handleRemove(data.date, event, completed)}>
              Remove
            </Button>
        </DialogActions>
          )}
          
        </Dialog>
      </div>
    );
  }