import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import CitiesTable from "../../../DataTables/CitiesTable";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";
import {compose} from "redux";
import useStyles from "../../../../styles/useStyles";
import Page from "../../../../styles/Page";
import {Box, Typography} from "@mui/material";

const AdminCitiesPage = () => {
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>Cities table</Typography>
                <CitiesTable/>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminCitiesPage);