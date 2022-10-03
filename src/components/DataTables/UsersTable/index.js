import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import users, {resetPassword} from "../../../store/actions/users";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import DataTable from "../DataTable";
import UserForm from "../../Forms/AdminForms/UserForm";
import {Button} from "@mui/material";
import store from "../../../store/store";
import {useTranslation} from "react-i18next";

function renderResetPasswordButton({value}) {
    const onClick = async () => {
        const {error, payload} = await store.dispatch(resetPassword(value));
        if (!error) {
            console.log('Password reset');
        }
    }
    return <Button onClick={onClick}>Reset password</Button>;
}

const UsersTable = () => {
    const {t} = useTranslation();

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 50
        },
        {
            field: 'name', headerName: t("forms.labels.name"), width: 150,
        },
        {
            field: 'email', headerName: t("forms.labels.email"), width: 200,
        },
        {
            field: 'emailChecked', headerName: t("forms.labels.emailChecked"), width: 150
        },
        {
            field: 'resetUserWithId',
            type: 'number',
            headerName: t("forms.labels.resetPassword"),
            width: 200,
            renderCell: renderResetPasswordButton
        }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(users.getAll());
    }, [dispatch])

    const rows = useSelector(getUsersSelector).map(user => ({...user, resetUserWithId: user.id}));

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