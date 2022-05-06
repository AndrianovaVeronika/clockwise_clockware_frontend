import * as React from 'react';
import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from "../../Dialogs/FormDialog";
import AddIcon from '@mui/icons-material/Add';

const DataTable = ({
                       columns,
                       rows,
                       onRowDelete,
                       onRowUpdate,
                       onRowAdd,
                       formId,
                       ModelForm,
                       ModelDialog,
                       additionalFormDialogProps,
                       ...rest
                   }) => {
    console.log('datatable rerender')
    const dispatch = useDispatch();
    const [activeRow, setActiveRow] = useState({});

    const onDelete = () => {
        if (Object.keys(activeRow).length === 0) {
            console.log('Nothing to delete');
            return;
        }
        dispatch(onRowDelete(activeRow.id));
    }

    const onRowClick = ({row}) => {
        console.log('row to change - data table', row);
        setActiveRow(row);
    }

    const OpenIconButton = ({Icon, ...props}) => {
        return <IconButton style={{width: '50px', height: '50px'}} {...props}>
            <Icon/>
        </IconButton>
    }

    const DeleteDialog = () => {
        return <OpenIconButton Icon={DeleteIcon} onClick={onDelete}/>;
    }

    const EditDialog = () => {
        return ModelDialog ?
            <ModelDialog
                OpenButton={(props) => <OpenIconButton Icon={EditIcon} {...props}/>}
                submitAction={onRowUpdate}
                specifiedInitialValues={activeRow}
            /> : <FormDialog
                OpenButton={(props) => <OpenIconButton Icon={EditIcon} {...props}/>}
                dialogTitle={'Измените данные'}
                submitButtonParams={{
                    submitButtonText: 'Сохранить',
                    type: 'submit',
                    form: formId
                }}
                {...additionalFormDialogProps}
            >
                <ModelForm submitAction={onRowUpdate} specifiedInitialValues={activeRow}/>
            </FormDialog>;
    }

    const AddDialog = () => {
        return ModelDialog ?
            <ModelDialog
                OpenButton={(props) => <OpenIconButton Icon={AddIcon} {...props}/>}
                submitAction={onRowAdd}
            /> : <FormDialog
                OpenButton={(props) => <OpenIconButton Icon={AddIcon} {...props}/>}
                dialogTitle={'Введите данные'}
                submitButtonParams={{
                    submitButtonText: 'Добавить',
                    type: 'submit',
                    form: formId
                }}
                {...additionalFormDialogProps}
            >
                <ModelForm submitAction={onRowAdd}/>
            </FormDialog>;
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
                <DeleteDialog/>
                <EditDialog/>
                <AddDialog/>
            </div>
        </>
    );
}

export default React.memo(DataTable, (prevProps, nextProps) => {
    // console.log(prevProps === nextProps)
    // console.log('prev')
    // for (const prevPropsKey in prevProps) {
    //     console.log(prevPropsKey)
    // }
    // console.log('next')
    // for (const nextPropsKey in nextProps) {
    //     console.log(nextPropsKey)
    // }
    // if (prevProps['row']) {
    //     for (const row of prevProps['row']) {
    //         console.log(row)
    //     }
    // } else {
    //     console.log('prevProps[\'row\']: ' + prevProps['row'])
    // }
    // console.log('next')
    // if (nextProps['row']) {
    //     for (const row1 of nextProps['row']) {
    //         console.log(row1)
    //     }
    // } else {
    //     console.log('nextProps[\'row\']: ' + nextProps['row'])
    // }

    let equality = true;

    for (const propsKey in prevProps) {
        if (propsKey === 'rows') {
            if (prevProps.rows.length !== nextProps.rows.length) {
                equality = false;
                break;
            } else {
                for (let i = 0; i < prevProps.rows.length; i++) {
                    for (const objKey in prevProps.rows[i]) {
                        if (prevProps.rows[i][objKey] !== nextProps.rows[i][objKey]) {
                            equality = false;
                            break;
                        }
                    }
                }
            }
        } else if (prevProps[propsKey] !== nextProps[propsKey]) {
            equality = false;
            break;
        }
    }

    console.log(equality)
    return equality;
});