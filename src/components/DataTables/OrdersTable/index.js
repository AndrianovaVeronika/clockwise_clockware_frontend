import * as React from 'react';
import DataTable from "../DataTable";
import {useEffect} from "react";
import {getOrders} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersSelector} from "../../../store/selectors/ordersSelector";
import OrderForm from "../../Forms/OrderForm";
import './style.css';

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'user', headerName: 'Имя', width: 150
    },
    {
        field: 'email', headerName: 'Почта', width: 200,
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
        field: 'master', headerName: 'Мастер', width: 90,
    },
];

const OrdersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch])

    const orders= useSelector(getOrdersSelector);

    const getRows = () => {
        const rows = [];
        for (const order of orders) {
            rows.push({
                ...order,
                user: order.user.username,
                email: order.user.email,
                clock_type: order.clock_type.name,
                city: order.city.name,
                master: order.master.name
            });
        }
        return rows;
    }

    const rows = getRows();

    return (
        <>
            <DataTable
                columns={columns}
                rows={rows}
            />
        </>
    );
}

export default OrdersTable;