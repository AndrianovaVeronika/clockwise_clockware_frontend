import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import instance from "../../store/middleware/api";
import {useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';

const DataTable = ({columns, queryLink}) => {
    const [tableRows, setTableRows] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    const getRows = async () => {
        setLoadingData(true);
        const res = await instance.get(queryLink)
        if (res.data) {
            setTableRows(res.data);
        }
        setLoadingData(false);
    }

    useEffect(() => {
        getRows();
    }, [])

    return (
        <div style={{height: '100%', width: '100%'}}>
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