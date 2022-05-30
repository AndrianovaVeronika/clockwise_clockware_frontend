import * as React from 'react';
import {useEffect} from 'react';
import {addOrder, deleteOrder, getOrders, updateOrder} from "../../../store/actions/orders";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersSelector} from "../../../store/selectors/ordersSelector";
import DataTable from "../DataTable";
import OrderFormDialog from "../../Dialogs/OrderFormDialog";

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
        dispatch(getOrders());
    }, [dispatch]);

    const orders = useSelector(getOrdersSelector);

    return (
        <DataTable
            rows={orders}
            columns={columns}
            onRowDelete={deleteOrder}
            onRowUpdate={updateOrder}
            onRowAdd={addOrder}
            formId='order-form'
            ModelDialog={OrderFormDialog}
        />
    );
}

export default React.memo(OrdersTable);