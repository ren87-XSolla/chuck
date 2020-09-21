import React from "react";

import {Link} from "react-router-dom";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListIcon from '@material-ui/icons/List';
import {useLocation} from "react-router";


export const CustomLink = () => {
    const {pathname} = useLocation();

    return <nav className="nav">{
        pathname === "/" ? (
            <Link to="/favoriteList">
                <ListIcon/>
            </Link>
        ) : (<Link to="/">
            <ArrowBackIosIcon fontSize="large"/>
        </Link>)
    }</nav>;
};

