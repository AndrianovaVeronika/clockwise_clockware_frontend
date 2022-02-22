import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import OrdersTable from '../../../DataTables/OrdersTable';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";

const AdminOrdersPage = () => {
    return (
        <>
            <div style={{marginTop: '50px', marginLeft: '50px'}}>
                <OrdersTable/>
            </div>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminOrdersPage);