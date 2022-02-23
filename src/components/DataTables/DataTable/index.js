import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';

const DataTable = ({columns, rows, onRowClick, withCheckbox = true, ...rest}) => {
    return (
        <>
            <div style={{
                width: '600px',
                height: '400px',
                border: '4px double black',
                flexDirection: 'column',
                alignItems: 'center',
                display: 'block'
            }}>
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