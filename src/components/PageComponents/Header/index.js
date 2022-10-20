import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {isAuthUserSelector} from "../../../store/selectors/authSelector";
import useStyles from "../../../styles/useStyles";
import {useTranslation} from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';

const languages = {
    english: 'en',
    ukrainian: 'ua'
};

export default function Header() {
    const isAuth = useSelector(isAuthUserSelector);
    const navigate = useNavigate();
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const [currLanguage, setCurrLanguage] = useState(i18n.language);

    const setLanguageEnglish = () => {
        i18n.changeLanguage(languages.english);
        setCurrLanguage(languages.english);
    };

    const setLanguageUkrainian = () => {
        i18n.changeLanguage(languages.ukrainian);
        setCurrLanguage(languages.ukrainian);
    };

    const setLanguage = () => {
        if (currLanguage === languages.english) {
            setLanguageUkrainian();
        } else {
            setLanguageEnglish();
        }
    };

    return (
        <AppBar position='fixed' className={classes.header}>
            <Container fixed>
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        component="h1"
                    >Clockwise Clockware</Typography>
                    <Box mr={2}>
                        <Button
                            startIcon={<LanguageIcon/>}
                            onClick={setLanguage}
                            color='inherit'
                            className={classes.menuButton}
                        >{currLanguage.toUpperCase()}</Button>
                    </Box>
                    <Box mr={2}>
                        <Button
                            onClick={() => {
                                navigate('/');
                            }}
                            color='inherit'
                            className={classes.menuButton}
                        >{t("header.homePageButton")}</Button>
                    </Box>
                    {!isAuth && <Box mr={2}><Button
                        onClick={() => {
                            navigate('/login');
                        }}
                        className={classes.menuButton}
                        variant='contained'
                        color='secondary'
                    >{t("header.signInButton")}</Button></Box>}
                    {!isAuth && <Button
                        onClick={() => {
                            navigate('/signup');
                        }}
                        className={classes.menuButton}
                        variant='outlined'
                        color='secondary'
                    >{t("header.signUpButton")}</Button>}
                    {isAuth && <Button
                        onClick={() => {
                            navigate('/profile');
                        }}
                        color='inherit'
                        className={classes.menuButton}
                    >{t("header.profileButton")}</Button>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}