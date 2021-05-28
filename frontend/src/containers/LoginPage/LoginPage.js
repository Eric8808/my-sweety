import React, { Fragment } from 'react';
import { useState } from 'react';

import axios from '../../api'
import Yuri from '../../myimages/yuri.jpg'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './login.css'
// import './loginBG.module.css'
import {useHistory} from "react-router-dom"

const handleChange = (func) => (event) => {
    func(event.target.value);
};

const LoginPage =()=>{
    let history = useHistory()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [isLogin, setLogin] = useState(false)
    const [accMsg, setAccMsg] = useState()
    const [showMsg, setShowMsg] = useState(false)
    const [animationClass, setAnimationClass] = useState('container')

    const handleRegister= async ()=>{
        const {
            data: {message, success},
          } = await axios.post('/api/register',{
            user: user,
            pwd, pwd
        })
        setLogin(success)
        setShowMsg(true)
        setAccMsg(message)
    }
    const handleLogin= async ()=>{
        console.log('Hello')
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
        <div className="Login-page-only">
        <div className={animationClass} id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Userame" onChange={handleChange(setUser)}/>
                    <input type="password" placeholder="Password" onChange={handleChange(setPwd)}/>
                    <button onClick={handleRegister}>Sign Up</button>
                    <br></br>
                    <button onClick={()=>{history.push("./profile")}} style={{backgroundColor:'green'}}>測試用，點了直接進app</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <input type="text" placeholder="Username" onChange={handleChange(setUser)}/>
                    <input type="password" placeholder="Password" onChange={handleChange(setPwd)} />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                    <br></br>
                    <button onClick={()=>{history.push("./profile")}} style={{backgroundColor:'green'}}>測試用，點了直接進app</button>
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
        </div>
    )

}

export default LoginPage