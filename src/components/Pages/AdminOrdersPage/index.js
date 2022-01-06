import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import OrdersTable from '../../OrdersTable';

const AdminOrdersPage = () => {
    return (
        <>
            <OrdersTable/>
        </>
    )
}

export default withHeader(wrapContent(AdminOrdersPage));