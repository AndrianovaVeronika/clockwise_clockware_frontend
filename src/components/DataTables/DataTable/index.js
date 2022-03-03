import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useState} from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import FormDialog from "../../Dialogs/FormDialog";

const DataTable = ({columns, rows, onRowsDelete, onUpdate, formId, AddForm, ...rest}) => {
    const dispatch = useDispatch();
    const [selectionModel, setSelectionModel] = useState([]);
    const [rowToChange, setRowToChange] = useState({});

    const onDelete = () => {
        for (const selectionModelElement of selectionModel) {
            dispatch(onRowsDelete(selectionModelElement));
        }
    }

    const onRowClick = ({row}) => {
        setRowToChange(row);
    }

    return (
        <>
            <div style={{
                width: '600px',
                height: '400px',
                border: '4px double black',
                flexDirection: 'row',
                display: 'flex'
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                    onRowClick={onRowClick}
                    {...rest}
                />
                <IconButton onClick={onDelete} style={{width: '50px', height: '50px'}}>
                    <DeleteIcon/>
                </IconButton>
                <FormDialog
                    openDialogButtonText={'Изменить'}
                    dialogTitle={'Измените данные'}
                    submitButtonParams={{
                        submitButtonText: 'Изменить',
                        type: 'submit',
                        form: {formId}
                    }}
                >
                    <AddForm submitAction={onUpdate} specifiedInitialValues={rowToChange}/>
                </FormDialog>
            </div>
        </>
    );
}

export default DataTable;