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
        setSchedule(m.data.ans)
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
          totaltime += gettime(schedule[i].events[j])
        }
        getedittime[schedule[i].date] = -totaltime;
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
        console.log(schedule)
        concatschedule = [...schedule]
        for(let i=0;i<newschedule.length;i++){
          for(let j=0;j<concatschedule.length;j++){
            let temp2 = new Date(newschedule[i].date)
            let dd = new Date(concatschedule[j].date)
            // console.log(`date1:${temp2.getDate()} date2:${dd.getDate()}`)
            if(temp2.getDate()===dd.getDate() && 
            temp2.getMonth()===dd.getMonth() &&
            temp2.getFullYear()===dd.getFullYear()){
              concatschedule[j].events=concatschedule[j].events.concat(newschedule[i].events)
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
                      addItem={addItem}/>
      </Grid>
  )
}


export default Panel