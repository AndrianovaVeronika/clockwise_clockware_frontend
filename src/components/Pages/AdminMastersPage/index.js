import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import MastersTable from "../../DataTables/MastersTable";
import AddMasterForm from "../../Forms/AddMasterForm";
import FormDialog from "../../Forms/FormDialog";
import {compose} from "redux";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";

const AdminMastersPage = () => {
    return (
        <>
            <MastersTable/>
            <FormDialog
                openDialogButtonText={'Добавить'}
                dialogTitle={'Данные мастера'}
                submitButtonParams={{
                    submitButtonText: 'Добавить',
                    type: 'submit',
                    form: 'add-master-form'
                }}
            >
                <AddMasterForm/>
            </FormDialog>
        </>
    )
}

export default compose(withHeader, wrapContent, withRedirectAfterLogout)(AdminMastersPage);