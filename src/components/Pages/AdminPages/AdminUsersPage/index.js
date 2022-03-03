import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import FormDialog from "../../../Dialogs/FormDialog";
import UsersTable from "../../../DataTables/UsersTable";
import withSidebar from "../../../../functions/withSidebar";
import AddUserForm from "../../../Forms/UserForm";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";
import {signUp} from "../../../../store/actions/auth";
import {updateUser} from "../../../../store/actions/users";

const AdminUsersPage = () => {
    return (
        <div style={{marginTop: '100px', marginLeft: '50px'}}>
            <UsersTable/>
            <div style={{width: '150px', marginTop: '50px', marginLeft: '50px'}}>
                <FormDialog
                    openDialogButtonText={'Добавить'}
                    dialogTitle={'Введите данные нового юзера'}
                    submitButtonParams={{
                        submitButtonText: 'Добавить',
                        type: 'submit',
                        form: 'add-user-form'
                    }}
                >
                    <AddUserForm submitAction={signUp}/>
                </FormDialog>
            </div>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminUsersPage);