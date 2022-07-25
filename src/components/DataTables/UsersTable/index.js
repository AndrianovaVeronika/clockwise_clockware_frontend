import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import users from "../../../store/actions/users";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import DataTable from "../DataTable";
import UserForm from "../../Forms/AdminForms/UserForm";

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