import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {React, useState} from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Button from '@material-ui/core/Button'

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
export default function SignOutrPopUpWindow({
  drawerOpen, 
  setDrawerOpen, 
  content, 
  setMyAnimation, 
  setConfirm,
  handleDeleteAccount,
  handleSignOut
}) {
    const handleClose = () => {
      setDrawerOpen(false)
      setMyAnimation("RumbaDance")
    };
    const handleConfirm=()=>{
      if(content === "sign out?"){
        handleSignOut()
      }
      else{
        handleDeleteAccount()
      }
    }
    
    return (
      <div>
        <Dialog
          open={drawerOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth='xs'
          fullWidth={true}
          PaperComponent={PaperComponent}
          PaperProps={{style:{
              backgroundImage: "url('dialog.png')",
              backgroundColor:"transparent",
              backgroundRepeat:"no-repeat",
              backgroundSize:"20vw 23vh",
              boxShadow: 'none',
              position: 'absolute',
              left:"15vw",
              height:"27vh",
              width:"20vw"

          }}}
        >
          <DialogTitle id="draggable-dialog-title" style={{ cursor: 'move' }}></DialogTitle>
          <DialogContent 
            style={{
                borderRadius:"30px",
                padding:"5vh 0vw 0vh 2vw",
                marginBottom:"1vh",
                }}>
            <DialogContentText id="alert-dialog-description" style={{color:"black", fontSize:"large",height:"50%"}}>
                {`Are you sure you want to ${content}`}
            </DialogContentText>
            
          </DialogContent>
          <DialogActions style={{
                borderRadius:"30px",
                padding:"0px 0px 0px 0px",
                }}>
            <Button size="small" variant="contained"
                onClick={()=>handleConfirm(true)}
                style={{
                borderRadius: 50,
                color:"white",
                background:content==='sign out?'? '#9e9e9e':"#dd2c00",
                fontStyle:"italic",
                margin:"0px 0px 0px 10px",
                }}>
              {content==='sign out?'? 'sign out' : 'delete account'}
            </Button>
            <Button size="small" variant="contained" 
                onClick={()=>handleClose()}
                style={{
                borderRadius: 50,
                color:"black",
                background:"white",
                fontStyle:"italic",
                margin:"0px 0px 0px 10px",
                }}>
              Close
            </Button>
        </DialogActions>
        </Dialog>
      </div>
    );
  }