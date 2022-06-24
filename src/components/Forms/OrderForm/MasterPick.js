import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getAvailableMastersSelector} from "../../../store/selectors/mastersSelector";
import Rating from "@mui/material/Rating";
import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {isNumber} from "lodash";
import useStyles from "../../../styles/useStyles";
import {Formik, Form} from "formik";

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

const MasterPick = ({values, formId, submitAction}) => {
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