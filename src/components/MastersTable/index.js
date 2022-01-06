import * as React from 'react';
import DataTable from "../DataTable";

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
    return (
        <DataTable
            columns={columns}
            queryLink={'/masters'}
        />
    );
}

export default MastersTable;