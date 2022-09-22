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
import ResetPasswordDialog from "../../../Dialogs/ResetPasswordDialog";

const ProfilePage = () => {
    const user = useSelector(getCurrentUserSelector);
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography>Name: {user.name}</Typography>
                <Typography color={user.emailChecked ? 'green' : 'red'}>Email: {user.email}</Typography>
                {user.isPasswordTemporary &&
                <Alert severity='warning'>Temporary password. Please change it on your own one for safety
                    reasons!</Alert>}
                {!user.emailChecked &&
                <Alert severity='error'>Email unverified. Check your postbox for confirmation letter.</Alert>}
                <ResetPasswordDialog/>
            </Box>
        </Page>
    )
};

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(ProfilePage);