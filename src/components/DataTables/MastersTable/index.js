import React, {useEffect} from 'react';
import DataTable from "../DataTable";
import {useDispatch, useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import Rating from '@mui/material/Rating';
import masters from "../../../store/actions/masters";
import MasterForm from "../../Forms/AdminForms/MasterForm";
import {useTranslation} from "react-i18next";

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
        }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(masters.getAll());
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
                actions={masters}
                objType={'masters'}
                ModelForm={MasterForm}
            />
        </>
    );
}

export default MastersTable;