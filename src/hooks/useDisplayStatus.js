
import { React, useState, useRef} from 'react';

const DisplayStatus = (myAnimation, setMyAnimation) =>{
    const [msg, setMsg] = useState()
    const [showMsg, setShowMsg] = useState(false)
    const [messageState, setMessageState] = useState('')
    function setDisplayStatus(state, msg){
    // state: 'success', 'error', 'warning', 'info'
        if(state === 'error' || state==="warning"){
            setTimeout(()=>{
                setMyAnimation(myAnimation)
            },3000)
            setMyAnimation("HitToBody")
        }
        setMsg(msg)
        setShowMsg(true)
        setMessageState(state)
    }
    return {msg, showMsg, messageState, setDisplayStatus, setShowMsg}
}

export default DisplayStatus