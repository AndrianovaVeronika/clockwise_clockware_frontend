import * as React from 'react';
import {useEffect} from 'react';
import DataTable from "../DataTable";
import {addCity, deleteCity, getCities, updateCity} from "../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import CityForm from "../../Forms/CityForm";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Name', width: 100
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
                onRowDelete={deleteCity}
                onRowUpdate={updateCity}
                onRowAdd={addCity}
                formId='city-form'
                ModelForm={CityForm}
            />
        </>
    );
}

export default CitiesTable;