import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {isAuthUserSelector} from "../../../store/selectors/authSelector";
import useStyles from "../../../styles/useStyles";


export default function Header() {
    const isAuth = useSelector(isAuthUserSelector);
    const navigate = useNavigate();
    const classes = useStyles();

    return (
        <AppBar position='relative' className={classes.header}>
            <Container fixed>
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        component="h1"
                    >Clockwise Clockware</Typography>
                    <Box mr={2}>
                        <Button
                            onClick={() => {
                                navigate('/');
                            }}
                            color='inherit'
                            className={classes.menuButton}
                        >Home</Button>
                    </Box>
                    {!isAuth && <Box mr={2}><Button
                        onClick={() => {
                            navigate('/login');
                        }}
                        className={classes.menuButton}
                        variant='contained'
                        color='secondary'
                    >Sign in</Button></Box>}
                    {!isAuth && <Button
                        onClick={() => {
                            navigate('/signup');
                        }}
                        className={classes.menuButton}
                        variant='outlined'
                        color='secondary'
                    >Sign up</Button>}
                    {isAuth && <Button
                        onClick={() => {
                            navigate('/profile');
                        }}
                        color='inherit'
                        className={classes.menuButton}
                    >Profile</Button>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}