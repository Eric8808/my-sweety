import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Sweety from '../../Components/sweety'
import Button from '@material-ui/core/Button'
import LoginCard from './LoginCard';
import LoginPage from './LoginPage';
import { FcCellPhone, FcAlarmClock, FcDownLeft } from "react-icons/fc";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: "center",
      height: '100vh',
      overflow:"auto",
      position:"relative",
      background:"linear-gradient(45deg, #64b5f6 40%, #bbdefb 100%)"
    },

    icon:{
        cursor:"pointer",
        border: '5px solid',
        borderColor:"#bdbdbd",
        borderRadius:"50%",
        backgroundColor: "white",
        position:"absolute",
        bottom:'0%', 
        left: '20%', 
        transform: 'translate(-50%, -50%)'
    },

    fakeButton:{
        pointerEvents:"none",
        fontStyle:"italic",
        fontWeight:"bold",
        color:"#1a237e",
        border: 'none',
        boxShadow:"none",
        background:"transparent",
        position:"absolute",
        top:'27%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)'
    },
    title:{
        position:"absolute",
        top:"2%",
        left:"2%",
        justifyContent:"center",
        textAlign:"center",
        // border:"solid",
        padding:"15px",
        borderRadius:50,
        color:"#303f9f"
    },
    leftInfo:{
        position:"absolute",
        top:'30%', 
        left: '23%', 
        transform: 'translate(-50%, 0%)',
        // border:"solid",
        width:"35%",
        justifyContent:"center",
        // textAlign:"center"
    },
    rightInfo:{
        position:"absolute",
        top:'50%', 
        left: '82%', 
        transform: 'translate(-50%, -50%)',
        // border:"solid",
        width:"35%",
        justifyContent:"center",
        // textAlign:"center"
    },
    infoTitle:{
        fontSize:"40px",
        fontFamily:"monospace",
        fontWeight:"bold"
    },
    infoContent:{
        fontSize:"22px",
        fontFamily:"monospace",
        color:"white"
    }
}));

const SweetyLoginPage = () =>{
    const classes = useStyles();
    const [mouseOver, setMouseOver] = useState(false)
    const [mouseOver2, setMouseOver2] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [animation, setAnimation] = useState("Sitting2")
    const [leftOp, setLeftOp] = useState(0.2)
    const [rightOp, setRightOp] = useState(0.2)
    return(
        <div className={classes.root}>
            {showLogin?
            <>  
                <LoginCard/>
                
                <FcDownLeft size={50} style={{
                cursor:"pointer",
                borderWidth: mouseOver2?"10px":"5px",
                borderStyle:"solid",
                borderColor:mouseOver2?"#1a237e":"#bdbdbd",
                borderRadius:"50%",
                backgroundColor: "white",
                position:"absolute",
                top:'8%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={()=>{setMouseOver2(true)}}
                onMouseLeave={()=>{setMouseOver2(false)}}
                onClick={()=>{setShowLogin(false);setMouseOver2(false)}}/>
            </>
            :
            <>
            <Sweety myAnimation={animation} start={true}/>
            <FcCellPhone size={70} style={{
                cursor:"pointer",
                borderWidth: mouseOver?"10px":"5px",
                borderStyle:"solid",
                borderColor:mouseOver?"#1a237e":"#bdbdbd",
                borderRadius:"50%",
                backgroundColor: "white",
                position:"absolute",
                bottom:'70%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={()=>{setMouseOver(true);setAnimation("StandingGreeting");}}
            onMouseLeave={()=>{setMouseOver(false);setAnimation("Sitting2")}}
            onClick={()=>{setShowLogin(true);setMouseOver(false)}}
            />
            <div className={classes.title}>
                <div style={{fontSize:"75px", fontFamily:"fantasy", color:"#1a237e"}}>
                    My Sweety
                </div>
                <div style={{fontSize:"30px", fontFamily:"monospace", fontWeight:"bold"}}>
                    Your Personal Assistant
                </div>
            </div>
            <div className={classes.leftInfo} style={{opacity:leftOp}} onMouseEnter={()=>{setLeftOp(1)}} onMouseLeave={()=>{setLeftOp(0.2)}}>
                <div className={classes.infoTitle}>
                    Schedule Mode
                </div>
                <div className={classes.infoContent}>
                    Tell Sweety your todo-events and daily available time. Sweety will schedule all events and handle everything for you! Let's say goodbye to your procrastination!
                    <img src="schedule.png" style={{width:"100%"}}></img>
                </div>
            </div>

            <div className={classes.rightInfo} style={{opacity:rightOp}} onMouseEnter={()=>{setRightOp(1)}} onMouseLeave={()=>{setRightOp(0.2)}}>
                <img src="evaluation.png" style={{width:"100%"}}/>
                <div className={classes.infoTitle}>
                    Evaluation Mode
                </div>
                <div className={classes.infoContent}>
                    For all your scheduled events, mark them as completed if done. Sweety will track all your activities and analyze your progress and diligence!
                </div>
            </div>
            <Button size="small" variant="contained" className={classes.fakeButton}>Call My Sweety!</Button>
            </>
            }
        </div>
    )
}

export default SweetyLoginPage