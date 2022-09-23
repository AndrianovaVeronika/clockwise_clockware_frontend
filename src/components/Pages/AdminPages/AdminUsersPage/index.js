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

const AdminUsersPage = () => {
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>Users table</Typography>
                <UsersTable/>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminUsersPage);