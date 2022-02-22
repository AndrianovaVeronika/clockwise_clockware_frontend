import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import OrdersTable from '../../../DataTables/OrdersTable';
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import OrderForm from "../../../Forms/OrderFormDialog";

const AdminOrdersPage = () => {
    return (
        <>
            <div style={{marginTop: '50px', marginLeft: '50px'}}>
                <OrdersTable/>
            </div>
            <div style={{marginTop: '50px', marginLeft: '50px'}}>
                <OrderForm openButtonOnClickText={'Добавить'}/>
            </div>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AdminOrdersPage);