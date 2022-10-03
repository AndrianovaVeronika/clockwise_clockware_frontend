import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import OrdersTable from '../../../DataTables/OrdersTable';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";
import useStyles from "../../../../styles/useStyles";
import Page from "../../../../styles/Page";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const AdminOrdersPage = () => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>{t("pages.orders.title")}</Typography>
                <OrdersTable/>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminOrdersPage);