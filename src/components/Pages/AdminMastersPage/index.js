import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import MastersTable from "../../MastersTable";

const AdminMastersPage = () => {
    return (
        <>
            <MastersTable/>
        </>
    )
}

export default withHeader(wrapContent(AdminMastersPage));