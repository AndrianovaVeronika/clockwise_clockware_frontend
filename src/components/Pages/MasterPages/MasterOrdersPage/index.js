import {Box, Button, Typography} from "@mui/material";
import useStyles from "../../../../styles/useStyles";
import React, {useEffect, useState} from "react";
import orders from "../../../../store/actions/orders";
import Page from "../../../../styles/Page";
import {DataGrid, ukUA} from "@mui/x-data-grid";
import {compose} from "redux";
import {withHeader} from "../../../../functions/withHeader";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withRedirectIfNotMaster from "../../../../functions/withRedirectIfNotMaster";
import store from "../../../../store/store";
import {useTranslation} from "react-i18next";
import MasterOrdersFiltrationForm from "../../../Forms/FiltrationForms/MasterOrdersFiltrationForm";
import {getCurrentMasterOrders} from "../../../../store/getters/orders";

function renderStatus({value}, t) {
    const color = value ? 'green' : 'red';
    const text = value ? t("statusCompleted.true") : t("statusCompleted.false");
    return <Typography color={color}>{text}</Typography>;
}

function renderCompleteButton({id, row}, t) {
    return <Button
        disabled={row.isCompleted}
        onClick={() => store.dispatch(orders.updateMasterOrderById({id, isCompleted: !row.isCompleted}))}
    >{t("pages.masterOrders.completeButton")}</Button>
}

const MasterOrdersPage = () => {
    const classes = useStyles();
    const {t, i18n} = useTranslation();

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
            field: 'clockType', headerName: t("forms.labels.clockType"), width: 100,
            renderCell: ({value}) => t(`clockTypes.${value}`)
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
            renderCell: value => renderStatus(value, t),
            type: 'boolean'
        },
        {
            field: 'complete',
            headerName: '',
            width: 150,
            renderCell: value => renderCompleteButton(value, t),
            type: 'boolean'
        }
    ];

    const [rows, setRows] = useState([]);
    useEffect(async () => {
        setRows(await getCurrentMasterOrders());
    }, []);

    const filtrate = async filters => setRows(await getCurrentMasterOrders(filters));

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>{t("pages.masterOrders.title")}</Typography>
                <MasterOrdersFiltrationForm filtrate={filtrate}/>
                <Box className={classes.dataTable}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        localeText={i18n.language === 'ua' ? ukUA.components.MuiDataGrid.defaultProps.localeText : undefined}
                    />
                </Box>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotMaster)(MasterOrdersPage);