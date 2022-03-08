import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import CitiesTable from "../../../DataTables/CitiesTable";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";
import {compose} from "redux";

const AdminCitiesPage = () => {
    return (
        <div style={{marginTop: '100px', marginLeft: '50px'}}>
            <CitiesTable/>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminCitiesPage);