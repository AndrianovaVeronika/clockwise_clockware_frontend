import React from 'react';
import './style.css';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';

const AdminOrdersPage = () => {
    return (
        <>
            <div className='text'>Добро пожаловать, мастер! Чего изволите?</div>
        </>
    )
}

export default withHeader(wrapContent(AdminOrdersPage));