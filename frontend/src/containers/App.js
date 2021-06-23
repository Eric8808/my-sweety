import '../App.css';
import Header from './mainPage/Header'
import SpeedDial from './mainPage/SpeedDial'
import Calender from './mainPage/Calender'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Panel from './mainPage/Panel'
import TodoList from '../containers/mainPage/TodoList'
import useTodoList from '../hooks/useTodoList'
import Pie from './mainPage/block/Pie'
import AllTodo from './mainPage/block/AllTodo'
import Sweety from './mainPage/block/sweety'
import TextField from '@material-ui/core/TextField'
import { useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import axios from './api';
import useCalender from '../hooks/useCalender'
import useDisplayStatus from '../hooks/useDisplayStatus'
import ScheduledList from './mainPage/ScheduledList';
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
    background:"linear-gradient(45deg, #ef9a9a 40%, #ffcdd2 100%)"
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
  console.log("todolist", todoList)
  console.log("schedule", schedule)
  console.log("scheduled list", scheduledList)
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
        setSchedule(schedule)
        setScheduledList(scheduledList)
        setDisplayStatus('success', 'User data initialization successfully!')
        setLockOpen(true)
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
      {/* <Zoom in={zoom}> */}
      {!start?<Sweety myAnimation="breakFreeze" start={true}/>:
      <>
      <Grid container>
        <Grid container item spacing={0} justify='space-evenly'>
          <Grid container item spacing={2} xs={3}justify='space-evenly'>
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
                  {/* <TodoList todoList={todoList} deleteItem={deleteItem}/> */}
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={12} >
                <Sweety myAnimation={myAnimation}/>
            </Grid>
          </Grid>

          <Grid container item spacing={2} xs={6} justify='space-evenly'>
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
                {/* <button onClick={()=>setMyAnimation('assasination')}>assasination</button>
                <button onClick={()=>setMyAnimation('break1990')}>break1990</button>
                <button onClick={()=>setMyAnimation('breakFreeze')}>breakFreeze</button>
                <button onClick={()=>setMyAnimation('flair')}>flair</button>
                <button onClick={()=>setMyAnimation('hip-hop')}>hip-hop</button>
                <button onClick={()=>setMyAnimation('sitting')}>sitting</button>
                <button onClick={()=>setMyAnimation('situpus')}>situpus</button>
                <button onClick={()=>setMyAnimation('zombie-down')}>zombie-down</button>
                <button onClick={()=>setMyAnimation('playDrum')}>playDrum</button>
                <button onClick={()=>setMyAnimation('silly_dance')}>silly_dance</button> */}
            </Grid>
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
                  <Calender scheduledList={scheduledList} schedule={schedule} day={day} setDay={setDay} setMyAnimation={setMyAnimation}/>
                </Card>
              </Zoom>
              
            </Grid>
          </Grid>

          <Grid container item spacing={2} xs={3} justify='space-evenly'>
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
            <Grid item xs={12} style={{position:'relative'}}>
              <Zoom in={zoom4}>
                <Card className={classes.block} style={{
                        height:'50vh',
                        padding:"10% 5% 20% 5%",
                        background:'url("note5.png")', 
                        backgroundPosition:"50% 50%", 
                        backgroundSize:"110% 110%", 
                        backgroundRepeat:"no-repeat",
                        boxShadow:"none"}}>
                  <ScheduledList scheduledList={scheduledList} setScheduledList={setScheduledList} setSchedule={setSchedule}/>
                </Card>
              </Zoom>
            </Grid>
          </Grid>
                
        </Grid>
      </Grid>
      <Snackbar open={showMsg} autoHideDuration={6000} onClose={()=>setShowMsg(false)}>
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
