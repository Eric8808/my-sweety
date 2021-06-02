import '../App.css';
import Header from './mainPage/Header'
import SpeedDial from './mainPage/SpeedDial'
import Calender from './mainPage/Calender'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import Add from '../containers/mainPage/Add'
import Pie from './mainPage/block/Pie'
import AllTodo from './mainPage/block/AllTodo'
import Sweety from './mainPage/block/sweety'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    height: '100vh',
    overflow:"auto",
    background:"#e3f2fd"
  },
  block:{
    background:"white"
  }

}));

function App(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item spacing={0} justify='space-evenly'>
          {/* left block inside-space:2 whole-width:3 */}
          <Grid container item spacing={2} xs={3}justify='space-evenly'>
            <Grid item xs={12} >
              <Card className={classes.block} style={{height:'40vh', marginTop:'1vh',borderRadius:'50%'}}>
                <Sweety/>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.block} style={{height:'55vh',}}>
              </Card>
            </Grid>
          </Grid>

          {/* middle block inside-space:2 whole-width:6 */}
          <Grid container item spacing={2} xs={6} justify='space-evenly'>
            <Grid item xs={12} >
              <Card className={classes.block} style={{height:'20vh', marginTop:'1vh'}}>
                <Add/>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.block} style={{height:'75vh'}}>
                <Calender/>
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
