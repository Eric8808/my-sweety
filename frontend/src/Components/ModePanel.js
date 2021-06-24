
import Button from '@material-ui/core/Button'

import { FcLineChart, FcComboChart } from "react-icons/fc";
const ModePanel=({openEvaluation, setOpenEvaluation})=>{
    return(
        <>
        <FcComboChart color="white" size={70} style={{
            cursor:"pointer",
            border: '5px solid',
            borderColor:openEvaluation? "#bdbdbd":"#1a237e",
            borderRadius:"50%",
            backgroundColor: "white",
            position:"absolute",
            bottom:'0%', 
            left: '20%', 
            transform: 'translate(-50%, -50%)'
        }}
            onClick={()=>setOpenEvaluation(false)}
        />
        <Button size="small" variant="contained" style={{
            pointerEvents:"none",
            color:openEvaluation? "white":"#1a237e",
            fontStyle:"italic",
            border: 'none',
            boxShadow:"none",
            background:"transparent",
            position:"absolute",
            bottom:'-1%', 
            left: '20%', 
            transform: 'translate(-50%, -50%)'
        }}>Schedule Mode</Button>
        <FcLineChart color="white" size={70} style={{
            cursor:"pointer",
            border: '5px solid',
            borderColor:openEvaluation?"#1a237e":"#bdbdbd",
            borderRadius:"50%",
            backgroundColor: "white",
            position:"absolute",
            bottom:'0%', 
            right: '0%', 
            transform: 'translate(-50%, -50%)'
        }}
            onClick={()=>setOpenEvaluation(true)}
        />
        <Button size="small" variant="contained" style={{
            pointerEvents:"none",
            color:openEvaluation? "#1a237e":"white",
            fontStyle:"italic",
            border: 'none',
            boxShadow:"none",
            background:"transparent",
            position:"absolute",
            bottom:'-1%', 
            right: '-20%', 
            transform: 'translate(-50%, -50%)'
        }}>Evaluation Mode</Button>
        </>
    )
}

export default ModePanel