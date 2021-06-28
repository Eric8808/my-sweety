import React, { Fragment } from 'react';
import { useState, useRef} from 'react';

import axios from '../api'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import  Zoom  from '@material-ui/core/Zoom';
import Fade from "@material-ui/core/Fade";
import './login.css'
import {useHistory} from "react-router-dom"
import { FcCellPhone, FcPhone, FcCallback } from "react-icons/fc";
import { FiPhoneCall } from "react-icons/fi";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      background:"linear-gradient(45deg, #64b5f6 40%, #bbdefb 100%)"
    },
  }));
const handleChange = (func) => (event) => {
    func(event.target.value);
};

const LoginPage =()=>{
    let history = useHistory()
    const classes = useStyles();
    const enterPage = useRef(null);
    const [enter, setEnter]=useState(false)
    const [signInInput, setSignInInput] = useState({username:'', password:''})
    const [signUpInput, setSignUpInput] = useState({username:'', password:'', confirmPwd:'', compare:true})
    const [isLogin, setLogin] = useState(false)
    const [accMsg, setAccMsg] = useState()
    const [showMsg, setShowMsg] = useState(false)
    const [messageState, setMessageState] = useState('')
    const [animationClass, setAnimationClass] = useState('container')

    const handleEnter=(e)=>{
        setEnter(true)
        enterPage.current.style.display = 'block'
        e.target.style.display='none'
    }
    const handleSignUpInput=(e)=>{
        if(e.target.id==='Username'){
            setSignUpInput((prev)=>({...prev, username:e.target.value }))
        }
        else if(e.target.id==="Password"){
            setSignUpInput((prev)=>({
                ...prev, 
                password:e.target.value, 
                compare:(e.target.value===prev.confirmPwd)}))
        }
        else if (e.target.id==='Confirm Password'){
            setSignUpInput(prev=>({
                ...prev, 
                confirmPwd:e.target.value,
                compare:(e.target.value===prev.password)
            }))
        }
    }
    const handleSignInInput=(e)=>{
        if(e.target.id==='Username'){
            setSignInInput((prev)=>({...prev, username:e.target.value }))
        }
        else if(e.target.id==="Password"){
            setSignInInput((prev)=>({...prev, password:e.target.value}))
        }
    }
    const handleRegister= async (e)=>{
        // handle some error at frontend
        e.preventDefault()
        if(signUpInput.compare===false){
            setShowMsg(true)
            setMessageState('error')
            setAccMsg('Failed! Confirm your password again!')
            return
        }
        else if(!signUpInput.username || /^\s*$/.test(signUpInput.username) || !signUpInput.password || /^\s*$/.test(signUpInput.password)){
            //If anybody is blank
            setShowMsg(true)
            setMessageState('error')
            setAccMsg('Failed! Check your info again!')
            return
        }

        // if info is complete
        try{
            const {
                data: {message, success},
              } = await axios.post('/api/account/register',{
                username: signUpInput.username,
                password: signUpInput.password
            })
            if(success){
                setMessageState('success')
            }
            else{
                setMessageState('error')
            }
            setShowMsg(true)
            setAccMsg(message)
        }catch(e){
            // Maybe the server has some problem.
            setMessageState('warning')
            setShowMsg(true)
            setAccMsg("Maybe the server has some problem...")
        }
    }
    const handleLogin= async (e)=>{
        e.preventDefault()
        if(!signInInput.username || /^\s*$/.test(signInInput.username) || !signInInput.password || /^\s*$/.test(signInInput.password)){
            //If anybody is blank
            setMessageState('error')
            setShowMsg(true)
            setAccMsg('Failed! Check your info again!')
            return
        }
        try{
            const {
                data: {message, success, token},
              } = await axios.post('/api/account/login',{
                username: signInInput.username,
                password: signInInput.password
            })
            if(success){
                setMessageState('success')
                localStorage.setItem('token', token)
                history.push("./profile")
            }
            else{
                setMessageState('error')
            }
            setShowMsg(true)
            setAccMsg(message)
        }catch(e){
            // Maybe the server has some problem...
            setMessageState('warning')
            setShowMsg(true)
            setAccMsg("Maybe the server has some problem...")
        }
        
    }
    const handleClickAnimation=(e)=>{
        console.log(e.target.id)
        if(e.target.id==='signUp'){
            setAnimationClass("container right-panel-active")
        }
        else if (e.target.id==="signIn"){
            setAnimationClass("container")
        }
    }
    return(
        <>
        <div className="Login-page-only">
        {!enter?(
            <FcCallback size={100} />
        ):(
            <Fade in={enter} timeout={1000}>
                <FiPhoneCall size={50} />
            </Fade>
        )}
        <h3 className="Enter-button" onClick={handleEnter}>Call My Sweety!</h3>
        <Fade in={enter} timeout={1000}>
        <div className={animationClass} ref={enterPage} id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Userame"  id="Username" value={signUpInput.username} onChange={(e)=>handleSignUpInput(e)}/>
                    <input type="password" placeholder="Password" id="Password" value={signUpInput.password} onChange={(e)=>handleSignUpInput(e)}/>
                    <input type="password" placeholder="Confirm Password" id="Confirm Password" value={signUpInput.confirmPwd} onChange={(e)=>handleSignUpInput(e)}/>
                    {signUpInput.compare?null:<div style={{color:"red"}}>Please confirm your password</div>}
                    <button onClick={handleRegister}>Sign Up</button>
                    <br></br>
                    <button onClick={()=>{history.push("./guest")}} style={{backgroundColor:'green'}}>Continue as a guest</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <input type="text" placeholder="Username" id="Username" value={signInInput.username} onChange={(e)=>handleSignInInput(e)}/>
                    <input type="password" placeholder="Password" id="Password" value={signInInput.password} onChange={(e)=>handleSignInInput(e)} />
                    <a style={{cursor:'pointer'}} onClick={()=>{
                        setShowMsg(true)
                        setMessageState('warning')
                        setAccMsg('Take a rest. One day you will recall it.')
                    }}>Forgot your password?</a>
                    <button onClick={handleLogin}>Sign In</button>
                    <br></br>
                    <button onClick={()=>{history.push("./guest")}} style={{backgroundColor:'green'}}>Continue as a guest</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <h1>My Sweety!</h1>
                        <p>Login and keep productive today!</p>
                        <button className="ghost" id="signIn" onClick={(e)=>handleClickAnimation(e)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello!</h1>
                        <h1>Nice to meet you!</h1>
                        <p>I'm your personal assistant. Sign up and start a journey with me!</p>
                        <button className="ghost" id="signUp" onClick={(e)=>handleClickAnimation(e)}>Sign Up</button>
                    </div>
                </div>
            </div>
            
        </div>
        
        </Fade>
        </div>
        <Snackbar open={showMsg} autoHideDuration={6000} onClose={()=>setShowMsg(false)}>
            <Alert onClose={()=>setShowMsg(false)} severity={messageState}>
                {/* successState: error, warning, info, success */}
                {accMsg}
            </Alert>
        </Snackbar>
        </>
    )

}

export default LoginPage