import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import OrdersTable from '../../DataTables/OrdersTable';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../functions/withSidebar";

const AdminOrdersPage = () => {
    return (
        <>
            <OrdersTable/>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AdminOrdersPage);