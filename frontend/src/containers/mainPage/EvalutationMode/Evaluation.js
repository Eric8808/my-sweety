
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
const useStyles = makeStyles((theme) => ({

    block:{
      background:'#eeeeee',
      borderColor:"black",
      marginTop:"1vh",
      marginRight:"1vw",
    //   padding:"10px"
      borderRadius:20
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
            <Grid container item spacing={2} xs={9} justify='space-evenly'>
            {/* --------------------------panel----------------------------- */}
                <Grid container item xs={12} style={{paddingBottom:"0px"}} >
                    <Grid item xs={6}>
                        <Card className={classes.block} style={{height:'42vh', position:"relative"}}>
                            <Button 
                                className={classes.itemButton}
                                size="small"
                                variant="contained" 
                                style={{
                                borderRadius: 50,
                                pointerEvents: "none",
                                color:"white",
                                backgroundColor: "#7986cb",
                                fontStyle:"italic",
                                marginLeft:"2%",
                                marginTop:"2%",
                                position:"absolute"
                                }}
                            >Scheduled List</Button>
                            <MyResponsivePie scheduledList={scheduledList}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.block} style={{height:'37vh'}}>
                            {/* <MyResponsivePie/> */}
                        </Card>
                    </Grid>
                </Grid>

                {/* ----------------------MyResponsiveLine-------------------------- */}
                <Grid item xs={12} >

                    <Card className={classes.block} style={{height:'49vh', boxShadow:"none",}}>
                        <MyResponsiveLine/>
                    </Card>
                    
                </Grid>
            </Grid>  
            {/* ====================================================rightmost grid container============================================ */}
            
        </>
    );
}

export default Evaluation