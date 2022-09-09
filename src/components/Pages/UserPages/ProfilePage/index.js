import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../../../store/selectors/authSelector";
import {Alert, Box, Button, Typography} from "@mui/material";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import Page from "../../../../styles/Page";
import useStyles from "../../../../styles/useStyles";
import PopupDialog from "../../../Dialogs/PopupDialog";
import ResetPasswordForm from "../../../Forms/UserForms/ResetPasswordForm";

const ProfilePage = () => {
    const user = useSelector(getCurrentUserSelector);
    const classes = useStyles();
    console.log('profile page')
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
                <PopupDialog
                    openButtonText='Reset password'
                    dialogTitleText='Enter new password and confirm'
                    Content={<ResetPasswordForm/>}
                    Actions={<Button type='submit' form='reset-password-form'>Confirm</Button>}
                />
            </Box>
        </Page>
    )
};

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(ProfilePage);