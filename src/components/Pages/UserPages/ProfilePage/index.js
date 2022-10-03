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
import {useTranslation} from "react-i18next";

const ProfilePage = () => {
    const {t} = useTranslation();
    const user = useSelector(getCurrentUserSelector);
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>{t("pages.profile.title")}</Typography>
                <Box className={classes.userAccessArea}>
                    <Box>
                        <Typography
                            className={classes.userAccessAreaItem}
                        >{t("forms.labels.name") + ": " + user.name}</Typography>
                        <Typography
                            className={classes.userAccessAreaItem}
                            color={user.emailChecked ? 'green' : 'red'}
                        >{t("forms.labels.email") + ": " + user.email}</Typography>
                    </Box>
                    <Box>
                        <ResetPasswordDialog/>
                    </Box>
                </Box>
                <Box>
                    {user.isPasswordTemporary &&
                    <Alert
                        severity='warning'
                    >{t("alerts.temporaryPassword")}</Alert>}
                    {!user.emailChecked &&
                    <Alert severity='error'>{t("alerts.emailUnverified")}</Alert>}
                </Box>
            </Box>
        </Page>
    )
};

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(ProfilePage);