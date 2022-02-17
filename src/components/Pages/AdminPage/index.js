import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import {Button, Toolbar} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {compose} from "redux";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";

const AdminPage = () => {
    return (
        <>
            <Toolbar>
                <Button
                    {...{
                        color: 'inherit',
                        to: '/admin/orders',
                        component: RouterLink,
                    }}
                >Заказы</Button>
                <Button
                    {...{
                        color: 'inherit',
                        to: '/admin/masters',
                        component: RouterLink,
                    }}
                >Мастера</Button>
                <Button
                    {...{
                        color: 'inherit',
                        to: '/admin/cities',
                        component: RouterLink,
                    }}
                >Города</Button>
            </Toolbar>
        </>
    )
}

export default compose(withHeader, wrapContent, withRedirectAfterLogout)(AdminPage);