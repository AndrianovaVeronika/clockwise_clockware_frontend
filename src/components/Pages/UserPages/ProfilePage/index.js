import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../../../store/selectors/authSelector";
import {Alert, Box, Typography} from "@mui/material";
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
                <Typography color={user.emailChecked? 'green':'red'}>Email: {user.email}</Typography>
                {!user.emailChecked && <Alert severity='error'>Email unverified. Check your postbox for confirmation letter.</Alert>}
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(ProfilePage);