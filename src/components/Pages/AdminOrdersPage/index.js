import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import OrdersTable from '../../OrdersTable';
import {compose} from "redux";

const AdminOrdersPage = () => {
    return (
        <>
            <OrdersTable/>
        </>
    )
}

export default compose(withHeader, wrapContent)(AdminOrdersPage);