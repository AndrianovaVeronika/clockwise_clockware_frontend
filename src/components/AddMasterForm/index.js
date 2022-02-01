import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {TextField, Paper, Button, Typography, Rating, Grid, Divider} from "@mui/material";
import * as Yup from 'yup';
import store from "../../store/store";
import {addMaster} from "../../store/actions";
import './style.css';

const initialValues = {
    name: '',
    rating: 0,
}

const AddMasterForm = () => {
    const paperStyle = {padding: '10px 10px', width: '90%', margin: '10px auto'}

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const onSubmit = (values, props) => {
        console.log(values);
        store.dispatch(addMaster(values));
        props.resetForm();
    }

    return (
        <Paper elevation={0} style={paperStyle}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form className='masterForm' id='add-master-form'>
                            <Field as={TextField}
                                   label='Name'
                                   name='name'
                                   fullWidth
                                   error={props.errors.name && props.touched.name}
                                   helperText={<ErrorMessage name='name'/>}
                                   required
                            />
                            <div>
                                <Typography component="legend">Rating</Typography>
                                <Rating
                                    name="rating"
                                    value={props.values.rating}
                                    onChange={({target}) => props.setFieldValue('rating', parseInt(target.value))}
                                />
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </Paper>
    );
}

export default AddMasterForm;