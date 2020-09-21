import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    mainGrid: {
        width: '74vw',
        padding: theme.spacing(2),
    }
}));

const ListPage = ({list, removeJoke, clearAllJokes}) => {
    const classes = useStyles();

    const handleRemoveJoke = (event) => {
        const jokeId = event.target.getAttribute("data-id");
        removeJoke(jokeId, list);
    };

    return (
        <>
            {list.length > 0 ? (
                <>
                    <Paper className={classes.paper}>
                        <Grid container
                              direction="row"
                              justify="space-around"
                              alignItems="center" spacing={3}>
                            {list.map(item => {
                                return (
                                    <Grid item xs={12} sm={4} key={item.id}>
                                        <Paper className={classes.paper}>
                                            <span >{item.value}</span>
                                            <Button
                                                onClick={handleRemoveJoke}
                                                data-id={item.id}
                                            >
                                                del
                                            </Button>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Button onClick={clearAllJokes} variant="contained" color="secondary">clear all</Button>
                    </Paper>

                </>
            ) : (
                <Typography>
                    Your favorite list is empty
                </Typography>
            )}
        </>
    );
};

export default ListPage;