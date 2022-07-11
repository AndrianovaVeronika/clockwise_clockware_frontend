import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser, deleteUser, getUsers, updateUser} from "../../../store/actions/users";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import DataTable from "../DataTable";
import {signUp} from "../../../store/actions/auth";
import UserForm from "../../Forms/UserForm";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'username', headerName: 'Name', width: 150,
    },
    {
        field: 'email', headerName: 'Mail', width: 200,
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
                onRowAdd={addUser}
                objType={'users'}
                ModelForm={UserForm}
            />
        </>
    );
}

export default UsersTable;