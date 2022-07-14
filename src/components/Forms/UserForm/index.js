import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Alert, AlertTitle, Box, Paper, TextField} from "@mui/material";
import {ErrorMessage, Form, Formik, Field} from "formik";
import React, {useState} from "react";
import useStyles from "../../../styles/useStyles";

const UserForm = ({submitAction, specifiedInitialValues, formId, setDataTableAlert}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short'),
        email: Yup.string().email('email is not valid').required('Required')
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues.id, ...values} : values));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
            setDataTableAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {'Row has been added/updated successfully.'}
                </Alert>
            );
        }
    }

    const initialValues = {
        username: specifiedInitialValues?.username || '',
        email: specifiedInitialValues?.email || '',
        password: specifiedInitialValues?.password || ''
    };

    return (
        <Box>
            <Paper elevation={0} className={classes.formPaper}>
                <Formik initialValues={initialValues} validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id={formId}>
                                <Field as={TextField}
                                    label='Username'
                                    name='username'
                                    className={classes.formItem}
                                    fullWidth
                                    error={props.errors.name && props.touched.name}
                                    helperText={<ErrorMessage name='username'/>}
                                    required
                                />
                                <Field as={TextField}
                                    label='Mail'
                                    name='email'
                                    className={classes.formItem}
                                    error={props.errors.email && props.touched.email}
                                    helperText={<ErrorMessage name='email'/>}
                                    required
                                    fullWidth
                                />
                                <Field as={TextField}
                                    label='Password'
                                    name='password'
                                    className={classes.formItem}
                                    fullWidth
                                    error={props.errors.name && props.touched.name}
                                    helperText={<ErrorMessage name='password'/>}
                                    type="password"
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