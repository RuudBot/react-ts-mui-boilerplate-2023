import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, TextField, Button } from '@mui/material';

type State = {
    email: string;
    password: string;
};

const initialValues: State = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
});

const LoginForm = () => {
    const onSubmit = () => {

    };

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
    >
        {(formik)=>{
            return (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Login</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="email"
                                as={TextField}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                helperText={<ErrorMessage name="email" />}
                                error={!!(ErrorMessage as any).errors?.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="password"
                                type="password"
                                as={TextField}
                                label="Password"
                                variant="outlined"
                                fullWidth
                                helperText={<ErrorMessage name="password" />}
                                error={!!(ErrorMessage as any).errors?.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth disabled={false}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )
        }}
    </Formik>
);
}

export default LoginForm;