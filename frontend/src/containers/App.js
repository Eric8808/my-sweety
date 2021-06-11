import '../App.css';
import Header from './mainPage/Header'
import SpeedDial from './mainPage/SpeedDial'
import Calender from './mainPage/Calender'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import Panel from './mainPage/Panel'
import TodoList from '../containers/mainPage/TodoList'
import useTodoList from '../hooks/useTodoList'
import Pie from './mainPage/block/Pie'
import AllTodo from './mainPage/block/AllTodo'
import Sweety from './mainPage/block/sweety'
import TextField from '@material-ui/core/TextField'
import useCalender from '../hooks/useCalender'
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    height: '100vh',
    overflow:"auto",
    background:"#e3f2fd"
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
    background:"white"
  }

}));

function App(props) {
  const classes = useStyles();
  const {todoList, addItem, deleteItem} = useTodoList()
  const {day, setDay} = useCalender()
  const [myAnimation, setMyAnimation] = useState('flair')
  const [schedule,setSchedule] = useState([])
  console.log(schedule)///print schedule
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item spacing={0} justify='space-evenly'>
          <Grid container item spacing={2} xs={3}justify='space-evenly'>
            <Grid item xs={12} >
              {/* <Card className={classes.block} style={{height:'40vh', marginTop:'1vh',borderRadius:'50%'}}> */}
                <Sweety myAnimation={myAnimation}/>
              {/* </Card> */}
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.block} style={{height:'55vh',}}>
                <TodoList todoList={todoList} deleteItem={deleteItem}/>
              </Card>
            </Grid>
          </Grid>

          {/* middle block inside-space:2 whole-width:6 */}
          <Grid container item spacing={2} xs={6} justify='space-evenly'>
            <Grid item xs={12} >
              {/* <Card className={classes.block} style={{height:'20vh', marginTop:'1vh'}}> */}
                <Panel addItem={addItem} todoList={todoList} setSchedule={setSchedule} day={day}/>
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
              {/* </Card> */}
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.block} style={{height:'70vh'}}>
                <Calender todoList={todoList} schedule={schedule} day={day} setDay={setDay}/>
              </Card>
            </Grid>
          </Grid>

          {/* right block inside-space:2 whole-width:3*/}
          <Grid container item spacing={2} xs={3} justify='space-evenly'>
            <Grid item xs={12} >
              <Card className={classes.block} style={{height:'40vh', marginTop:'1vh'}}>
                <Pie/>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.block} style={{height:'55vh',}}>
                <AllTodo/>
              </Card>
            </Grid>
          </Grid>
                
        </Grid>
      </Grid>
    </div>
    
      // <Header/>
      // <Grid container className={classes.root} spacing={10} >
      //   <Grid item height='100%'>
      //     <Paper variant="outlined" className={classes.paper} elevation={8}/>
      //   </Grid>
      // </Grid>
  );
}

export default App;
