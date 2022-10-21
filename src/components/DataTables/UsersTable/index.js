import React, {useEffect, useState} from "react";
import users, {resetPassword} from "../../../store/actions/users";
import DataTable from "../DataTable";
import UserForm from "../../Forms/AdminForms/UserForm";
import {Button} from "@mui/material";
import store from "../../../store/store";
import {useTranslation} from "react-i18next";
import UsersFiltrationForm from "../../Forms/FiltrationForms/UsersFiltrationForm";
import {getAllCities} from "../../../store/getters/cities";
import {getAllUsers} from "../../../store/getters/users";

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

    const [rows, setRows] = useState([]);
    useEffect(async () => {
        setRows(await getAllUsers());
    }, []);

    const filtrate = async filters => setRows(await getAllUsers(filters));

    return (
        <>
            <UsersFiltrationForm
                filtrate={filtrate}
            />
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