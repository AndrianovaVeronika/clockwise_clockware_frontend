import React from 'react';
import {compose} from "redux";
import {withHeader} from "../../../functions/withHeader";
import {Box, Container, Typography} from "@mui/material";
import useStyles from "../../../styles/useStyles";
import Page from "../../../styles/Page";
import OrderForm from "../../Forms/UserForms/OrderForm";
import {useTranslation} from "react-i18next";

const HomePage = () => {
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Page>
            <Container fixed className={classes.homePageContent}>
                <Box className={classes.homePageText}>
                    <Typography>{t("pages.home.introduction")}</Typography>
                </Box>
                <Box className={classes.homePageImageContainer}>
                    <Box className={classes.homePageImage}/>
                </Box>
                <OrderForm/>
            </Container>
        </Page>
    )
}

export default compose(withHeader)(HomePage);