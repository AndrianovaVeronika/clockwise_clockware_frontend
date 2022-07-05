import React from "react";
import {getAvailableMastersSelector} from "../../../store/selectors/mastersSelector";
import {DataGrid} from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import {useFormikContext} from "formik";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const columns = [
    {
        field: 'name', headerName: 'Имя', width: 100
    },
    {
        field: 'rating',
        headerName: 'Рейтинг',
        width: 150,
        renderCell: renderRating,
        type: 'number',
    }
];

const AvailableMastersSelector = () => {
    const {values} = useFormikContext();
    const masters = useSelector(getAvailableMastersSelector);

    const onMasterSelect = (e) => {
        values.masterId = e.row.id;
    }

    return (
        <>
            {masters.length < 1 ?
                <Typography>No masters available</Typography> :
                <DataGrid
                    rows={masters}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowClick={onMasterSelect}
                />
            }
        </>
    )
}

export default AvailableMastersSelector;