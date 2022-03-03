import * as React from 'react';
import {useEffect} from 'react';
import DataTable from "../DataTable";
import {deleteUser, getUsers, updateUser} from "../../../store/actions/users";
import {useDispatch, useSelector} from "react-redux";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
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
                onRowsDelete={deleteUser}
                onUpdate={updateUser}
                formId='user-form'
                AddForm={UserForm}
            />
        </>
    );
}

export default UsersTable;