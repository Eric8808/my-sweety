import Calender from './Calender'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import MyResponsiveLine from './EvalChart';
import Panel from './Panel'
import TodoList from './TodoList'
import { useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import axios from '../api';
import useCalender from '../../hooks/useCalender'
import useDisplayStatus from '../../hooks/useDisplayStatus'
import ScheduledList from './ScheduledList';
import { FcLineChart, FcComboChart } from "react-icons/fc";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: "center",
      height: '100vh',
      overflow:"auto",
      background:"linear-gradient(45deg, #64b5f6 40%, #bbdefb 100%)"
    },
    calenderContainer: {
      height: '62vh',
    },
    calenderContainer1: {
      height: '35vh',
    },
    block:{
      background:'white',
      borderColor:"black",
      margin:"5px",
    }
  
}));
const Evaluation = (
    {
        todoList,
        scheduledList, 
        schedule,
        setMyAnimation,
    }) =>{
    const classes = useStyles();
    return (
        <>
            {/* =================================middle grid container===================================== */}
            <Grid container item spacing={2} xs={6} justify='space-evenly'>
            {/* --------------------------panel----------------------------- */}
                <Grid item xs={12} >

                </Grid>

                {/* ----------------------MyResponsiveLine-------------------------- */}
                <Grid item xs={12} style={{position:'relative',padding:'0px',}}>

                    <Card className={classes.block} style={{height:'70vh', background:'white', boxShadow:"none",}}>
                        <MyResponsiveLine/>
                    </Card>
                    
                </Grid>
            </Grid>  
            {/* ====================================================rightmost grid container============================================ */}
            <Grid container item spacing={2} xs={3} justify='space-evenly'>

                {/* ---------------------------TodoList------------------------------- */}
                <Grid item xs={12} style={{paddingBottom:"0px"}}>
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
                    </Card>
                </Grid>

                {/* ---------------------------Scheduled List----------------------------- */}
                <Grid item xs={12} style={{position:'relative'}}>
                    <Card className={classes.block} style={{
                                height:'50vh',
                                padding:"10% 5% 0% 5%",
                                background:'url("note7.png")', 
                                backgroundPosition:"50% 0%", 
                                backgroundSize:"150% 110%", 
                                backgroundRepeat:"no-repeat",
                                boxShadow:"none"}}>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Evaluation