import React, {useEffect} from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserSelector, isAuthUserSelector, isUserLoadingSelector} from "../../../store/selectors/authSelector";
import {Typography} from "@mui/material";
import {verifyUserAccess} from "../../../store/actions";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";

const ProfilePage = () => {
    const user = useSelector(getCurrentUserSelector);

    const isAuth = useSelector(isAuthUserSelector);

    const isLoadingUser = useSelector(isUserLoadingSelector);

    console.log('USER', user, isLoadingUser, isAuth);

    return (
        <>
            <Typography>Username: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Roles: {user.roles && user.roles.join(', ')}</Typography>
            <Typography>Password: {user.password}</Typography>
        </>
    )
}

export default compose(withHeader, wrapContent, withRedirectAfterLogout)(ProfilePage);