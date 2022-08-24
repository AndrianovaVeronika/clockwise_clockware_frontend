import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import users from "../../../store/actions/users";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import DataTable from "../DataTable";
import UserForm from "../../Forms/AdminForms/UserForm";
import {Button} from "@mui/material";
import {resetPassword} from "../../../store/actions/auth";

function renderResetPasswordButton({value}) {
    const dispatch = useDispatch();
    return <Button onClick={()=>dispatch(resetPassword(value))}>Reset password</Button>;
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
        field: 'resetPasswordButton',
        type: 'number',
        headerName: 'Reset password',
        width: 150,
        renderCell: renderResetPasswordButton
    }
];

const UsersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(users.getAll());
    }, [dispatch])

    const rows = useSelector(getUsersSelector);

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