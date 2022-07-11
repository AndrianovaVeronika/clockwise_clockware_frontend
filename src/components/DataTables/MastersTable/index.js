import React, {useEffect} from 'react';
import DataTable from "../DataTable";
import {useDispatch, useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import Rating from '@mui/material/Rating';
import {addMaster, deleteMaster, getMasters, updateMaster} from "../../../store/actions/masters";
import MasterForm from "../../Forms/MasterForm";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Name', width: 100
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 150,
        renderCell: renderRating,
        type: 'number',
    },
    {
        field: 'cities',
        headerName: 'Cities',
        width: 290,
    }
];

const MastersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMasters());
    }, [dispatch])

    const rows = useSelector(getMastersSelector).map(master => {
        return {
            ...master,
            cities: master.cities.join(', ')
        }
    });

    return (
        <>
            <DataTable
                columns={columns}
                rows={rows}
                onRowDelete={deleteMaster}
                onRowUpdate={updateMaster}
                onRowAdd={addMaster}
                objType={'masters'}
                ModelForm={MasterForm}
            />
        </>
    );
}

export default MastersTable;