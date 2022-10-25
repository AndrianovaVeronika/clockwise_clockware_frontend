import * as React from 'react';
import {useState} from 'react';
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

    const [filters, setFilters] = useState({});

    return (
        <>
            <CitiesFiltrationForm
                setFilters={setFilters}
            />
            <DataTable
                filters={filters}
                getRowsAction={getAllCities}
                columns={columns}
                actions={cities}
                objType={'cities'}
                ModelForm={CityForm}
            />
        </>
    );
}

export default CitiesTable;