import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrdersSelector} from "../../../store/selectors/ordersSelector";
import DataTable from "../DataTable";
import AdminOrderForm from "../../Forms/AdminForms/AdminOrderForm";
import {getClockTypes} from "../../../store/actions/clockTypes";
import cities from "../../../store/actions/cities";
import masters from "../../../store/actions/masters";
import orders from "../../../store/actions/orders";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

function renderStatus({value}) {
    return <Typography sx={{color: value ? 'green' : 'red'}}>{value ? 'Completed' : 'Not completed'}</Typography>;
}

const OrdersTable = () => {
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
            field: 'clockType', headerName: t("forms.labels.clockType"), width: 100,
            renderCell: ({value}) => t("clockTypes." + value)
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
            renderCell: renderStatus,
            type: 'boolean'
        },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orders.getAll());
        dispatch(cities.getAll());
        dispatch(getClockTypes());
        dispatch(masters.getAll());
    }, [dispatch]);

    const rows = useSelector(getOrdersSelector);

    return (
        <DataTable
            rows={rows}
            columns={columns}
            actions={orders}
            objType={'orders'}
            ModelForm={AdminOrderForm}
        />
    );
}

export default React.memo(OrdersTable);