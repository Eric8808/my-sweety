import '../App.css';
import Header from './mainPage/Header'
import Calender from './mainPage/Calender'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Panel from './mainPage/Panel'
import TodoList from '../containers/mainPage/TodoList'
import useTodoList from '../hooks/useTodoList'
import Sweety from '../Components/sweety'
import TextField from '@material-ui/core/TextField'
import { useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import axios from './api';
import useCalender from '../hooks/useCalender'
import useDisplayStatus from '../hooks/useDisplayStatus'
import ScheduledList from './mainPage/ScheduledList';
import SignOutPanel from '../Components/SignOutPanel';
import Evaluation from './mainPage/EvalutationMode/Evaluation';
import ModePanel from '../Components/ModePanel';

import Button from '@material-ui/core/Button'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    height: '100vh',
    overflow:"auto",
    // background:"#e3f2fd"
    background:"linear-gradient(45deg, #64b5f6 40%, #bbdefb 100%)"
    // background:"#424242"
  },
  calenderContainer: {
    // border: '1px solid black',
    height: '62vh',
    // maxHeight: '50vh',
    // overflow: 'auto',
  },
  calenderContainer1: {
    // border: '1px solid black',
    height: '35vh',
    // marginLeft: '5px',
    // maxHeight: '50vh',
    // overflow: 'auto',
  },
  block:{
    // background:"linear-gradient(45deg, #ba68c8 30%, #e1bee7 90%)"
    // background:"#c5cae9",
    background:'white',
    // boxShadow:"none",
    borderColor:"black",
    // borderRadius:50,
    margin:"5px",
  }

}));

function App(props) {
  
  const classes = useStyles();
  const {todoList, addItem, deleteItem, setTodoList, clearTodoList} = useTodoList()
  const [scheduledList, setScheduledList] = useState([])
  const {day, setDay} = useCalender()
  const [myAnimation, setMyAnimation] = useState('sitting')
  const {msg, showMsg, messageState, setDisplayStatus, setShowMsg} = useDisplayStatus();
  // status: success, error, info, warning
  const [schedule,setSchedule] = useState([])
  const [lockOpen, setLockOpen] = useState(false)
  const [start, setStart] = useState(false)
  const [zoom1, setZoom1] = useState(false)
  const [zoom2, setZoom2] = useState(false)
  const [zoom3, setZoom3] = useState(false)
  const [zoom4, setZoom4] = useState(false)
  const [openEvaluation, setOpenEvaluation] = useState(false)
  // console.log("todolist", todoList)
  // console.log("schedule", schedule)
  // console.log("scheduled list", scheduledList)
  useEffect(async()=>{
    const openTime = 1000 //4000
    setTimeout(()=>setStart(true),0)
    setInterval(()=>setZoom1((zoom1)=>!zoom1),openTime+4000)
    setTimeout(()=>setZoom2(true),openTime+200)
    setTimeout(()=>setZoom3(true),openTime+400)
    setTimeout(()=>setZoom4(true),openTime+200)

   
    
    // schedule, todolist initialization (if signed in.)
    if(props.username!=null){
      console.log('start fetch from backend!')
      try{
        const {
          data:{todoList, schedule, day, scheduledList}
        } = await axios.get('/api/data/init',{
            params:{username: props.username}
        })
        console.log('user data init successfully!')
        // transform deadline of todoList to new Date()
        todoList.map(event=>{event.deadline = new Date(event.deadline); return event})
        schedule.map(event=>{event.date = new Date(event.date); return event})

        setDay.forEach((setter, i)=>{setter(day[i])})
        setTodoList(todoList)
        setScheduledList(scheduledList)
        setSchedule(schedule)
        setDisplayStatus('success', 'User data initialization successfully!')
        setLockOpen(true)

        const shiftschedule = ()=>{
          let newTodoList = [...todoList]
    
          const getAttr = (name,attr)=>{
            for(let i=0;i<scheduledList.length;i++){
              if(scheduledList[i]===name){
                if(attr==="needtime") return scheduledList[i].needtime/scheduledList[i].separate;
                else if(attr==="deadline") return scheduledList[i].deadline;
                else if(attr==="priority") return scheduledList[i].priority;
              }
            }
          }
          let finalindex = 0;
          for(let i=0;i<schedule.length;i++){
            let tempdate = new Date(schedule[i].date)
            let nowdate = new Date();
            if(tempdate>=nowdate) break;
            finalindex++;
            for(let j=0;j<schedule[i].events.length;j++){
              if(!schedule[i].events[j].completed){
                let newTaskName = `${schedule[i].events[j].name}-undo`
                let isInTodoList = false;
                for(let k=0;k<newTodoList.length;k++){
                  if(newTodoList[k].name===newTaskName) {
                    isInTodoList=true;
                    newTodoList[k].needtime=(newTodoList[k].needtime/newTodoList[k].separate)*(newTodoList[k].separate+1);
                    newTodoList[k].separate++;
                    break;
                  }
                }
                console.log(newTaskName)
                if(!isInTodoList){
                  addItem(newTaskName,getAttr(schedule[i].events[j].name,"priority"),1,getAttr(schedule[i].events[j].name,"needtime"),getAttr(schedule[i].events[j].name,"deadline"))
                  //task, priority,separate,needtime,deadline
                  //newTodoList.push({name:newTaskName, needtime: getAttr(schedule[i].events[j].name,"needtime"),separate:1,deadline:getAttr(schedule[i].events[j].name,"deadline"),priority:getAttr(schedule[i].events[j].name,"priority")})
                }
              }
            }
          }
          let newSchedule=[...schedule];
            for(let i=0;i<finalindex;i++){
              newSchedule.shift();
            }
            console.log(finalindex,newSchedule)
            setSchedule(newSchedule)
        }
        
        //shiftschedule();
        
        console.log(schedule)

      } catch(e){
        console.log('initial fetch error QQ', e)
        setDisplayStatus('error', 'Server is not on.')
      }
    }
  },[])
  

  useEffect(async()=>{
    // send data to backend if todoList, day or schedule changes.
    if(!lockOpen){
      // to avoid sending init data to update DB before fetching the account data.
      return
    }
    try{
      if(props.username!=null){
        console.log('start update to backend!')
        const {data:{message}} = await axios.post('/api/data/update',{
          username: props.username,
          todoList: todoList,
          schedule: schedule,
          scheduledList: scheduledList,
          day: day
        })
        console.log('user data sent to backend successfully!')
      }
      
    }catch(e){
      console.log('send to backend error QQ', e)
      setDisplayStatus('error', 'Server is not on.')
    }
  },[schedule, todoList, scheduledList, day])


  return (
    <div className={classes.root}>
      {!start?<Sweety myAnimation="breakFreeze" start={true}/>:
      <>
      <Grid container>
        <Grid container item spacing={0} justify='space-evenly'>

          {/* =================================left most grid container===================================== */}
          <Grid container item spacing={2} xs={3}justify='space-evenly'>
            {/* -------------------dialog image------------------------- */}
            <Grid item xs={12} style={{position:'relative'}}>
              <Zoom in={zoom1} timeout={300}>
                <Card className={classes.block} 
                      style={{
                          backgroundImage: "url('dialog3.png')",
                          backgroundColor:"transparent",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"24vw 33vh",
                          boxShadow: 'none',
                          position: 'absolute',
                          height:"35vh",
                          width:"25vw"

                      }}>
                </Card>
              </Zoom>
            </Grid>
            {/* -------------------sweety model------------------------- */}
            <Grid item xs={12} style={{position:"relative"}}>
                <Sweety myAnimation={myAnimation}/>
                <ModePanel openEvaluation={openEvaluation} setOpenEvaluation={setOpenEvaluation}/>
                {/* assasination, break1990, breakFreeze, flair, hip-hop, sitting, situpus, zombie-down, playDrum, silly_dance */}
            </Grid>

            {/* ------------------------bottom panel------------------------- */}
            <Grid container item xs={12} style={{paddingBottom:"13px"}} alignItems="center" justify="center">
                <SignOutPanel username={props.username} setMyAnimation={setMyAnimation}/>
            </Grid>
          </Grid>

          {openEvaluation?
          <Evaluation scheduledList={scheduledList} schedule={schedule} day={day} username={props.username}/>:
          <>
          {/* =================================middle grid container===================================== */}
          <Grid container item spacing={2} xs={6} justify='space-evenly'>
            {/* --------------------------panel----------------------------- */}
            <Grid item xs={12} >
                <Panel 
                  addItem={addItem} 
                  todoList={todoList} 
                  setSchedule={setSchedule}
                  day={day} 
                  setDisplayStatus={setDisplayStatus} 
                  schedule={schedule}
                  clearTodoList={clearTodoList}
                  setScheduledList={setScheduledList}
                  scheduledList={scheduledList}/>
            </Grid>

            {/* ----------------------calendar-------------------------- */}
            <Grid item xs={12} style={{position:'relative',padding:'0px',}}>
              <Card className={classes.block} 
                    style={{
                        backgroundImage: "url('thumbstack.png')",
                        backgroundColor:"transparent",
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"24vw 33vh",
                        boxShadow: 'none',
                        position: 'absolute',
                        height:"35vh",
                        width:"25vw",
                        top:'50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        visibility:zoom2? 'hidden' : 'visible'
                    }}>
                </Card>
              <Zoom in={zoom2}>
                <Card className={classes.block} style={{height:'70vh', background:'transparent', boxShadow:"none",}}>
                  <Calender scheduledList={scheduledList} setScheduledList={setScheduledList} schedule={schedule} setSchedule={setSchedule} day={day} setDay={setDay} setMyAnimation={setMyAnimation} setDisplayStatus={setDisplayStatus} />
                </Card>
              </Zoom>
              
            </Grid>
          </Grid>

          {/* ====================================================rightmost grid container============================================ */}
          <Grid container item spacing={2} xs={3} justify='space-evenly'>

            {/* ---------------------------TodoList------------------------------- */}
            <Grid item xs={12} style={{paddingBottom:"0px"}}>
              <Zoom in={zoom3}>
                <Card className={classes.block} 
                      style={{
                        padding:"10% 10% 0% 20%",
                        height:'45vh', 
                        background:'url("note4.png")', 
                        backgroundPosition:"50% 50%", 
                        backgroundSize:"100% 100%", 
                        backgroundRepeat:"no-repeat",
                        boxShadow:"none"
                      }}>
                <TodoList todoList={todoList} deleteItem={deleteItem}/>
                </Card>
              </Zoom>
            </Grid>

            {/* ---------------------------Scheduled List----------------------------- */}
            <Grid item xs={12} style={{position:'relative'}}>
              <Zoom in={zoom4}>
                <Card className={classes.block} style={{
                        height:'50vh',
                        padding:"10% 5% 0% 5%",
                        background:'url("note7.png")', 
                        backgroundPosition:"50% 0%", 
                        backgroundSize:"150% 110%", 
                        backgroundRepeat:"no-repeat",
                        boxShadow:"none"}}>
                  <ScheduledList scheduledList={scheduledList} setScheduledList={setScheduledList} setSchedule={setSchedule}/>
                </Card>
              </Zoom>
            </Grid>
          </Grid>
          </>
          }
        </Grid>
      </Grid>

      <Snackbar open={showMsg} autoHideDuration={3000} onClose={(e, reason)=>{
          if(reason=="clickaway")
          {return}
          ;setShowMsg(false);}}>
          <Alert onClose={()=>setShowMsg(false)} severity={messageState}>
              {/* successState: error, warning, info, success */}
              {msg}
          </Alert>
      </Snackbar>
      </>
      }      
    </div>
  );
}

export default App;
