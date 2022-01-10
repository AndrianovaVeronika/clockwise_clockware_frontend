import * as React from 'react';
import DataTable from "../DataTable";
import {useEffect} from "react";
import store from "../../store/store";
import {getOrders} from "../../store/actions";
import {useSelector} from "react-redux";
import {getOrdersSelector} from "../../store/selectors/ordersSelector";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Имя', width: 100
    },
    {
        field: 'rating', headerName: 'Рейтинг', width: 100,
    },
];

const MastersTable = () => {
    useEffect(() => {
        store.dispatch(getOrders());
    }, [])

    const rows = useSelector(getOrdersSelector);

    return (
        <DataTable
            columns={columns}
            rows={rows}
            queryLink={'/masters'}
        />
    );
}

export default MastersTable;