import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";
import FormDialog from "../../Forms/FormDialog";
import UsersTable from "../../DataTables/UsersTable";
import withSidebar from "../../../functions/withSidebar";
import AddUserForm from "../../Forms/AddUserForm";

const AdminUsersPage = () => {
    return (
        <>
            <UsersTable/>
            <FormDialog
                openDialogButtonText={'Добавить'}
                dialogTitle={'Введите данные нового юзера'}
                submitButtonParams={{
                    submitButtonText: 'Добавить',
                    type: 'submit',
                    form: 'add-user-form'
                }}
            >
                <AddUserForm/>
            </FormDialog>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AdminUsersPage);