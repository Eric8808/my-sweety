import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {React, useState} from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
export default function AlertDialog({drawerOpen, setDrawerOpen, content, setMyAnimation}) {
  
    const handleClickOpen = () => {
      setDrawerOpen(true)
    };
  
    const handleClose = () => {
      setDrawerOpen(false)
      setMyAnimation("sitting")
    };
    
    const {id: event, value: hours, indexValue: day } = content
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
              backgroundSize:"400px 230px",
              boxShadow: 'none',
              position: 'absolute',
              left:"15vw",
              height:"35vh"

          }}}
        >
          <DialogTitle id="draggable-dialog-title" style={{ cursor: 'move' }}></DialogTitle>
          <DialogContent 
            style={{
                borderRadius:"30px",
                padding:"50px 80px 30px 40px",
                }}>
            <DialogContentText id="alert-dialog-description" style={{color:"black", fontSize:"large"}}>
                {`Event: ${event}`}
                <br></br>
                {`Hours: ${hours}`}
                <br></br>
                {`Working Day: ${day}`}
            </DialogContentText>
            
          </DialogContent>
          <DialogActions style={{
                borderRadius:"30px",
                padding:"0px 80px 0px 0px",
                }}>
            <button onClick={handleClose}>close</button>
            <button onClick={handleClose}>close</button>
        </DialogActions>
        </Dialog>
      </div>
    );
  }