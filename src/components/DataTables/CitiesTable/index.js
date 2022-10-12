import * as React from 'react';
import {useEffect} from 'react';
import DataTable from "../DataTable";
import cities from "../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import {getFilteredCitiesSelector} from "../../../store/selectors/citiesSelector";
import CityForm from "../../Forms/AdminForms/CityForm";
import {useTranslation} from "react-i18next";
import {Box} from "@mui/material";
import CitiesFiltrationForm from "../../Forms/FiltrationForms/CitiesFiltrationForm";

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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cities.getAll());
        dispatch(cities.getFiltered());
    }, [dispatch])

    const filteredCities = useSelector(getFilteredCitiesSelector);

    return (
        <>
            <Box sx={{margin: '10px', marginLeft: '0px!important', width: '30%'}}>
                <CitiesFiltrationForm/>
            </Box>
            <DataTable
                columns={columns}
                rows={filteredCities}
                actions={cities}
                objType={'cities'}
                ModelForm={CityForm}
            />
        </>
    );
}

export default CitiesTable;