import React from 'react';
import {CustomLink} from "./CustomLink";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80vw',
        margin: '2rem auto',
    },
    Header: {
        height: 120,
        padding: '0 16px'
    }
}));

export const MainLayout = ({children}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.main}>
                <Grid container alignItems="center" justify="space-between" className={classes.Header}>
                    <Typography  variant="h2" gutterBottom>
                        Chuck Test App
                    </Typography>
                    <CustomLink/>
                </Grid>
            {children}
        </Paper>

    );
};

