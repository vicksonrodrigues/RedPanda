import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { setNotification } from '../../features/notification/notificationSlice';
import { useAddNewReservationMutation } from '../../features/reservation/reservationApiSlice';

const ReservationForm = ({ customerDetails }) => {
  const [addReservation, { isLoading, isSuccess }] = useAddNewReservationMutation();

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
      .max(35, 'Maximum of 35 characters')
      .required('First Name is Required'),
    lastName: yup
      .string()
      .max(35, 'Maximum of 35 characters')
      .min(2, 'Must be 2 characters or more'),
    phone: yup
      .string()
      .min(10, 'Must contain 10 digits')

      .required('Phone No. is Required')
      .matches(/^[6-9]\d{9}$/, { message: 'Please enter valid number.' }),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    date: yup.date(),
    guests: yup
      .number()
      .max(8, 'Max no. of guests allowed is 8')
      .required('No. of guests is required'),
    specialRequest: yup.string().max(200, 'Maximum of 200 characters'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      date: dayjs().format('YYYY-MM-DD'),
      time: '10:00',
      guests: 1,
      specialRequest: '',
    },
    validationSchema,
    onSubmit: async (values, action) => {
      if (!isLoading) {
        const reserveTime = dayjs(`${values.date} ${values.time}`).toISOString();

        const newReservation = {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          reserveTimestamp: reserveTime,
          guests: values.guests,
          specialRequest: values.specialRequest,
          customerId: customerDetails?.id,
        };
        try {
          await addReservation(newReservation);
          action.resetForm();
        } catch (err) {
          notify(`${err.data?.error}`);
        }
      }
    },
  });
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (customerDetails) {
      formik.setFieldValue('firstName', customerDetails.firstName);
      formik.setFieldValue('lastName', customerDetails.lastName);
      formik.setFieldValue('phone', customerDetails.phone);
      formik.setFieldValue('email', customerDetails.email);
    }
  }, [customerDetails, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      notify('Thank you for registering with us');
      // handle multiple notify
    }
  }, [isSuccess]);

  return (
    <Box
      p={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '25px',
      }}
      variant="outlined"
      display="flex"
      flexDirection="column"
    >
      <Box p={1} mb={4} bgcolor="secondary.light" borderRadius={12}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ width: '100%', fontWeight: 'medium', p: 1, color: 'white' }}
        >
          Reserve Table
        </Typography>
      </Box>

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
                  width: { xs: '100%', md: '50%' },
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
                  width: { xs: '100%', md: '50%' },
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
            {customerDetails ? (
              <Typography color="background.paper" p={2} bgcolor="text.disabled" mb={3}>
                {customerDetails?.email}
              </Typography>
            ) : (
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
            )}
          </Grid>
          <Grid item width="100%">
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <TextField
                required
                id="date"
                name="date"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date ? formik.errors.date : ' '}
                label="Date"
                inputProps={{
                  min: `${dayjs().format('YYYY-MM-DD')}`,
                  max: `${dayjs().add(1, 'year').format('YYYY-MM-DD').toString()}`,
                  required: true,
                }}
                variant="filled"
                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                InputLabelProps={{ style: { color: 'black' } }}
                sx={{
                  width: { xs: '100%', md: '50%' },
                  mr: { xs: '0px', md: '8px' },
                  color: 'black',
                  input: { backgroundColor: 'white', color: 'black' },
                }}
              />

              <TextField
                required
                id="time"
                name="time"
                type="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.time && Boolean(formik.errors.time)}
                helperText={formik.touched.time && formik.errors.time ? formik.errors.time : ' '}
                label="Time"
                inputProps={{
                  step: 900, // 15 min
                  min: `${dayjs().format('YYYY-MM-DD')}`,
                  max: `${dayjs().add(1, 'year').format('YYYY-MM-DD').toString()}`,
                }}
                variant="filled"
                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                InputLabelProps={{ style: { color: 'black' } }}
                sx={{
                  width: { xs: '100%', md: '50%' },
                  color: 'black',
                  input: { backgroundColor: 'white', color: 'black' },
                }}
              />
            </Box>
          </Grid>
          <Grid item width="100%">
            <TextField
              required
              id="guests"
              name="guests"
              type="number"
              value={formik.values.guests}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.guests && Boolean(formik.errors.guests)}
              helperText={
                formik.touched.guests && formik.errors.guests ? formik.errors.guests : ' '
              }
              label="Guests"
              fullWidth
              inputProps={{
                min: 1,
                max: 8,
              }}
              variant="filled"
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
              placeholder="any special need or requirement"
              multiline
              id="specialRequest"
              name="specialRequest"
              type="text"
              value={formik.values.specialRequest}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.specialRequest && Boolean(formik.errors.specialRequest)}
              helperText={
                formik.touched.specialRequest && formik.errors.specialRequest
                  ? formik.errors.specialRequest
                  : ' '
              }
              label="Special Request"
              fullWidth
              minRows={2}
              variant="filled"
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                color: 'black',
                '& .MuiFilledInput-root': {
                  background: 'white',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                },
              }}
            />
          </Grid>
          <Grid item display="flex" pt={3} justifyContent="center" alignItems="center" width="100%">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ bgcolor: 'secondary.light' }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ReservationForm;
