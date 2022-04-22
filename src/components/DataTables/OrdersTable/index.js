import * as React from 'react';
import {useEffect} from 'react';
import {addOrder, deleteOrder, getOrders, updateOrder} from "../../../store/actions/orders";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersSelector} from "../../../store/selectors/ordersSelector";
import DataTable from "../DataTable";
import OrderForm from "../../Forms/OrderForm";

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
        field: 'clockType', headerName: 'Тип часов', width: 80,
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

    const orders = useSelector(getOrdersSelector);

    return (
        <DataTable
            rows={orders}
            columns={columns}
            onRowDelete={deleteOrder}
            onRowUpdate={updateOrder}
            onRowAdd={addOrder}
            formId='order-form'
            ModelForm={OrderForm}
            additionalFormDialogProps={{
                hideDialogActions: true
            }}
        />
    );
}

export default OrdersTable;