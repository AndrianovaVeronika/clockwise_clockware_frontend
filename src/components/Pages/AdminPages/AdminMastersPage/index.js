import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import MastersTable from "../../../DataTables/MastersTable";
import AddMasterForm from "../../../Forms/AddMasterForm";
import FormDialog from "../../../Forms/FormDialog";
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";

const AdminMastersPage = () => {
    return (
        <div style={{marginTop: '100px', marginLeft: '50px'}}>
            <MastersTable/>
            <div style={{width: '150px', marginTop: '50px', marginLeft: '50px'}}>
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
            </div>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminMastersPage);