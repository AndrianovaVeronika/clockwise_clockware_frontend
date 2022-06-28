import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {withHeader} from "../../../functions/withHeader";
import {Box, Container, Link, Typography} from "@mui/material";
import useStyles from "../../../styles/useStyles";
import {homePageText} from "../../../static/texts";
import Page from "../../../styles/Page";
import {useNavigate} from "react-router";
import OrderForm from "../../Forms/OrderForm";

const HomePage = () => {
    const classes = useStyles();
    const [isOrderLinkPressed, setOrderLinkPressed] = useState(false);

    const onOrderLinkPressed = () => {
        setOrderLinkPressed(true);
    }

    useEffect(() => {
        setOrderLinkPressed(false);
    }, []);

    return (
        <Page>
            <Container fixed className={classes.homePageContent}>
                <Box className={classes.homePageText}>
                    <Typography>{homePageText}</Typography>
                    {!isOrderLinkPressed && <Link onClick={onOrderLinkPressed}>Order now</Link>}
                </Box>
                <Box className={classes.homePageImageContainer}>
                    <Box className={classes.homePageImage}/>
                </Box>
                {isOrderLinkPressed && <OrderForm/>}
            </Container>
        </Page>
    )
}

export default compose(withHeader)(HomePage);