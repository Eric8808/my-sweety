import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'

const useStyles = makeStyles({
    drawer: {
      '& .MuiDrawer-paper':{
        height: 100
      }
      
    }
  });

function CalenderDrawer(props) {
  const classes = useStyles();
  const open = props.drawerOpen
  const toggleDrawer = props.toggleDrawer
  const content = props.drawerContent
  
  return (
    <Drawer className={classes.drawer} 
            ModalProps={{BackdropProps:{invisible:true}}} 
            anchor={'right'} 
            open={open}
            onClose={toggleDrawer(false)}>
      {content.id}
    </Drawer>
  )
}
export default CalenderDrawer