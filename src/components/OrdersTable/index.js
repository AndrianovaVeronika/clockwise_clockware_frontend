import * as React from 'react';
import DataTable from "../DataTable";
import {useEffect} from "react";
import store from "../../store/store";
import {getOrders} from "../../store/actions";
import {useSelector} from "react-redux";
import {getOrdersSelector} from "../../store/selectors/ordersSelector";
import OrderForm from "../OrderForm";
import './style.css';

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'client_name', headerName: 'Имя', width: 100
    },
    {
        field: 'login', headerName: 'Логин', width: 130,
    },
    {
        field: 'clock_type', headerName: 'Тип часов', width: 100,
    },
    {
        field: 'city', headerName: 'Город', width: 80,
    },
    {
        field: 'datetime', headerName: 'Время', width: 200,
    },
    {
        field: 'master_name', headerName: 'Мастер', width: 90,
    },
];

const OrdersTable = () => {
    useEffect(() => {
        store.dispatch(getOrders());
    }, [])

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