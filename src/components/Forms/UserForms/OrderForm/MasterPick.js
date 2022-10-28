import React, {useState} from "react";
import Rating from "@mui/material/Rating";
import {Box} from "@mui/material";
import {isNumber} from "lodash";
import useStyles from "../../../../styles/useStyles";
import {Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {getAvailableMasters} from "../../../../store/getters/masters";
import ServerPaginationGrid from "../../../DataTables/ServerPaginationGrid";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const MasterPick = ({values, formId, submitAction}) => {
    const {t} = useTranslation();
    const classes = useStyles();

    const columns = [
        {
            field: 'name',
            headerName: t("forms.labels.name"),
            width: 100
        },
        {
            field: 'rating',
            headerName: t("forms.labels.rating"),
            width: 150,
            renderCell: renderRating,
            type: 'number',
        }
    ];

    const [masterId, setMasterId] = useState(values.masterId || '');
    const onMasterSelect = (e) => {
        setMasterId(e.row.id);
    }

    const onSubmit = () => {
        if (isNumber(masterId)) {
            submitAction({masterId: masterId});
        }
    }

    return (
        <>
            <Formik initialValues={{masterId: values.masterId || ''}} onSubmit={onSubmit}>
                {(props) => (
                    <Form id={formId}>
                        <Box className={classes.masterPick}>
                            <ServerPaginationGrid
                                getRowsAction={(props) =>
                                    getAvailableMasters({newOrder: values, filters: props})}
                                columns={columns}
                                onRowClick={onMasterSelect}
                            />
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default MasterPick;