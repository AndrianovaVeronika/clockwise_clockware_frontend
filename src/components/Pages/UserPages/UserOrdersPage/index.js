import useStyles from "../../../../styles/useStyles";
import Page from "../../../../styles/Page";
import {Box, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import orders from "../../../../store/actions/orders";
import {getCurrentUserOrdersSelector} from "../../../../store/selectors/ordersSelector";
import {compose} from "redux";
import {withHeader} from "../../../../functions/withHeader";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import RateOrderForm from "../../../Forms/UserForms/RateOrderForm";
import {useTranslation} from "react-i18next";

function renderStatus({value}) {
    const color = value ? 'green' : 'red';
    const text = value ? 'Completed' : 'Not completed';
    return <Typography sx={{color: color}}>{text}</Typography>;
}

function renderButtonRateOrder({value}) {
    return <RateOrderForm {...value}/>;
}

const UserOrdersPage = () => {
    const {t} = useTranslation();

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 50
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
            field: 'master', headerName: t("forms.labels.master"), width: 90,
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
            field: 'rateOrder',
            headerName: t("forms.labels.rateOrder"),
            width: 150,
            renderCell: renderButtonRateOrder,
            type: 'boolean',
            valueGetter: ({row}) => row,
        }
    ];

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orders.getCurrentUserOrders());
    }, [dispatch]);

    const currentUserOrders = useSelector(getCurrentUserOrdersSelector);

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Typography variant='h5' gutterBottom>{t("pages.userOrders.title")}</Typography>
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

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(UserOrdersPage);