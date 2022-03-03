import * as React from 'react';
import DataTable from "../DataTable";
import {useEffect} from "react";
import {getCities, deleteCity, updateCity} from "../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import CityForm from "../../Forms/CityForm";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Название', width: 100
    },
];

const CitiesTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCities());
    }, [dispatch])

    const rows = useSelector(getCitiesSelector);

    return (
        <>
            <DataTable
                columns={columns}
                rows={rows}
                onRowsDelete={deleteCity}
                onUpdate={updateCity}
                formId='city-form'
                AddForm={CityForm}
            />
        </>
    );
}

export default CitiesTable;