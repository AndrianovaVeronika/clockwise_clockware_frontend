import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import MastersTable from "../../MastersTable";
import AddMasterForm from "../../AddMasterForm";
import FormDialog from "../../FormDialog";
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