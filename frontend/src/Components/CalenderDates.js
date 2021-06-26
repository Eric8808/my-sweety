import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {useState} from 'react'
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function CalenderDate({week, setWeek}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hint, setHint] = useState('')
  const handlePopoverOpen = (text) => (event) => {
    setAnchorEl(event.currentTarget);
    setHint(text)
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid container alignItems='center' justify='space-around'>
      <Grid item xs={1} style={{minWidth:60,}}/>
      {[0,1,2,3,4,5,6].map((value) => {
        const today = new Date()
        let dateStyle = {}
        if (week === 0) {
          if (today.getDay() === value) {
            dateStyle = {backgroundColor: "#ffab40", borderRadius: '5px'}
          }
        }
        today.setDate(today.getDate() - today.getDay() + value + week*7)
        return (
          <Grid item xs={1} key={`date${value}`}>
            <Typography align='center' variant='h6' style={dateStyle}>
              {`${today.getMonth()+1}/${today.getDate()}`}
            </Typography>
          </Grid>
        )
      })}
      {/* <Grid item xs={1}/> */}
      <Grid item xs={2}  style={{minWidth:130,}}>
        <IconButton 
          color="primary" 
          aria-label="last-week" 
          id="last-week"
          onClick={()=>{setWeek(week-1)}} 
          onMouseEnter={handlePopoverOpen('last week')}
          onMouseLeave={handlePopoverClose}>
          <ArrowUpwardIcon style={{fontSize: 30}}/>
        </IconButton>
        <IconButton 
          color="primary" 
          aria-label="next-week" 
          onClick={()=>{setWeek(week+1)}}
          onMouseEnter={handlePopoverOpen('next week')}
          onMouseLeave={handlePopoverClose}>
          <ArrowDownwardIcon style={{fontSize: 30}}/>
        </IconButton>
        <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{hint}</Typography>
      </Popover>
      </Grid>        
    </Grid>    
  )
}

export default CalenderDate