import React from "react";
import {getAvailableMastersSelector} from "../../../../store/selectors/mastersSelector";
import {DataGrid, ukUA} from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import {useFormikContext} from "formik";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const AvailableMastersListener = () => {
    const {t, i18n} = useTranslation();

    const columns = [
        {
            field: 'name', headerName: t("forms.labels.name"), width: 100
        },
        {
            field: 'rating',
            headerName: t("forms.labels.rating"),
            width: 150,
            renderCell: renderRating,
            type: 'number',
        }
    ];

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
                    localeText={i18n.language === 'ua' ? ukUA.components.MuiDataGrid.defaultProps.localeText : undefined}
                />
            }
        </>
    )
}

export default AvailableMastersListener;