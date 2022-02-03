import * as React from 'react';
import DataTable from "../DataTable";
import {useEffect} from "react";
import store from "../../store/store";
import {getCities} from "../../store/actions";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../store/selectors/citiesSelector";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Название', width: 100
    },
];

const CitiesTable = ({withCheckbox, onRowClick}) => {
    useEffect(() => {
        store.dispatch(getCities());
    }, [])

    const rows = useSelector(getCitiesSelector);

    return (
        <>
            <DataTable
                columns={columns}
                rows={rows}
                withCheckbox={withCheckbox}
                onRowClick={onRowClick}
            />
        </>
    );
}

export default CitiesTable;