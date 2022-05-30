import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsers, updateUser} from "../../../store/actions/users";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import DataTable from "../DataTable";
import {signUp} from "../../../store/actions/auth";
import SignUpForm from "../../Forms/SignUpForm";

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
    {
        field: 'password', headerName: 'Password', width: 300,
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
                formId='signup-form'
                ModelForm={SignUpForm}
            />
        </>
    );
}

export default UsersTable;