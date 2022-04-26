import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import Rating from "@mui/material/Rating";
import {getOrdersSelector} from "../../../store/selectors/ordersSelector";
import {TextField, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {Field, Form, Formik} from "formik";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";

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
    const [masterId, setMasterId] = useState('');

    const masters = useSelector(getMastersSelector).filter(master => {
        for (const city of master.cities) {
            if (city.id === values.cityId) {
                return master;
            }
        }
    });

    const orders = useSelector(getOrdersSelector);

    const cityName = useSelector(getCitiesSelector).filter(city => city.id === values.cityId)[0].name;

    //returns repairing time for clock type
    const getRepairingHours = (type) => {
        switch (type) {
            case 'small':
                return 1;
            case 'average':
                return 2;
            case 'big':
                return 3;
            default:
                return 0;
        }
    }

    //check if new order interogates with existing one
    const ifOrdersInterogates = (newOrderStartTime, newOrderRepairingTime, existingOrderStartTime, existingOrderRepairingTime) => {
        const existingOrderStartTimeInNum = parseInt(existingOrderStartTime.split(':')[0]);
        const newOrderStartTimeInNum = parseInt(newOrderStartTime.split(':')[0]);
        console.log(newOrderStartTimeInNum + '?=' + existingOrderStartTimeInNum)
        console.log('+' + newOrderRepairingTime + ' / ' + '+' + existingOrderRepairingTime)
        if (newOrderStartTimeInNum < existingOrderStartTimeInNum) {
            console.log(newOrderStartTimeInNum + '<' + existingOrderStartTimeInNum)
            if ((newOrderStartTimeInNum + newOrderRepairingTime) < existingOrderStartTimeInNum) {
                console.log((newOrderStartTimeInNum + newOrderRepairingTime) + '<' + existingOrderStartTimeInNum)
                console.log('good, not interogates')
                return false;
            }
            console.log((newOrderStartTimeInNum + newOrderRepairingTime) +'!<'+ existingOrderStartTimeInNum)
        } else {
            console.log(newOrderStartTimeInNum + '>' + existingOrderStartTimeInNum)
            if (existingOrderStartTimeInNum + existingOrderRepairingTime < newOrderStartTimeInNum) {
                console.log(newOrderStartTimeInNum + '>' + (existingOrderStartTimeInNum + existingOrderRepairingTime))
                console.log('good, not interogates')
                return false;
            }
            console.log(existingOrderStartTimeInNum + existingOrderRepairingTime +'!<'+ newOrderStartTimeInNum)
        }
        return true;
    }

    const getAvailableMasters = () => {
        console.log('ORDERS')
        console.log(orders)
        const busyMasters = [];
        for (const order of orders) {
            if (cityName !== order.city
                || values.date !== order.date) {
                console.log(cityName + '?=' + order.city)
                console.log(values.date + '?=' + order.date)
                console.log('skipping...')
                continue;
            }

            //if chosed time interogates with existing order time add master to busy masters list
            if (ifOrdersInterogates(values.time, values.clockTypeId, order.time, getRepairingHours(order.clockType))) {
                busyMasters.push(order.master);
            }
        }

        const resultingMasters = masters.filter(({name}) => !busyMasters.includes(name));
        console.log('Available masters: ')
        console.log(resultingMasters)
        return resultingMasters;
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
                            onRowClick={onMasterSelect}
                        />
                    </div>
                    <Formik initialValues={initialValues} onSubmit={() => submitAction({masterId: masterId})}>
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