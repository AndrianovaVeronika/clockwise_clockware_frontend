import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Alert, AlertTitle, Box} from "@mui/material";
import {Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import useStyles from "../../../../styles/useStyles";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import cities from "../../../../store/actions/cities";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {registerMasterAccount} from "../../../../store/actions/auth";
import UserCreatedDialog from "../../../Dialogs/UserCreatedDialog";

const initialValues = {
    name: "",
    email: "",
    password: "",
    cities: []
};

const MasterSignUpForm = ({setError}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
    });

    const [citiesChosen, setCitiesChosen] = useState(initialValues?.cities);

    const handleChange = (event) => {
        const {target: {value}} = event;
        setCitiesChosen(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const incomeCities = useSelector(getCitiesSelector);

    const getCityOptions = () => {
        const cities = [];
        for (const city of incomeCities) {
            cities.push({key: city.name, value: city.name});
        }
        return cities;
    }

    const cityOptions = getCityOptions();

    useEffect(() => {
        dispatch(cities.getAll());
    }, [dispatch])

    const [displaySuccessDialog, setDisplaySuccessfulDialog] = useState(false);

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(registerMasterAccount({...values, cities: citiesChosen}));
        if (error) {
            setError(
                <Alert severity="error" key={payload?.message || error.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload?.message || error.message}
                </Alert>
            );
        } else {
            setError(<></>);
            setDisplaySuccessfulDialog(true);
        }
    };

    return (
        <>
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form id='signup-form' className={classes.twoColumnForm}>
                            <Box className={classes.formSection}>
                                <FormikTextField
                                    label='Name'
                                    name='name'
                                    error={props.errors.name && props.touched.name}
                                    required
                                />
                                <FormikTextField
                                    label='Email'
                                    name='email'
                                    error={props.errors.email && props.touched.email}
                                    required
                                />
                            </Box>
                            <Box className={classes.formSection}>
                                <FormikPasswordField
                                    label='Password'
                                    name='password'
                                    error={props.errors.password && props.touched.password}
                                    required
                                />
                                <FormikSelectField
                                    label='Cities'
                                    name='cities'
                                    options={cityOptions}
                                    value={citiesChosen}
                                    onChange={handleChange}
                                    multiple
                                    fullWidth
                                    className={classes.formItem}
                                />
                            </Box>
                        </Form>
                    )
                }
            </Formik>
            {displaySuccessDialog && <UserCreatedDialog
                display={displaySuccessDialog}
                onClose={() => setDisplaySuccessfulDialog(false)}
            />}
        </>
    )
}

export default MasterSignUpForm;