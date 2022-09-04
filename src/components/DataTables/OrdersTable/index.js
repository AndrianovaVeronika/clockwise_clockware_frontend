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

function renderStatus({value}) {
    return <Typography sx={{color: value ? 'green' : 'red'}}>{value ? 'Completed' : 'Not completed'}</Typography>;
}

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Name', width: 150
    },
    {
        field: 'email', headerName: 'Mail', width: 200,
    },
    {
        field: 'clockType', headerName: 'Clock size', width: 80,
    },
    {
        field: 'city', headerName: 'City', width: 80,
    },
    {
        field: 'date', headerName: 'Date', width: 200,
    },
    {
        field: 'time', headerName: 'Time', width: 150,
    },
    {
        field: 'master', headerName: 'Master', width: 90,
    },
    {
        field: 'price', headerName: 'Price', width: 80,
    },
    {
        field: 'isCompleted',
        headerName: 'Status',
        width: 80,
        renderCell: renderStatus,
        type: 'boolean'
    },
];

const OrdersTable = () => {
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