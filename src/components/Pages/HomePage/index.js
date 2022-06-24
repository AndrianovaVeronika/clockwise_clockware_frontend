import React from 'react';
import {compose} from "redux";
import {withHeader} from "../../../functions/withHeader";
import {Box, Container, Typography, Link} from "@mui/material";
import useStyles from "../../../styles/useStyles";
import {homePageText} from "../../../static/texts";
import Page from "../../../styles/Page";
import {useNavigate} from "react-router";

const HomePage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Page>
            <Container fixed className={classes.homePageContent}>
                <Box className={classes.homePageText}>
                    <Typography>{homePageText}</Typography>
                    <Link className={classes.link} onClick={() => navigate('/add/order')}>Place order now</Link>
                </Box>
                <Box className={classes.homePageImageContainer}>
                    <Box className={classes.homePageImage}/>
                </Box>
            </Container>
        </Page>
    )
}

export default compose(withHeader)(HomePage);