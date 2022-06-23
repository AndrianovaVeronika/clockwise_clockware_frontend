import React from 'react'
import Header from '../components/PageComponents/Header';
import useStyles from "../styles/useStyles";

export const withHeader = (Component) => (props) => {
    const classes = useStyles();

    return (
        <>
            <Header/>
            <Component style={classes.container} {...props} />
        </>
    )
}