import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAddNewCustomerMutation } from '../../features/customer/customerApiSlice';
import { setNotification } from '../../features/notification/notificationSlice';

const SignupForm = ({ setForm }) => {
  const [newCustomer, { isLoading, isSuccess, isError, error }] = useAddNewCustomerMutation();

  const dispatch = useDispatch();

  const notify = (notificationMessage, notificationType, notificationOpen = true) => {
    dispatch(
      setNotification({
        notificationOpen,
        notificationType,
        notificationMessage,
      }),
    );
  };

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(2, 'Must be 2 characters or more')
      .required('First Name is Required'),
    lastName: yup.string().min(2, 'Must be 2 characters or more'),
    phone: yup
      .string()
      .min(10, 'Must contain 10 digits')
      .required('Phone No. is Required')
      .matches(/^[6-9]\d{9}$/, { message: 'Please enter valid number.' }),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
    },
    initialErrors: {
      lastName: ' ',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isLoading) {
        await newCustomer({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          password: values.password,
        });
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.handleReset();
      notify('Sign up successful! Welcome aboard!', 'success');
      setForm('Login');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      formik.handleReset();
      notify(`${error?.data?.error}`, 'error');
    }
  }, [isError]);

  return (
    <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
      <Typography
        textAlign="center"
        variant="h3"
        sx={{ fontWeight: 'medium', pt: 4, color: 'white' }}
      >
        Sign Up
      </Typography>
      <Typography
        textAlign="center"
        variant="subtitle1"
        sx={{ width: '100%', fontWeight: 'medium', color: 'secondary.light', pt: 2, pb: 4 }}
      >
        Create an account
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container px={2} spacing={0.5} width="100%">
          <Grid item width={1}>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <TextField
                required
                id="firstName"
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : ' '
                }
                variant="filled"
                label="First Name"
                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                InputLabelProps={{ style: { color: 'black' } }}
                sx={{
                  width: { xs: '100%', md: 'auto' },
                  mr: { xs: '0px', md: '8px' },
                  color: 'black',
                  input: { backgroundColor: 'white', color: 'black' },
                }}
              />
              <TextField
                id="lastName"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={
                  formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ' '
                }
                variant="filled"
                label="Last Name"
                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                InputLabelProps={{ style: { color: 'black' } }}
                sx={{
                  width: { xs: '100%', md: 'auto' },
                  color: 'black',
                  input: { backgroundColor: 'white', color: 'black' },
                }}
              />
            </Box>
          </Grid>
          <Grid item width="100%">
            <TextField
              required
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ' '}
              variant="filled"
              label="Phone Number"
              fullWidth
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                color: 'black',
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Grid>
          <Grid item width="100%">
            <TextField
              required
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ' '}
              label="Email"
              variant="filled"
              fullWidth
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                color: 'black',
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Grid>
          <Grid item width="100%">
            <TextField
              required
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && formik.errors.password ? formik.errors.password : ' '
              }
              variant="filled"
              label="Password"
              fullWidth
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                color: 'black',
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Grid>
          <Grid item display="flex" pt={3} width="100%">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ bgcolor: 'secondary.light', mr: '8px' }}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              onClick={formik.handleReset}
              sx={{ color: 'text.primary', borderColor: 'text.primary' }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SignupForm;
