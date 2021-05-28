import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    container: {
        '& .MuiTableCell-root': {
            padding: 0
        },
        maxHeight: '70vh',
      },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(2),
        // border: '1px solid red'
        // alignItems: 'center',
    },
    cell:{
        verticalAlign: 'top'
    },
    list: {
        '& .MuiListItem-root':{
            border: '1px solid black',
            width: '100%',
            paddingTop: '80%',
            // height:'same-as-width',
            
        },
        
    }
  }));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49),
  ];

function generate(element, num) {
    const temp=[];
    for (var i = 1; i <= num; i++) {
        temp.push(i);
     } 
    return temp.map((_, i) =>
        React.cloneElement(element, {
        key: i,
        }),
    );
}
const handleChange = (func) => (event) => {
    func(event.target.value);
  };


function Calender() {
    const classes = useStyles();
    const day = ['日', '一','二','三','四','五','六']
    const [available, setAvb] = useState([3,3,3,3,3,3,3])

    // const changeAvb = (event, i) => {
    //     const newAvb = available;
    //     newAvb[i] = parseInt(event.target.value) ;
    //     console.log(newAvb)
    //     setAvb(newAvb);
    // }
    const [numMon, setNumMon] = useState(3)
    const [numTue, setNumTue] = useState(3)
    const [numWed, setNumWed] = useState(3)
    const [numThu, setNumThu] = useState(3)
    const [numFri, setNumFri] = useState(3)
    const [numSat, setNumSat] = useState(3)
    const [numSun, setNumSun] = useState(3)
    const numDay = [numMon, numTue, numWed, numThu, numFri, numSat, numSun]
    const setNumDay = [setNumMon, setNumTue, setNumWed, setNumThu, setNumFri, setNumSat, setNumSun]
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {day.map((value,i) => (
                                <TableCell key={`col${value}`}>
                                    <Typography variant="h5" className={classes.title} align='center'>
                                        {value}
                                    </Typography>
                                    <TextField
                                        id="outlined-number"
                                        inputProps={{min: 1, style: { textAlign: 'center' }}}
                                        label="Number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={numDay[i]}
                                        onChange={handleChange(setNumDay[i])}
                                        variant="outlined"
                                        size='small'
                                    />
                                </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {day.map((value,i) => (
                                <TableCell className={classes.cell} key={`list${value}`}>
                                    <div className={classes.demo}>
                                        <List className={classes.list}>
                                            {generate(
                                                <ListItem>
                                                    <ListItemText
                                                        // primary="Single-line item"
                                                    />
                                                </ListItem>, numDay[i]
                                            )}
                                        </List>
                                    </div>
                                </TableCell>))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper> 
    );
}

export default Calender;