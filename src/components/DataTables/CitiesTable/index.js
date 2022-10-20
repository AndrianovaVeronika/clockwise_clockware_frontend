import * as React from 'react';
import {useEffect, useState} from 'react';
import DataTable from "../DataTable";
import cities from "../../../store/actions/cities";
import CityForm from "../../Forms/AdminForms/CityForm";
import {useTranslation} from "react-i18next";
import CitiesFiltrationForm from "../../Forms/FiltrationForms/CitiesFiltrationForm";
import {getAllCities} from "../../../store/getters/cities";

const CitiesTable = () => {
    const {t} = useTranslation();

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 50
        },
        {
            field: 'name', headerName: t("forms.labels.name"), width: 100
        },
        {
            field: 'price', headerName: t("forms.labels.price"), width: 100
        },
    ];

    const [rows, setRows] = useState([]);
    useEffect(async () => {
        setRows(await getAllCities());
    }, []);

    const filtrate = async filters => setRows(await getAllCities(filters));

    return (
        <>
            <CitiesFiltrationForm
                filtrate={filtrate}
            />
            <DataTable
                columns={columns}
                rows={rows}
                actions={cities}
                objType={'cities'}
                ModelForm={CityForm}
            />
        </>
    );
}

export default CitiesTable;