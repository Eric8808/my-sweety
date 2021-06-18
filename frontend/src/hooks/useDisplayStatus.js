
import { React, useState, useRef} from 'react';

const DisplayStatus = () =>{
    const [msg, setMsg] = useState()
    const [showMsg, setShowMsg] = useState(false)
    const [messageState, setMessageState] = useState('')
    return {msg, setMsg, showMsg, setShowMsg, messageState, setMessageState}
}

export default DisplayStatus