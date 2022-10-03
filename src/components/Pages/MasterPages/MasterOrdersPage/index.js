import {Box, Button, Typography} from "@mui/material";
import useStyles from "../../../../styles/useStyles";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import orders from "../../../../store/actions/orders";
import {getCurrentMasterOrdersSelector} from "../../../../store/selectors/ordersSelector";
import Page from "../../../../styles/Page";
import {DataGrid} from "@mui/x-data-grid";
import {compose} from "redux";
import {withHeader} from "../../../../functions/withHeader";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withRedirectIfNotMaster from "../../../../functions/withRedirectIfNotMaster";
import store from "../../../../store/store";
import {useTranslation} from "react-i18next";

function renderStatus({value}) {
    const color = value ? 'green' : 'red';
    const text = value ? 'Completed' : 'Not completed';

    return <Typography color={color}>{text}</Typography>;
}

function renderCompleteButton({id, row}) {
    return <Button
        disabled={row.isCompleted}
        onClick={() => store.dispatch(orders.updateMasterOrderById({id, isCompleted: !row.isCompleted}))}
    >Complete</Button>
}

const MasterOrdersPage = () => {
    const {t} = useTranslation();

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 50
        },
        {
            field: 'name', headerName: t("forms.labels.name"), width: 150
        },
        {
            field: 'email', headerName: t("forms.labels.email"), width: 200,
        },
        {
            field: 'clockType', headerName: t("forms.labels.clockType"), width: 80,
        },
        {
            field: 'city', headerName: t("forms.labels.city"), width: 80,
        },
        {
            field: 'date', headerName: t("forms.labels.date"), width: 150,
        },
        {
            field: 'time', headerName: t("forms.labels.time"), width: 120,
        },
        {
            field: 'price', headerName: t("forms.labels.price"), width: 80,
        },
        {
            field: 'isCompleted',
            headerName: t("forms.labels.status"),
            width: 150,
            renderCell: renderStatus,
            type: 'boolean'
        },
        {
            field: 'complete',
            headerName: '',
            width: 150,
            renderCell: renderCompleteButton,
            type: 'boolean'
        }
    ];

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orders.getCurrentMasterOrders());
    }, [dispatch]);

    const currentUserOrders = useSelector(getCurrentMasterOrdersSelector);

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>{t("pages.masterOrders.title")}</Typography>
                <Box className={classes.dataTable}>
                    <DataGrid
                        rows={currentUserOrders}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </Box>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotMaster)(MasterOrdersPage);