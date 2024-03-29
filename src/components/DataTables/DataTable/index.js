import * as React from 'react';
import {useState} from 'react';
import {Alert, AlertTitle, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from "../../Dialogs/FormDialog";
import AddIcon from '@mui/icons-material/Add';
import useStyles from "../../../styles/useStyles";
import _ from 'lodash';
import {useTranslation} from "react-i18next";
import ServerPaginationGrid from "../ServerPaginationGrid";

const DataTable = ({
                       columns,
                       filters,
                       getRowsAction,
                       actions,
                       objType,
                       ModelForm
                   }) => {
    const dispatch = useDispatch();
    const [activeRow, setActiveRow] = useState({});
    const classes = useStyles();
    const [DataTableAlert, setDataTableAlert] = useState(<></>);

    const onDelete = async () => {
        if (_.isEmpty(activeRow)) {
            setDataTableAlert(
                <Alert severity="info">
                    <AlertTitle>Attention</AlertTitle>
                    {"Choose row to delete."}
                </Alert>
            );
            return;
        }
        const {error, payload} = await dispatch(actions.delete(activeRow.id));
        if (error) {
            setDataTableAlert(
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setDataTableAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {'Row has been deleted successfully.'}
                </Alert>
            );
            setActiveRow({});
        }
    }

    const onRowClick = ({row}) => {
        setActiveRow(row);
        dispatch(actions.getById(row.id));
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
        return <FormDialog
            OpenButton={(props) => <OpenIconButton Icon={EditIcon} {...props}/>}
            dialogTitle={'Измените данные'}
            submitButtonText={'Сохранить'}
            actionType={'Edit'}
            formId={objType}
            ModelForm={ModelForm}
            submitAction={actions.update}
            setDataTableAlert={setDataTableAlert}
            clearDataTableSelectedRow={() => setActiveRow({})}
        />
    }

    const AddDialog = () => {
        return <FormDialog
            OpenButton={(props) => <OpenIconButton Icon={AddIcon} {...props}/>}
            dialogTitle={'Введите данные'}
            submitButtonText={'Добавить'}
            actionType={'Add'}
            formId={objType}
            ModelForm={ModelForm}
            submitAction={actions.add}
            setDataTableAlert={setDataTableAlert}
        />
    }

    return (
        <>
            <div className={classes.dataTable}>
                <ServerPaginationGrid
                    columns={columns}
                    getRowsAction={getRowsAction}
                    filters={filters}
                    onRowClick={onRowClick}
                    onRowDoubleClick={() => setActiveRow({})}
                />
            </div>
            {!_.isEmpty(activeRow) && <>
                <DeleteDialog/>
                <EditDialog/>
            </>}
            <AddDialog/>
            {DataTableAlert}
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