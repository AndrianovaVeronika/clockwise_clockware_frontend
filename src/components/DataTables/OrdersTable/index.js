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

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'username', headerName: 'Name', width: 150
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