import React, {Suspense, useEffect, useState} from 'react';

// Styles
import './App.css';
import {Redirect, Route, Switch} from "react-router";
import {CircularProgress} from "@material-ui/core";
import {MainLayout} from "./components/MainLayout";

// Containers

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const ListPage = React.lazy(() => import('./pages/ListPage/ListPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage/ErrorPage'));


const App = () => {
    const [list, setList] = useState([]);
    const [joke, setJoke] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [generationTimerId, setGenerationTimerId] = useState(null);

    useEffect(() => {
        let listJokes = JSON.parse(localStorage.getItem("listJokes"));
        listJokes = Array.isArray(listJokes) ? listJokes : [];
        setList(listJokes);
    }, []);

    const getJoke = () => {
        setIsSending(true);
        fetch("https://api.chucknorris.io/jokes/random")
            .then(response => response.json())
            .then(addPropertyIsFavorite)
            .then(setJoke)
            .then(() => setIsSending(false))
            .catch(console.log);
    };

    const addPropertyIsFavorite = joke => {
        joke.isFavorite = isFavoritJoke(joke, list);
        return joke;
    };

    const continuousGenerationJokes = () => {
        getJoke();
        setGenerationTimerId(setInterval(getJoke, 3000));
    };

    const stopGenerationJokes = () => {
        // ну и интервал понятно, что в useEffect нужно очищать
        clearInterval(generationTimerId);
        setGenerationTimerId(null);
    };

    const isFavoritJoke = (joke, list) => {
        if (joke) {
            const currentJoke = list.find(item => item.id === joke.id);
            return !!currentJoke;
        }

        return false;
    };

    const addJoke = (joke, list) => {
        if (joke && !joke.isFavorite) {
            joke.isFavorite = true;
            if (list.length >= 10) {
                list.splice(0, 1);
            }
            list.push(joke);
            setJoke({...joke});
            setList([...list]);
            saveListInLS(list);
        }
    };

    const removeJoke = (id, list) => {
        if (joke && joke.id === id) {
            joke.isFavorite = false;
            setJoke({...joke});
        }
        const updatedList = list.filter(item => item.id !== id);
        setList(updatedList);
        saveListInLS(updatedList);
    };

    const clearAllJokes = () => {
        if (joke && joke.isFavorite) {
            joke.isFavorite = false;
            setJoke({...joke});
        }
        setList([]);
        saveListInLS([]);
    };

    const saveListInLS = (list) => {
        localStorage.setItem("listJokes", JSON.stringify(list));
    };
    return (
        <>
            <MainLayout>
                <Suspense fallback={<CircularProgress/>}>
                    <Switch>
                        <Route path="/" exact>
                            <HomePage joke={joke}
                                      list={list}
                                      isSending={isSending}
                                      generationTimerId={generationTimerId}
                                      getJoke={getJoke}
                                      addJoke={addJoke}
                                      removeJoke={removeJoke}
                                      isFavoritJoke={isFavoritJoke}
                                      continuousGenerationJokes={continuousGenerationJokes}
                                      stopGenerationJokes={stopGenerationJokes}/>
                        </Route>
                        <Route path="/favoriteList" exact>
                            <ListPage removeJoke={removeJoke}
                                      list={list}
                                      clearAllJokes={clearAllJokes}/>
                        </Route>
                        <Redirect from="**" to="/error">
                            <ErrorPage/>
                        </Redirect>
                    </Switch>
                </Suspense>
            </MainLayout>

        </>

    );
}

export default App;
