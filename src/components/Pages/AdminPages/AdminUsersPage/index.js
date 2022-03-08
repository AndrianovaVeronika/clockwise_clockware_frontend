import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import UsersTable from "../../../DataTables/UsersTable";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";

const AdminUsersPage = () => {
    return (
        <div style={{marginTop: '100px', marginLeft: '50px'}}>
            <UsersTable/>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminUsersPage);