import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import Rating from "@mui/material/Rating";
import {getOrdersSelector} from "../../../store/selectors/ordersSelector";
import {TextField, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {Field, Form, Formik} from "formik";

function renderRating(params) {
    return <Rating readOnly value={params.value}/>;
};

const initialValues = {
    masterId: 1
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

const MasterPick = ({values, formId, submitAction, hours}) => {
    const [masterId, setMasterId] = useState(initialValues.masterId);

    const masters = useSelector(getMastersSelector).filter(master => {
        for (const city of master.cities) {
            if (city.id === values.cityId) {
                return master;
            }
        }
    });
    
    const orders = useSelector(getOrdersSelector);

    //returns repairing time for clock type
    const getRepairingHours = (type) => {
        switch (type) {
            case 'small': return 1;
            case 'average': return 2;
            case 'big': return 3;
            default: return 0;
        }
    }

    const getAvailableMasters = () => {
        for (const order of orders) {
            if (values.cityId !== order.cityId
                || values.date !== order.date){
                continue;
            }

            //get array of reserved hours on this day
            const unavailableHours = [];
            const repairingHours = getRepairingHours(order.clock_type.name);
            let numOfReservedHours = repairingHours;
            for (const hour of hours) {
                if (hour === order.time || numOfReservedHours !== repairingHours){
                    unavailableHours.push(hour);
                    numOfReservedHours--;
                    if (numOfReservedHours === 0) break;
                }
            }

            //if chosed time is unavailable delete master from the list
            if (unavailableHours.includes(values.time)) {
                for (let i = 0; i < masters.length; i++) {
                    if (masters[i].id === order.masterId) {
                        masters.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }

        return masters;
    };

    const rows = getAvailableMasters();

    const onMasterSelect = (e) => {
        setMasterId(e.row.id);
    }

    return (
        <>
            {rows.length < 1 ? <Typography>No masters available</Typography> :
                <>
                    <div style={{height: '250px', width: '350px'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowDoubleClick={onMasterSelect}
                        />
                    </div>
                    <Formik initialValues={initialValues} onSubmit={submitAction}>
                        {
                            (props) => (
                                <Form id={formId}>
                                    <Field as={TextField}
                                           label='Мастер по номером'
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