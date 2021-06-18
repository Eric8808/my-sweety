
import { React, useState, useRef} from 'react';

const DisplayStatus = () =>{
    const [msg, setMsg] = useState()
    const [showMsg, setShowMsg] = useState(false)
    const [messageState, setMessageState] = useState('')
    function setDisplayStatus(state, msg){
    // state: 'success', 'error', 'warning', 'info'
        setMsg(msg)
        setShowMsg(true)
        setMessageState(state)
    }
    return {msg, showMsg, messageState, setDisplayStatus, setShowMsg}
}

export default DisplayStatus