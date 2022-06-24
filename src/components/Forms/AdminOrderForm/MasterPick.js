import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAvailableMastersSelector} from "../../../store/selectors/mastersSelector";
import Rating from "@mui/material/Rating";
import {TextField, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {Field, Form, Formik} from "formik";
import {isNumber} from "lodash";

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
    }
];

const initialValues = {
    masterId: ''
}

const MasterPick = ({values, formId, submitAction}) => {
    const [masterId, setMasterId] = useState(values.masterId);

    const masters = useSelector(getAvailableMastersSelector);

    const onMasterSelect = (e) => {
        setMasterId(e.row.id);
    }

    const validatedSubmit = () => {
        if (isNumber(masterId) && masters.filter(row => row.id === masterId).length > 0) {
            submitAction({masterId: masterId});
        }
    }

    return (
        <>
            {masters.length < 1 ? <Typography>No masters available</Typography> :
                <>
                    <div style={{height: '250px', width: '350px'}}>
                        <DataGrid
                            rows={masters}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={onMasterSelect}
                        />
                    </div>
                    <Formik initialValues={isNumber(values.masterId) ? {masterId: 21} : initialValues}
                            onSubmit={validatedSubmit}>
                        {
                            (props) => (
                                <Form id={formId}>
                                    <Field as={TextField}
                                           label='Master ID'
                                           name='masterId'
                                           value={masterId}
                                           fullWidth
                                           disabled
                                           required
                                    />
                                </Form>
                            )
                        }
                    </Formik>
                </>
            }
        </>
    );
};

export default MasterPick;