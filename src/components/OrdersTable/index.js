import * as React from 'react';
import DataTable from "../DataTable";
import {useEffect} from "react";
import {getOrders} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersSelector} from "../../store/selectors/ordersSelector";
import OrderForm from "../OrderFormDialog";
import './style.css';

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'client_name', headerName: 'Имя', width: 150
    },
    {
        field: 'login', headerName: 'Логин', width: 200,
    },
    {
        field: 'clock_type', headerName: 'Тип часов', width: 80,
    },
    {
        field: 'city', headerName: 'Город', width: 80,
    },
    {
        field: 'date', headerName: 'Дата', width: 200,
    },
    {
        field: 'time', headerName: 'Время', width: 150,
    },
    {
        field: 'master_name', headerName: 'Мастер', width: 90,
    },
];

const OrdersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch])

    const rows = useSelector(getOrdersSelector);

    return (
        <>
            <DataTable
                columns={columns}
                rows={rows}
            />
            <OrderForm openButtonOnClickText={'Добавить заказ'}/>
        </>
    );
}

export default OrdersTable;