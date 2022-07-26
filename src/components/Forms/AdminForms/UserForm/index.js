import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Alert, AlertTitle, Box, Paper} from "@mui/material";
import {Form, Formik} from "formik";
import React, {useState} from "react";
import useStyles from "../../../../styles/useStyles";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";

const UserForm = ({submitAction, specifiedInitialValues, formId, setDataTableAlert, clearDataTableSelectedRow}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short'),
        email: Yup.string().email('email is not valid').required('Required')
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {
            error,
            payload
        } = await dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues.id, ...values} : values));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
            if (clearDataTableSelectedRow) {
                clearDataTableSelectedRow();
            }
            setDataTableAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {'Row has been added/updated successfully.'}
                </Alert>
            );
        }
    }

    const initialValues = specifiedInitialValues || {
        username: '',
        email: '',
        password: ''
    };

    return (
        <Box>
            <Paper elevation={0} className={classes.formPaper}>
                <Formik initialValues={initialValues} validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id={formId}>
                                <FormikTextField
                                    label='Username'
                                    name='username'
                                    error={props.errors.name && props.touched.name}
                                    required
                                />
                                <FormikTextField
                                    label='Email'
                                    name='email'
                                    error={props.errors.email && props.touched.email}
                                    required
                                />
                                <FormikPasswordField
                                    label='Password'
                                    name='password'
                                    error={props.errors.name && props.touched.name}
                                />
                            </Form>
                        )
                    }
                </Formik>
                {Error}
            </Paper>
        </Box>
    )
}

export default UserForm;