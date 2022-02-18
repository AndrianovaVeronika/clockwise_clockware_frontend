import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import OrdersTable from '../../DataTables/OrdersTable';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";

const AdminOrdersPage = () => {
    return (
        <>
            <OrdersTable/>
        </>
    )
}

export default compose(withHeader, wrapContent, withRedirectAfterLogout)(AdminOrdersPage);