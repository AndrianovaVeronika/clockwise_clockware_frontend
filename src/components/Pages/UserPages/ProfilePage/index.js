import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import {compose} from "redux";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../../../store/selectors/authSelector";
import {Typography} from "@mui/material";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";

const ProfilePage = () => {
    const user = useSelector(getCurrentUserSelector);

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '50px', marginTop: '110px'}}>
                <Typography>Username: {user.username}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Roles: {user.roles && user.roles.join(', ')}</Typography>
                <Typography>Password: {user.password}</Typography>
            </div>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(ProfilePage);