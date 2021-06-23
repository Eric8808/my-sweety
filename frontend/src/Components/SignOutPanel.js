import {useHistory} from "react-router-dom"
import Button from '@material-ui/core/Button'
import axios from '../containers/api'
import SignOutPopUpWindow from './SignOutPopUpWindow'

import {useState, useEffect} from 'react'
const SignOutPanel = ({username, setMyAnimation}) =>{
    let history = useHistory()
    
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerContent, setDrawerContent] = useState('')

    const handleDeleteAccount = async ()=>{
        const {
            data: {message, success},
          } = await axios.post('/api/account/delete',{
            username: username,
        })
        console.log(message)
        history.push("./")
        localStorage.removeItem('token')
        
    }
    const handleSignOut=()=>{
        history.push("./")
        localStorage.removeItem('token')
    }
    if(username===null){
        return
    }
    return(
        <>
        <Button size="small" variant="contained"
            onClick={()=>{
                setDrawerContent("sign out?")
                setDrawerOpen(true)
                setMyAnimation("assasination")
            }} 
            style={{
            borderRadius: 50,
            color:"white",
            background:"#9e9e9e",
            fontStyle:"italic",
            margin:"0px 0px 0px 10px"
            }}>
        Sign Out
        </Button>

        <Button size="small" variant="contained" 
            onClick={()=>{
                setDrawerContent("delete your account? (You have to register again.)")
                setDrawerOpen(true)
                setMyAnimation("zombie-down")
            }}
            style={{
            borderRadius: 50,
            color:"white",
            background:"#f44336",
            fontStyle:"italic",
            margin:"0px 0px 0px 10px",
            }}>
        Delete Account
        </Button>

        <SignOutPopUpWindow
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          content={drawerContent}
          setMyAnimation={setMyAnimation}
          handleDeleteAccount={handleDeleteAccount}
          handleSignOut={handleSignOut}
        />
        </>
    )
}

export default SignOutPanel