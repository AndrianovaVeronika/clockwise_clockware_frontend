import React, {useState} from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import MastersTable from "../../MastersTable";
import AddMasterForm from "../../AddMasterForm";
import FormDialog from "../../FormDialog";

const AdminMastersPage = () => {
    return (
        <>
            <MastersTable/>
            <FormDialog
                formId='add-master-form'
                openDialogButtonText={'Добавить'}
                dialogTitle={'Данные мастера'}
            >
                <AddMasterForm/>
            </FormDialog>
        </>
    )
}

export default withHeader(wrapContent(AdminMastersPage));