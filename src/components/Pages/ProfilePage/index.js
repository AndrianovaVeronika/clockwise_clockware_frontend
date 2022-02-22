import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {compose} from "redux";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";
import {Typography} from "@mui/material";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";
import OrderForm from "../../Forms/OrderFormDialog";
import withSidebar from "../../../functions/withSidebar";

const ProfilePage = () => {
    const user = useSelector(getCurrentUserSelector);

    return (
        <div style={{display: 'flex', 'flex-direction': 'column', 'margin-left': '50px', 'margin-top': '50px'}}>
            <Typography>Username: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Roles: {user.roles && user.roles.join(', ')}</Typography>
            <Typography>Password: {user.password}</Typography>
            <OrderForm openButtonOnClickText={'Сделать заказ'}/>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(ProfilePage);