import * as React from 'react';
import {useEffect, useState} from 'react';
import DataTable from "../DataTable";
import AdminOrderForm from "../../Forms/AdminForms/AdminOrderForm";
import orders from "../../../store/actions/orders";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import OrdersFiltrationForm from "../../Forms/FiltrationForms/OrdersFiltrationForm";
import {getAllOrders} from "../../../store/getters/orders";

function renderStatus({value}, t) {
    const color = value ? 'green' : 'red';
    const text = value ? t("statusCompleted.true") : t("statusCompleted.false");
    return <Typography color={color}>{text}</Typography>;
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

    const [rows, setRows] = useState([]);
    useEffect(async () => {
        setRows(await getAllOrders());
    }, []);

    const filtrate = async filters => setRows(await getAllOrders(filters));

    return (<>
        <OrdersFiltrationForm
            filtrate={filtrate}
        />
        <DataTable
            rows={rows}
            columns={columns}
            actions={orders}
            objType={'orders'}
            ModelForm={AdminOrderForm}
        />
    </>);
}

export default React.memo(OrdersTable);