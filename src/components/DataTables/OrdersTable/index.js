import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFilteredOrdersSelector} from "../../../store/selectors/ordersSelector";
import DataTable from "../DataTable";
import AdminOrderForm from "../../Forms/AdminForms/AdminOrderForm";
import {getClockTypes} from "../../../store/actions/clockTypes";
import cities from "../../../store/actions/cities";
import masters from "../../../store/actions/masters";
import orders from "../../../store/actions/orders";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import useStyles from "../../../styles/useStyles";
import OrdersFiltrationForm from "../../Forms/FiltrationForms/OrdersFiltrationForm";
import users from "../../../store/actions/users";

function renderStatus({value}, t) {
    const color = value ? 'green' : 'red';
    const text = value ? t("statusCompleted.true") : t("statusCompleted.false");
    return <Typography color={color}>{text}</Typography>;
}

const OrdersTable = () => {
    const {t} = useTranslation();
    const classes = useStyles();

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
            field: 'date', headerName: t("forms.labels.date"), width: 200,
        },
        {
            field: 'time', headerName: t("forms.labels.time"), width: 150,
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
            width: 120,
            renderCell: value => renderStatus(value, t),
            type: 'boolean'
        },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orders.getAll());
        dispatch(orders.getFiltered())
        dispatch(cities.getAll());
        dispatch(getClockTypes());
        dispatch(masters.getAll());
        dispatch(users.getAll());
    }, [dispatch]);

    const filteredOrders = useSelector(getFilteredOrdersSelector);

    return (<Box sx={{
        // display: 'flex',
        // flexDirection: 'row'
    }}>
        <OrdersFiltrationForm/>
        <DataTable
            rows={filteredOrders}
            columns={columns}
            actions={orders}
            objType={'orders'}
            ModelForm={AdminOrderForm}
        />
    </Box>);
}

export default React.memo(OrdersTable);