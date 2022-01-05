import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import DataTable from '../../DataTable';

const AdminOrdersPage = () => {
    return (
        <>
            <DataTable/>
        </>
    )
}

export default withHeader(wrapContent(AdminOrdersPage));