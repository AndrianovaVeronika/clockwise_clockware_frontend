import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../../../store/selectors/authSelector";
import {Box, Typography} from "@mui/material";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import Page from "../../../../styles/Page";
import useStyles from "../../../../styles/useStyles";

const ProfilePage = () => {
    const user = useSelector(getCurrentUserSelector);
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography>Username: {user.username}</Typography>
                <Typography>Email: {user.email}</Typography>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(ProfilePage);