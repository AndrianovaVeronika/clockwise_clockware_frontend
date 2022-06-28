import * as React from 'react';
import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from "../../Dialogs/FormDialog";
import AddIcon from '@mui/icons-material/Add';
import useStyles from "../../../styles/useStyles";
import _ from 'lodash';

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
    const dispatch = useDispatch();
    const [activeRow, setActiveRow] = useState({});
    const classes = useStyles();

    const onDelete = () => {
        if (Object.keys(activeRow).length === 0) {
            console.log('Nothing to delete');
            return;
        }
        dispatch(onRowDelete(activeRow.id));
    }

    const onRowClick = ({row}) => {
        setActiveRow(row);
    }

    const OpenIconButton = ({Icon, ...props}) => {
        return <IconButton className={classes.iconButton} {...props}>
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
            <div className={classes.dataTable}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowClick={onRowClick}
                    {...rest}
                />
            </div>
            {!_.isEmpty(activeRow) && <>
                <DeleteDialog/>
                <EditDialog/>
            </>}
            <AddDialog/>
        </>
    );
}

export default React.memo(DataTable, (prevProps, nextProps) => {
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
    return equality;
});