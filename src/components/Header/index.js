import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React from "react";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#fff",
        paddingRight: "79px",
        paddingLeft: "118px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
}));

export default function Header() {

    const styles = useStyles();

    return (
        <header>
            <AppBar className={styles.header}>
                <Toolbar className={styles.toolbar}>
                    <Typography variant="h6" component="h1">
                        Clockwise Clockware
                    </Typography>
                    <div>
                        <Button
                            {...{
                                color: 'inherit',
                                to: '/',
                                component: RouterLink,
                                className: 'menu-button'
                            }}
                        >Главная</Button>
                        <Button
                            {...{
                                color: 'inherit',
                                to: '/admin',
                                component: RouterLink,
                                className: 'menu-button'
                            }}
                        >Войти</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </header>
    )
        ;
}