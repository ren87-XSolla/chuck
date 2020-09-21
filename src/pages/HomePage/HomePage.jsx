import React from 'react';
import Button from "@material-ui/core/Button";
import {JokeCard} from "../../components/JokeCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        padding: theme.spacing(2),
    },
    buttonDefault: {
        marginRight: 16
    }
}));

const HomePage = ({
                      joke,
                      list,
                      isSending,
                      generationTimerId,
                      getJoke,
                      addJoke,
                      removeJoke,
                      isFavoritJoke,
                      continuousGenerationJokes,
                      stopGenerationJokes
                  }) => {
    const classes = useStyles();

    const handleDeleteAdd = () => {
        isFavoritJoke(joke, list) ? removeJoke(joke.id, list) : addJoke(joke, list);
    };

    const handleJokeGenerate = () => {
        generationTimerId ? stopGenerationJokes() : continuousGenerationJokes();
    };

    return (
        <div className={classes.main}>

            <JokeCard joke={joke} isSending={isSending}/>
            <Button onClick={getJoke} color="primary" variant="contained" className={classes.buttonDefault}>
                get joke
            </Button>
            <Button onClick={handleJokeGenerate} color="primary" variant="contained" className={classes.buttonDefault}>
                {generationTimerId ? "stop" : "get jokes steam"}
            </Button>
            <Button
                disabled={!joke}
                onClick={handleDeleteAdd}
                color="primary"
                variant="contained"
            >
                {isFavoritJoke(joke, list) ? "delete from FavoriteList" : "add to FavoriteList"}
            </Button>
        </div>
    );
};

export default HomePage;