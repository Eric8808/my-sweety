import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: '20px'
    }
}));

function Header() {
    const classes = useStyles();
    return (
        <Grid xs={12} container justify='center'>
            <Typography variant='h1' className={classes.title}>
                My Sweety
            </Typography>
        </Grid>
    )
}

export default Header;