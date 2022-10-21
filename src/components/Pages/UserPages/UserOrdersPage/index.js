import useStyles from "../../../../styles/useStyles";
import Page from "../../../../styles/Page";
import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {DataGrid, ukUA} from "@mui/x-data-grid";
import {compose} from "redux";
import {withHeader} from "../../../../functions/withHeader";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import RateOrderForm from "../../../Forms/UserForms/RateOrderForm";
import {useTranslation} from "react-i18next";
import UserOrdersFiltrationForm from "../../../Forms/FiltrationForms/UserOrdersFiltrationForm";
import {getCurrentUserOrders} from "../../../../store/getters/orders";

function renderStatus({value}, t) {
    const color = value ? 'green' : 'red';
    const text = value ? t("statusCompleted.true") : t("statusCompleted.false");
    return <Typography color={color}>{text}</Typography>;
}

function renderButtonRateOrder({value}) {
    return <RateOrderForm {...value}/>;
}

const UserOrdersPage = () => {
    const classes = useStyles();
    const {t, i18n} = useTranslation();

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 50
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
            field: 'master', headerName: t("forms.labels.master"), width: 90,
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
            field: 'rateOrder',
            headerName: t("forms.labels.rateOrder"),
            width: 150,
            renderCell: renderButtonRateOrder,
            type: 'boolean',
            valueGetter: ({row}) => row,
        }
    ];

    const [rows, setRows] = useState([]);
    useEffect(async () => {
        setRows(await getCurrentUserOrders());
    }, []);

    const filtrate = async filters => setRows(await getCurrentUserOrders(filters));

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>{t("pages.userOrders.title")}</Typography>
                <UserOrdersFiltrationForm filtrate={filtrate}/>
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
};

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(UserOrdersPage);