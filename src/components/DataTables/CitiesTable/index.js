import * as React from 'react';
import {useEffect} from 'react';
import DataTable from "../DataTable";
import cities from "../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import CityForm from "../../Forms/AdminForms/CityForm";
import {useTranslation} from "react-i18next";

const CitiesTable = () => {
    const {t} = useTranslation();

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 50
        },
        {
            field: 'name', headerName: t("forms.labels.name"), width: 100
        },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cities.getAll());
    }, [dispatch])

    const rows = useSelector(getCitiesSelector);

    return (
        <>
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