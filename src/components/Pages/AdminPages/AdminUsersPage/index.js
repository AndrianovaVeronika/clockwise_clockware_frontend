import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import UsersTable from "../../../DataTables/UsersTable";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";
import Page from "../../../../styles/Page";
import {Box, Typography} from "@mui/material";
import useStyles from "../../../../styles/useStyles";
import {useTranslation} from "react-i18next";

const AdminUsersPage = () => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>{t("pages.users.title")}</Typography>
                <UsersTable/>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminUsersPage);