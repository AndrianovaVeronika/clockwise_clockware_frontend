import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import instance from "../../store/middleware/api";
import {useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 90},
    {
        field: 'login',
        headerName: 'Login',
        width: 130,
    },
    {
        field: 'clocktype',
        headerName: 'Clock Type',
        // description: 'This column has a value getter and is not sortable.',
        // sortable: false,
        width: 160,
        // valueGetter: (params) =>
        //     `${params.getValue(params.id, 'firstName') || ''} ${
        //         params.getValue(params.id, 'lastName') || ''
        //     }`,

    },
    {
        field: 'city',
        headerName: 'City',
        width: 130,
    },
    {
        field: 'datetime',
        headerName: 'Date & Time',
        width: 130,
    },
    {
        field: 'masterid',
        headerName: 'Master',
        width: 70,
    },
];

const DataTable = () => {
    const [tableRows, setTableRows] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    const getRows = async () => {
        setLoadingData(true);
        const res = await instance.get('/orders')
        if (res.data) {
            setTableRows(res.data);
        }
        setLoadingData(false);
    }

    useEffect(() => {
        getRows();
    }, [])

    return (
        <div style={{height: 400, width: '100%'}}>
            {
                (loadingData)
                    ? <CircularProgress/>
                    : <DataGrid
                        rows={tableRows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
            }
        </div>
    );
}

export default DataTable;