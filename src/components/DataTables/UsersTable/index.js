import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsers, updateUser} from "../../../store/actions/users";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import DataTable from "../DataTable";
import {signUp} from "../../../store/actions/auth";
import UserForm from "../../Forms/UserForm";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'username', headerName: 'Имя', width: 150,
    },
    {
        field: 'email', headerName: 'Почта', width: 200,
    },
    {
        field: 'password', headerName: 'Пароль', width: 300,
    },
];

const UsersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const users = useSelector(getUsersSelector);

    return (
        <>
            <DataTable
                columns={columns}
                rows={users}
                onRowDelete={deleteUser}
                onRowUpdate={updateUser}
                onRowAdd={signUp}
                formId='user-form'
                ModelForm={UserForm}
            />
        </>
    );
}

export default UsersTable;