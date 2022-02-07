import React, {useEffect} from 'react';
import DataTable from "../DataTable";
import {getMasters} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {getMastersSelector} from "../../store/selectors/mastersSelector";
import Rating from '@mui/material/Rating';

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
];

const MastersTable = ({withCheckbox, onRowClick}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMasters());
    }, [])

    const rows = useSelector(getMastersSelector);

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

export default MastersTable;