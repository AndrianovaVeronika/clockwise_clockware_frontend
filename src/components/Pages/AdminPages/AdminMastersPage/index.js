import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import MastersTable from "../../../DataTables/MastersTable";
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";

const AdminMastersPage = () => {
    return (
        <div style={{marginTop: '100px', marginLeft: '50px'}}>
            <MastersTable/>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminMastersPage);