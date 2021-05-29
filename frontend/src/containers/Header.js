import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: '20px',
        marginBottom: '40px',
    }
}));

function Header(props) {
    const classes = useStyles();
    return (
        <Grid container item xs={12}  justify='center'>
            <Fade in timeout={2000}>
            <Typography variant='h1' className={classes.title}>
                {`My Sweety ${props.username}!`}
            </Typography>
            </Fade>
        </Grid>
    )
}

export default Header;