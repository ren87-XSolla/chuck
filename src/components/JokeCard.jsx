import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    jokeText: {
        marginBottom: 16
    }
}));

export const JokeCard = ({ joke, isSending }) => {
    const classes = useStyles();
    const renderJoke = () => {
        return joke ? (
            <Typography variant="h3" color="primary" className={classes.jokeText} >{joke.value}</Typography>
        ) : (
            <Typography className={classes.jokeText} >Сlick on one of the buttons</Typography>
        );
    };

    return (
        <div className="joke-block">
            {isSending ? <CircularProgress /> : renderJoke()}
        </div>
    );
};
