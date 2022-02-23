import * as React from 'react';
import {useEffect} from 'react';
import {getOrders} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersSelector} from "../../../store/selectors/ordersSelector";
import DataTable from "../DataTable";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'username', headerName: 'Имя', width: 150
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

    const orders = useSelector(getOrdersSelector).map(order => {
        return {
            id: order.id,
            username: order.user.username,
            email: order.user.email,
            clock_type: order.clock_type.name,
            city: order.city.name,
            date: order.date,
            time: order.time,
            master: order.master.name
        }
    });
    console.log(orders)

    return (
        <DataTable
            rows={orders}
            columns={columns}
        />
    );
}

export default OrdersTable;