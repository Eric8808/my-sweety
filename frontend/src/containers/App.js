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
    background:"linear-gradient(45deg, #3f51b5 10%, #7986cb 90%)"
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
    background:"#c5cae9",
    borderColor:"black"
  }

}));

function App(props) {
  const classes = useStyles();
  const {todoList, addItem, deleteItem, setTodoList} = useTodoList()
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
  
  useEffect(async()=>{
    setTimeout(()=>setStart(true),4000)
    setTimeout(()=>setZoom1(true),4000)
    setTimeout(()=>setZoom2(true),4200)
    setTimeout(()=>setZoom3(true),4200)
    setTimeout(()=>setZoom4(true),4200)
    // schedule, todolist initialization (if signed in.)
    if(props.username!=null){
      console.log('start fetch from backend!')
      try{
        const {
          data:{todoList, schedule, day}
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
          day: day
        })
        console.log('user data sent to backend successfully!')
      }
    }catch(e){
      console.log('send to backend error QQ', e)
      setDisplayStatus('error', 'Server is not on.')
    }
  },[schedule, todoList, day])
  return (
    <div className={classes.root}>
      {/* <Zoom in={zoom}> */}
      {!start?<Sweety myAnimation="breakFreeze" start={true}/>:
      <>
      <Grid container>
        <Grid container item spacing={0} justify='space-evenly'>
          <Grid container item spacing={2} xs={3}justify='space-evenly'>
            <Grid item xs={12} style={{height:"45vh"}}>
                <Sweety myAnimation={myAnimation}/>
            </Grid>
            <Grid item xs={12}>
              <Zoom in={zoom1}>
                <Card className={classes.block} style={{height:'55vh',}}>
                  <TodoList todoList={todoList} deleteItem={deleteItem}/>
                </Card>
              </Zoom>
              
            </Grid>
          </Grid>

          <Grid container item spacing={2} xs={6} justify='space-evenly'>
            <Grid item xs={12} >
                <Panel addItem={addItem} todoList={todoList} setSchedule={setSchedule} day={day} setDisplayStatus={setDisplayStatus} schedule={schedule}/>
                <button onClick={()=>setMyAnimation('assasination')}>assasination</button>
                <button onClick={()=>setMyAnimation('break1990')}>break1990</button>
                <button onClick={()=>setMyAnimation('breakFreeze')}>breakFreeze</button>
                <button onClick={()=>setMyAnimation('flair')}>flair</button>
                <button onClick={()=>setMyAnimation('hip-hop')}>hip-hop</button>
                <button onClick={()=>setMyAnimation('sitting')}>sitting</button>
                <button onClick={()=>setMyAnimation('situpus')}>situpus</button>
                <button onClick={()=>setMyAnimation('zombie-down')}>zombie-down</button>
                <button onClick={()=>setMyAnimation('playDrum')}>playDrum</button>
                <button onClick={()=>setMyAnimation('silly_dance')}>silly_dance</button>
            </Grid>
            <Grid item xs={12}>
              <Zoom in={zoom2}>
                <Card className={classes.block} style={{height:'70vh'}}>
                  <Calender todoList={todoList} schedule={schedule} day={day} setDay={setDay} setMyAnimation={setMyAnimation}/>
                </Card>
              </Zoom>
              
            </Grid>
          </Grid>

          <Grid container item spacing={2} xs={3} justify='space-evenly'>
            <Grid item xs={12} >
              <Zoom in={zoom3}>
                <Card className={classes.block} style={{height:'40vh', marginTop:'1vh'}}>
                  <Pie/>
                </Card>
              </Zoom>
              
            </Grid>
            <Grid item xs={12}>
              <Zoom in={zoom4}>
                <Card className={classes.block} style={{height:'55vh',}}>
                  <AllTodo/>
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
