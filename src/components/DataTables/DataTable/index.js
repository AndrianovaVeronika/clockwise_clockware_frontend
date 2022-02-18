import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';

const DataTable = ({columns, rows, onRowClick, withCheckbox = true, ...rest}) => {
    return (
        <>
            <div style={{height: '90%', width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={withCheckbox}
                    onRowClick={onRowClick}
                    {...rest}
                />
            </div>
        </>
    );
}

export default DataTable;