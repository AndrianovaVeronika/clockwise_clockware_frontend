import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getOrdersSelector} from "../../store/selectors/ordersSelector";
import {useSelector} from "react-redux";

const DataTable = ({columns, rows}) => {
    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

export default DataTable;