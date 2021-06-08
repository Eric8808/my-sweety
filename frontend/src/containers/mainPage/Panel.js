import React from 'react';
import { useState} from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from '../../Components/AddDialog'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

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


function Panel({addItem}) {
  const classes = useStyles();
  const [showBtn, setShowBtn] = useState(true)
  const [showBlock, setShowBlock] = useState(false)

  const handleSchedule = () => {

  }

  const handleAdd = () => {
    setShowBlock(true)
  }
  const handleBack = () => {
    setShowBlock(false)
  }
  return (
    
      <Grid container xs={12} justify='center' alignItems='center' className={classes.grid}>
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