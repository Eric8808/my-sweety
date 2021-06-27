import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Sweety from '../../Components/sweety'
import Button from '@material-ui/core/Button'
import LoginCard from './LoginCard';
import LoginPage from './LoginPage';
import { FcCellPhone, FcAlarmClock } from "react-icons/fc";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: "center",
      height: '100vh',
      overflow:"auto",
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
    }
}));

const SweetyLoginPage = () =>{
    const classes = useStyles();
    const [mouseOver, setMouseOver] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [animation, setAnimation] = useState("Sitting2")
    return(
        <div className={classes.root}>
            {showLogin? <LoginCard/>:
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
            onClick={()=>setShowLogin(true)}
            />
            <Button size="small" variant="contained" className={classes.fakeButton}>Call My Sweety!</Button>
            </>
            }
        </div>
    )
}

export default SweetyLoginPage