import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {isAuthUserSelector} from "../../../store/selectors/authSelector";

const useStyles = makeStyles(() => ({
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
}));

export default function Header() {
    const isAuth = useSelector(isAuthUserSelector);

    const navigate = useNavigate();

    const styles = useStyles();

    return (
        <header>
            <AppBar style={{
                backgroundColor: "#2b2b2b",
                paddingRight: "79px",
                paddingLeft: "118px"
            }}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <Typography variant="h6" component="h1">
                        Clockwise Clockware
                    </Typography>
                    <div>
                        <Button
                            onClick={() => {
                                navigate('/');
                            }}
                            color='inherit'
                            className='menu-button'
                        >Главная</Button>
                        {!isAuth && <Button
                            onClick={() => {
                                navigate('/login');
                            }}
                            color='inherit'
                            className='menu-button'
                        >Войти</Button>}
                        {!isAuth && <Button
                            onClick={() => {
                                navigate('/signup');
                            }}
                            color='inherit'
                            className='menu-button'
                        >Регистрация</Button>}
                        {isAuth && <Button
                            onClick={() => {
                                navigate('/profile');
                            }}
                            color='inherit'
                            className='menu-button'
                        >Кабинет</Button>}
                    </div>
                </Toolbar>
            </AppBar>
        </header>
    );
}