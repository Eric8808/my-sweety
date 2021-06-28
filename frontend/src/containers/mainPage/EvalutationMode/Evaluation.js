
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import MyResponsiveLine from './EvalChart';
import MyResponsivePie from './EvalPie';

import Button from '@material-ui/core/Button'
import { useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import axios from '../../api';
import useDisplayStatus from '../../../hooks/useDisplayStatus'
import { FcLineChart, FcComboChart } from "react-icons/fc";

import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({

    block:{
      background:'#eeeeee',
      borderColor:"#42a5f5",
      marginTop:"1vh",
      marginRight:"1vw",
    //   padding:"10px"
      borderRadius:20
    },
    infoBlock:{
        background:"url('info.png')", 
        backgroundSize:"18vh 18vh",
        backgroundColor:"#e0e0e0",
        backgroundPosition:"top",
        backgroundRepeat:"no-repeat",
        height:"28vh",
        width:"80%",
        position:"absolute",
        top:'55%',
        // left: '10%',
        margin:"0% 10% 0% 10%",
        transform: 'translate(0%, -50%)',
        // boxShadow:"none"
    },
    infoDetailBlock:{
        // background:"url('info.png')", 
        // backgroundSize:"18vh 18vh",
        backgroundColor:"#e0e0e0",
        // backgroundPosition:"top",
        // backgroundRepeat:"no-repeat",
        height:"28vh",
        width:"90%",
        position:"absolute",
        top:'55%',
        left: '0%',
        margin:"0% 10% 0% 0%",
        transform: 'translate(0%, -50%)',
        // boxShadow:"none"
    },
  
}));


const Evaluation = ({scheduledList, schedule, setMyAnimation, day, username, completeDate}) =>{
    const classes = useStyles();

    const getRatio = (scheduledList)=>{
        if(scheduledList.length === 0){
            return 100
        }
        let totalNum = 0
        let totalCompleted = 0
        scheduledList.forEach((event)=>{
            totalNum += parseInt(event.needtime, 10)
            totalCompleted += (parseInt(event.needtime, 10)/parseInt(event.separate, 10))*parseInt(event.completed, 10)
        })
        return Math.round(totalCompleted/totalNum *100)
    }

    const infoButton = (text, color)=>{
        return(
            <Button 
                className={classes.itemButton}
                size="small"
                variant="contained" 
                style={{
                borderRadius: 50,
                pointerEvents: "none",
                color:"white",
                backgroundColor: color,
                fontStyle:"italic",
                // marginLeft:"10px",
                // marginTop:"10px",
                bottom:"0%",
                left:"50%",
                transform: 'translate(-50%, -50%)',
                position:"absolute"
                }}
            >{text}</Button>
        )
    }
    const titleButton = (text, color) =>{
        return(
            <Button 
                className={classes.itemButton}
                size="small"
                variant="contained" 
                style={{
                borderRadius: 50,
                pointerEvents: "none",
                color:"white",
                backgroundColor: color,
                fontStyle:"italic",
                marginLeft:"10px",
                marginTop:"10px",
                position:"absolute"
                }}
            >{text}</Button>
        )
    }
    return (
        <>
            <Zoom in={true} timeout={300}>
            {/* =================================middle grid container===================================== */}
            <Grid container item spacing={2} xs={9} justify='space-evenly'>
            {/* --------------------------panel----------------------------- */}
                <Grid container item xs={12} style={{paddingBottom:"0px"}} >
                    <Grid item xs={7}>
                        <Card className={classes.block} style={{height:'42vh', position:"relative"}}>
                            {titleButton("Scheduled List","#7986cb")}
                            <MyResponsivePie scheduledList={scheduledList}/>
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Card className={classes.block} style={{height:'42vh'}}>
                            {titleButton("Personal Info","#7986cb")}
                            <Grid container item>
                                <Grid item xs={5} style={{height:'42vh',position:"relative"}}>
                                    <Card className={classes.infoBlock}>
                                        {infoButton(username,"#0288d1")}
                                    </Card>
                                    
                                </Grid>
                                <Grid item xs={7} style={{height:'42vh',position:"relative"}}>
                                    <Card className={classes.infoDetailBlock}>
                                        {/* {infoDetailButton("99%","#ffa726",["70%", "30%"])} */}
                                        {/* {infoDetailButton("Completed: ","#00e676",["70%", "70%"])} */}
                                        <Typography 
                                        size="small"
                                        variant="contained" 
                                        style={{
                                          borderRadius: 0,
                                          height:"20px",
                                          color:"black",
                                          fontStyle:"italic",
                                          fontSize:"large",
                                          position:"absolute",
                                          fontWeight:"bold",
                                        //   top:"50%",
                                        //   left:"50%",
                                        //   transform: 'translate(-50%, -50%)',
                                        }}
                                      >
                                        Progress
                                      </Typography>
                                        <Typography 
                                        size="small"
                                        variant="contained" 
                                        style={{
                                          borderRadius: 0,
                                          height:"20px",
                                          color:"black",
                                          fontStyle:"italic",
                                          fontSize:"large",
                                          position:"absolute",
                                          fontWeight:"bold",
                                          top:"50%",
                                          left:"50%",
                                          transform: 'translate(-50%, -50%)',
                                        }}
                                      >
                                        {`${getRatio(scheduledList)}%`}
                                      </Typography>
                                        <MyResponsivePie scheduledList={scheduledList} isPersonalInfo={true}/>

                                    </Card>
                                </Grid>
                            </Grid>
                            
                        </Card>
                        
                    </Grid>
                </Grid>

                {/* ----------------------MyResponsiveLine-------------------------- */}
                <Grid item xs={12} >

                    <Card className={classes.block} style={{height:'49vh',position:"relative"}}>
                        {titleButton("Weekly Diligence","#7986cb")}
                        <MyResponsiveLine schedule={schedule} day={day} completeDate={completeDate}/>
                    </Card>
                    
                </Grid>
            </Grid>  
            {/* ====================================================rightmost grid container============================================ */}
            </Zoom>
        </>
    );
}

export default Evaluation