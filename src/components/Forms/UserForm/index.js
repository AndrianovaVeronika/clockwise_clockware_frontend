import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Box, Paper, TextField} from "@mui/material";
import {ErrorMessage, Form, Formik, Field} from "formik";
import React from "react";
import useStyles from "../../../styles/useStyles";

const initialValues = {
    username: '',
    email: '',
    password: ''
};

const UserForm = ({submitAction, specifiedInitialValues}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short'),
        email: Yup.string().email('email is not valid').required('Required')
    })

    const onSubmit = async (values, props) => {
        dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues.id, ...values} : values));
    }

    return (
        <Box>
            <Paper elevation={0} className={classes.formPaper}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='user-form'>
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
            </Paper>
        </Box>
    )
}

export default UserForm;