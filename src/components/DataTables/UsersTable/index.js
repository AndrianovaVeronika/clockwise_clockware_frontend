import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import users from "../../../store/actions/users";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import DataTable from "../DataTable";
import UserForm from "../../Forms/AdminForms/UserForm";
import {Button} from "@mui/material";
import {resetPassword} from "../../../store/actions/users";
import store from "../../../store/store";

function renderResetPasswordButton({value}) {
    return <Button onClick={() => store.dispatch(resetPassword(value))}>Reset password</Button>;
}

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Name', width: 150,
    },
    {
        field: 'email', headerName: 'Mail', width: 200,
    },
    {
        field: 'emailChecked', headerName: 'Email checked', width: 150
    },
    {
        field: 'recipient',
        type: 'number',
        headerName: 'Reset password',
        width: 200,
        renderCell: renderResetPasswordButton
    }
];

const UsersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(users.getAll());
    }, [dispatch])

    const rows = useSelector(getUsersSelector).map(user => ({...user, recipient: {id: user.id, email: user.email}}));

    return (
        <>
            <DataTable
                columns={columns}
                rows={rows}
                actions={users}
                objType={'users'}
                ModelForm={UserForm}
            />
        </>
    );
}

export default UsersTable;