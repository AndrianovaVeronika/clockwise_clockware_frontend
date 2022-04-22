import * as React from 'react';
import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from "../../Dialogs/FormDialog";
import AddIcon from '@mui/icons-material/Add';

const DataTable = ({columns, rows, onRowDelete, onRowUpdate, onRowAdd, formId, ModelForm, additionalFormDialogProps, ...rest}) => {
    const dispatch = useDispatch();
    const [activeRow, setActiveRow] = useState({});

    const onDelete = () => {
        if (Object.keys(activeRow).length === 0){
            console.log('Nothing to delete');
            return;
        }
        dispatch(onRowDelete(activeRow.id));
    }

    const onRowClick = ({row}) => {
        console.log('row to change - data table', row);
        setActiveRow(row);
    }

    return (
        <>
            <div style={{width: '600px'}}>
                <div style={{
                    height: '400px',
                    border: '4px double black',
                    display: 'flex'
                }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowClick={onRowClick}
                        {...rest}
                    />
                </div>
                <IconButton onClick={onDelete} style={{width: '50px', height: '50px'}}>
                    <DeleteIcon/>
                </IconButton>
                <FormDialog
                    OpenButton={(props) => {
                        return <IconButton style={{width: '50px', height: '50px'}} {...props}>
                            <EditIcon/>
                        </IconButton>
                    }}
                    dialogTitle={'Измените данные'}
                    submitButtonParams={{
                        submitButtonText: 'Сохранить',
                        type: 'submit',
                        form: formId
                    }}
                    {...additionalFormDialogProps}
                >
                    <ModelForm submitAction={onRowUpdate} specifiedInitialValues={activeRow} isDialog={true}/>
                </FormDialog>
                <FormDialog
                    OpenButton={(props) => {
                        return <IconButton
                            style={{width: '50px', height: '50px'}}
                            {...props}
                        >
                            <AddIcon/>
                        </IconButton>
                    }}
                    dialogTitle={'Введите данные'}
                    submitButtonParams={{
                        submitButtonText: 'Добавить',
                        type: 'submit',
                        form: formId
                    }}
                    {...additionalFormDialogProps}
                >
                    <ModelForm submitAction={onRowAdd} isDialog={true}/>
                </FormDialog>
            </div>
        </>
    );
}

export default DataTable;