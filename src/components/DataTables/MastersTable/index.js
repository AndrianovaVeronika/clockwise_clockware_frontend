import React, {useEffect, useState} from 'react';
import DataTable from "../DataTable";
import {useDispatch, useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import Rating from '@mui/material/Rating';
import {deleteMaster, getMasters, updateMaster} from "../../../store/actions/masters";
import MasterForm from "../../Forms/MasterForm";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Имя', width: 100
    },
    {
        field: 'rating',
        headerName: 'Рейтинг',
        width: 150,
        renderCell: renderRating,
        type: 'number',
    },
    {
        field: 'cities',
        headerName: 'Работает в',
        width: 150,
    }
];

const MastersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMasters());
    }, [dispatch])

    const masters = useSelector(getMastersSelector);

    const getRows = () => {
        const rows = [];
        for (const master of masters) {
            const cities = [];
            for (const city of master.cities) {
                cities.push(city.name);
            }
            rows.push({...master, cities: cities.join(', ')});
        }
        return rows;
    }

    const rows = getRows();

    return (
        <>
            <DataTable
                columns={columns}
                rows={rows}
                onRowsDelete={deleteMaster}
                onUpdate={updateMaster}
                formId='master-form'
                AddForm={MasterForm}
            />
        </>
    );
}

export default MastersTable;