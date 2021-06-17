import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    drawer: {
      '& .MuiDrawer-paper':{
        height: 200
      },
    card: {
        minWidth: 275,
        display: 'block',
        // width: '30vw',
        transitionDuration: '0.3s',
        height: 'auto',
        background:"blue"
    },  
    }
  });

function CalenderDrawer({open, toggleDrawer, content}) {
  const classes = useStyles();
  
  return (
    <Drawer className={classes.drawer} 
            ModalProps={{BackdropProps:{invisible:true}}} 
            anchor={'right'} 
            open={open}
            onClose={toggleDrawer(false)}>
      <Card className={classes.card} elevation={0}>
          <CardContent>
              {Object.keys(content).map((value) => (
                  <Typography>
                      {`${value}: ${content[value]}`}
                  </Typography>
              ))}
          </CardContent>
      </Card>
    </Drawer>
  )
}
export default CalenderDrawer