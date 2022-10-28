import React from "react";
import Rating from "@mui/material/Rating";
import {useFormikContext} from "formik";
import {useTranslation} from "react-i18next";
import {getAllMasters} from "../../../../store/getters/masters";
import ServerPaginationGrid from "../../../DataTables/ServerPaginationGrid";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const AvailableMastersListener = () => {
    const {t} = useTranslation();

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

    const onMasterSelect = (e) => {
        values.masterId = e.row.id;
    }

    return (
        <>
            <ServerPaginationGrid
                columns={columns}
                getRowsAction={(params) => getAllMasters({newOrder: values, ...params})}
                onRowClick={onMasterSelect}
            />
        </>
    )
}

export default AvailableMastersListener;