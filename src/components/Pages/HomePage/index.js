import React from 'react';
import {compose} from "redux";
import {withHeader} from "../../../functions/withHeader";
import {Box, Container, Typography} from "@mui/material";
import useStyles from "../../../styles/useStyles";
import {homePageText} from "../../../static/texts";
import Page from "../../../styles/Page";
import OrderForm from "../../Forms/UserForms/OrderForm";

const HomePage = () => {
    const classes = useStyles();

    return (
        <Page>
            <Container fixed className={classes.homePageContent}>
                <Box className={classes.homePageText}>
                    <Typography>{homePageText}</Typography>
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