import '../App.css';
import Header from './Header'
import Sweety from './sweety'
import Calender from './Calender'
import TodoList from './TodoList'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'



// componentWillMount() {
//   this.tick.animate = false
// }

// componentDidMount() {
// this.tick = Tick(()=>{
//   var {rotation} = this.state
//   rotation.y += 0.005
//   this.setState({rotation})

// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    // bottom: '10%',
    // border:'1px solid black',
    height: '90vh',
    // backgroundColor: 'black',
  },
  paper: {
    height: '500px',
    // width: '100%',
    // backgroundColor: 'green',
    color: 'white',
    padding: theme.spacing(2)
  },

}));

function App() {
  const classes = useStyles();
  return (
    // <Sweety/>
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Header/>
        <Grid container item spacing={2}>
          <Grid item xs>
            {/* <Paper variant="outlined" elevation={3} className={classes.paper}/> */}
          </Grid>
          <TodoList/>
          <Grid item xs={7}>
            <Calender/>
            {/* <Paper variant="outlined" elevation={3} className={classes.paper}/> */}
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
