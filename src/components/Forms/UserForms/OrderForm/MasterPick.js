import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getAvailableMastersSelector} from "../../../../store/selectors/mastersSelector";
import Rating from "@mui/material/Rating";
import {Box, Typography} from "@mui/material";
import {DataGrid, ukUA} from "@mui/x-data-grid";
import {isNumber} from "lodash";
import useStyles from "../../../../styles/useStyles";
import {Form, Formik} from "formik";
import {useTranslation} from "react-i18next";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
}

const MasterPick = ({values, formId, submitAction}) => {
    const {t, i18n} = useTranslation();

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

    const masters = useSelector(getAvailableMastersSelector);
    const classes = useStyles();

    const onMasterSelect = (e) => {
        setMasterId(e.row.id);
    }

    const handleSubmit = () => {
        if (isNumber(masterId) && masters.filter(row => row.id === masterId).length > 0) {
            submitAction({masterId: masterId});
        }
    }

    return (
        <>
            {masters.length < 1 ? <Typography>No masters available</Typography> :
                <Formik initialValues={{masterId: values.masterId || ''}} onSubmit={handleSubmit}>
                    {(props) => (
                        <Form id={formId}>
                            <Box className={classes.masterPick}>
                                <DataGrid
                                    rows={masters}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    onRowClick={onMasterSelect}
                                    localeText={i18n.language === 'ua' ? ukUA.components.MuiDataGrid.defaultProps.localeText : undefined}
                                />
                            </Box>
                        </Form>
                    )}
                </Formik>
            }
        </>
    );
};

export default MasterPick;