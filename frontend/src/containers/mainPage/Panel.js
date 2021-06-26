import React from 'react';
import { useState} from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from '../../Components/AddDialog'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import axios from '../api'

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop:'1vh',
    height: '25vh'
  },
  Btn: {
    textTransform: 'none',
    fontSize: 20,
    margin: 20
  },
  Icon: {
    fontSize: 30,
    marginRight: 5
  },
}));


function Panel({addItem, todoList, setSchedule, day, setDisplayStatus, schedule, setScheduledList, clearTodoList,scheduledList}) {
  const classes = useStyles();
  const [showBtn, setShowBtn] = useState(true)
  const [showBlock, setShowBlock] = useState(false)

  const handleSchedule = async () => {

    let tempdate = new Date();
    let now_date = new Date(tempdate.getFullYear(),tempdate.getMonth(),tempdate.getDate());
    const gettime = (name) =>{
      for(let i=0;i<scheduledList.length;i++){
        if(name===scheduledList[i].name) return parseInt(scheduledList[i].needtime,10)/parseInt(scheduledList[i].separate,10)
      }
    }
    
    if(schedule.length===0){
      const m = await axios.post('/api/scheduling/calculate',{
        events : todoList.map((e)=>{return {name: e.name, needtime:parseInt(e.needtime,10), separate: parseInt(e.separate,10), deadline: new Date(e.deadline.getFullYear(),e.deadline.getMonth(),e.deadline.getDate()) , priority: parseInt(e.priority,10)}}), 
        available : day, //[5,2,3,4,6,7,3],
        nowdata : now_date,
        edittime : {}
      })
      // 小黑記得處理算不出來的例外
      if(!m.data.ans.error){
        let newschedule = [...m.data.ans]
        newschedule = newschedule.map((day)=>{
          day.events = day.events.map((event)=>(
            {name: event, completed: false}
          ))
          return day
        })
        setSchedule(newschedule)
        setScheduledList(todoList)
        clearTodoList()
      }else{
        setDisplayStatus('error',m.data.ans.error)
      }
    }else{
      let getedittime = {};
      for(let i=0;i<schedule.length;i++){
        let totaltime = 0;
        for(let j=0;j<schedule[i].events.length;j++){
          totaltime += gettime(schedule[i].events[j].name)
        }
        getedittime[new Date(schedule[i].date)] = -totaltime;
      }
      const m = await axios.post('/api/scheduling/calculate',{
        events : todoList.map((e)=>{return {name: e.name, needtime:parseInt(e.needtime,10), separate: parseInt(e.separate,10), deadline: new Date(e.deadline.getFullYear(),e.deadline.getMonth(),e.deadline.getDate()), priority: parseInt(e.priority,10)}}), 
        available : day, //[5,2,3,4,6,7,3],
        nowdata : now_date,
        edittime : getedittime
      })
      // 小黑記得處理算不出來的例外
      if(!m.data.ans.error){
        let concatschedule=[];
        let newschedule = [...m.data.ans]
        newschedule = newschedule.map((day)=>{
          day.events = day.events.map((event)=>(
            {name: event, completed: false}
          ))
          return day
        })
        console.log(schedule)
        concatschedule = [...schedule]

        let OldScheduleDate = new Date(concatschedule[concatschedule.length-1].date),NewScheduleDate = new Date(newschedule[newschedule.length-1].date);
        if(NewScheduleDate>OldScheduleDate){
          let addDate = new Date(OldScheduleDate);
          while(addDate<=NewScheduleDate){
            addDate.setDate(addDate.getDate()+1);
            let addDate2 = new Date(addDate);
            concatschedule.push({date:addDate2.toJSON(),events:[]})
            console.log(addDate2.getDate());
          }
        }

        for(let i=0;i<newschedule.length;i++){
          let isfind = false;
          for(let j=0;j<concatschedule.length;j++){
            let temp2 = new Date(newschedule[i].date)
            let dd = new Date(concatschedule[j].date)
            // console.log(`date1:${temp2.getDate()} date2:${dd.getDate()}`)
            if(temp2.getDate()===dd.getDate() && 
            temp2.getMonth()===dd.getMonth() &&
            temp2.getFullYear()===dd.getFullYear()){
              concatschedule[j].events=concatschedule[j].events.concat(newschedule[i].events)
              isfind=true;
              break;
            }
          }
        }
        console.log(concatschedule)
        setSchedule(concatschedule)
        setScheduledList(scheduledList.concat(todoList))
        clearTodoList()
      }else{
        setDisplayStatus('error',m.data.ans.error)
      }
    }
    
    
  }

  const handleAdd = () => {
    setShowBlock(true)
  }
  const handleBack = () => {
    setShowBlock(false)
  }
  return (
    
      <Grid container item xs={12} justify='center' alignItems='center' className={classes.grid}>
        {(showBtn) ? (
          <>
            <Fab color="primary" 
                variant="extended" 
                className={classes.Btn}
                onClick={handleAdd}>
                <AddIcon className={classes.Icon}/>
                Add
            </Fab>
            <Fab color="secondary" 
                variant="extended" 
                className={classes.Btn}
                onClick={handleSchedule}>
                <EventAvailableIcon className={classes.Icon}/>
                Schedule
            </Fab>
          </>  
          ) : ( <></>)}
          <AddDialog showBlock={showBlock}
                      handleBack={handleBack}
                      setShowBtn={setShowBtn}
                      addItem={addItem}
                      todoList={todoList}
                      scheduledList={scheduledList}
                      setDisplayStatus={setDisplayStatus}/>
      </Grid>
  )
}


export default Panel