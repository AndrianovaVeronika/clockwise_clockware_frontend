import React, {useEffect, useState} from 'react';
import DataTable from "../DataTable";
import Rating from '@mui/material/Rating';
import masters from "../../../store/actions/masters";
import MasterForm from "../../Forms/AdminForms/MasterForm";
import {useTranslation} from "react-i18next";
import MastersFiltrationForm from "../../Forms/FiltrationForms/MastersFiltrationForm";
import cities from "../../../store/actions/cities";
import {getAllMasters} from "../../../store/getters/masters";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const MastersTable = () => {
    const {t} = useTranslation();

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 50
        },
        {
            field: 'name', headerName: t("forms.labels.name"), width: 100
        },
        {
            field: 'rating',
            headerName: t("forms.labels.rating"),
            width: 150,
            renderCell: renderRating,
            type: 'number',
        },
        {
            field: 'cities',
            headerName: t("forms.labels.city"),
            width: 290,
            sortable: false
        }
    ];

    const [filters, setFilters] = useState({});

    return (
        <>
            <MastersFiltrationForm
                setFilters={setFilters}
            />
            <DataTable
                getRowsAction={getAllMasters}
                filters={filters}
                columns={columns}
                actions={masters}
                objType={'masters'}
                ModelForm={MasterForm}
            />
        </>
    );
}

export default MastersTable;