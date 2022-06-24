import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import UsersTable from "../../../DataTables/UsersTable";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";
import Page from "../../../../styles/Page";
import {Box} from "@mui/material";
import useStyles from "../../../../styles/useStyles";

const AdminUsersPage = () => {
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <UsersTable/>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminUsersPage);