import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import OrdersTable from '../../../DataTables/OrdersTable';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";

const AdminOrdersPage = () => {
    console.log('orders page rerender')
    return (
        <>
            <div style={{marginTop: '100px', marginLeft: '50px'}}>
                <OrdersTable/>
            </div>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminOrdersPage);