import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {signUp} from "../../../store/actions/auth";
import {Box, Button, Paper, TextField} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import useStyles from "../styles";

const initialValues = {
    username: '',
    email: '',
    password: ''
};

const SignUpForm = ({signup = false}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const styles = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
        email: Yup.string().email('email is not valid')
    })

    const onSubmit = async (values, props) => {
        await dispatch(signUp(values));
        navigate('/login');
    }

    return (
        <Box>
            <Paper elevation={signup? 3 : 0} className={signup ? styles.authFormPaper : styles.formPaper}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='signup-form'>
                                <Field as={TextField}
                                       label='Username'
                                       name='username'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='username'/>}
                                       required
                                       className={styles.formItem}
                                />
                                <Field as={TextField}
                                       label='Почта'
                                       name='email'
                                       error={props.errors.email && props.touched.email}
                                       helperText={<ErrorMessage name='email'/>}
                                       required
                                       fullWidth
                                       className={styles.formItem}
                                />
                                <Field as={TextField}
                                       label='Password'
                                       name='password'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='password'/>}
                                       required
                                       type="password"
                                       className={styles.formItem}
                                />
                            </Form>
                        )
                    }
                </Formik>
                {signup && <div className={styles.authFormButtons}>
                    <Button onClick={() => navigate('/')}>Отмена</Button>
                    <Button
                        type='submit'
                        form='signup-form'
                    >Отправить</Button>
                </div>}
            </Paper>
        </Box>
    )
}

export default SignUpForm;