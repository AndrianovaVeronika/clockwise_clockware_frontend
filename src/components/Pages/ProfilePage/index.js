import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import {compose} from "redux";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";
import {Typography} from "@mui/material";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";
import OrderForm from "../../Forms/OrderFormDialog";

const ProfilePage = () => {
    const user = useSelector(getCurrentUserSelector);

    return (
        <>
            <Typography>Username: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Roles: {user.roles && user.roles.join(', ')}</Typography>
            <Typography>Password: {user.password}</Typography>
            <OrderForm openButtonOnClickText={'Сделать заказ'}/>
        </>
    )
}

export default compose(withHeader, wrapContent, withRedirectAfterLogout)(ProfilePage);