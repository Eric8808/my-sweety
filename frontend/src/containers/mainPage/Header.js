import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '0px',
        marginBottom: '20px',
        width:"100%",
    },
    bar:{
        background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
  }));
// const useStyles = makeStyles((theme) => ({
//     title: {
//         margin: '0px',
//         marginBottom: '40px',
//         width:"100%",
//         background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
//     }
// }));

function Header(props) {
    const classes = useStyles();
    return (
        <Grid container item xs={12}  justify='center'>
            <Fade in timeout={1000}>
            <div className={classes.root}>
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Typography variant="h6">
                    Welcome! {props.username}!
                    </Typography>
                    {/* <Button color="inherit">Welcome! {props.username}</Button> */}
                    </Toolbar>
                </AppBar>
            </div>
            </Fade>
        </Grid>
    )
}

export default Header;