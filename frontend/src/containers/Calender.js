import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiGrid-item': {
            // padding: 10
            // margin: '0 2px 0 2px',
        }
        
        // maxWidth: 200,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
        // alignItems: 'center',
    },
    list: {
        
        '& .MuiListItem-root': {
            // borderCollapse: 'collapse',
            // minWidth: 50,
            border: '1px solid black',
            height: 100,
        }
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
    const [numMon, setNumMon] = useState(3)
    const [numTue, setNumTue] = useState(3)
    const [numWed, setNumWed] = useState(3)
    const [numThu, setNumThu] = useState(3)
    const [numFri, setNumFri] = useState(3)
    const [numSat, setNumSat] = useState(3)
    const [numSun, setNumSun] = useState(3)
    return (
        <Grid container xs={12} className={classes.root} justify='center'>
            {day.map((value,i) => (
                <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    {value}
                </Typography>
                <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={numMon}
                    onChange={handleChange(setNumMon)}
                    variant="outlined"
                    size='small'
                />
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                                <ListItemText
                                    // primary="Single-line item"
                                />
                            </ListItem>, i+1
                        )}
                    </List>
                    
                </div>
            </Grid>
            ))}
            {/* <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={numMon}
                    onChange={handleChange(setNumMon)}
                    variant="outlined"
                    size='small'
                />
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                                <ListItemText
                                    // primary="Single-line item"
                                />
                            </ListItem>, numMon
                        )}
                    </List>
                    
                </div>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                                <ListItemText
                                    primary="Single-line item"
                                />
                            </ListItem>,3
                        )}
                    </List>
                </div>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" className={classes.title} align='center'>
                    Sunday
                </Typography>
                <div className={classes.demo}>
                    <List className={classes.list}>
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid> */}
        </Grid>
    );
}

export default Calender;