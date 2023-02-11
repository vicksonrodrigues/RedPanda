import { Box, Button, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useAddNewCustomerMutation } from '../../features/customer/customerApiSlice';
import { setNotification } from '../../features/notification/notificationSlice';
import useField from '../../hooks/useField';

const SignupForm = ({ setForm }) => {
  const [newCustomer, { isLoading, isSuccess, isError, error }] = useAddNewCustomerMutation();

  const firstName = useField('text');
  const lastName = useField('text');
  const phone = useField('tel');
  const email = useField('email');
  const password = useField('password');
  // const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoading) {
      await newCustomer({
        firstName: firstName.fields.value,
        lastName: lastName.fields.value,
        phone: phone.fields.value,
        email: email.fields.value,
        password: password.fields.value,
      });
    }
  };

  const handleReset = () => {
    firstName.reset();
    lastName.reset();
    phone.reset();
    email.reset();
    password.reset();
    notify('Fields have been Reset', 'info');
  };

  useEffect(() => {
    if (isSuccess) {
      handleReset();
      notify('Sign up Successful', 'success');
      setForm('Login');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      handleReset();
      notify(`${error?.data?.message}`, 'error');
    }
  }, [isError]);

  return (
    <Box>
      <Typography
        textAlign="center"
        variant="h2"
        sx={{ width: '100%', fontWeight: 'medium', p: 6, color: 'white' }}
      >
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <Box>
            <Typography mb={1} mt={1} variant="subtitle2" color="white">
              Name
            </Typography>
            <Box display="flex">
              <OutlinedInput
                placeholder="First Name"
                type={firstName.fields.type}
                value={firstName.fields.value}
                onChange={firstName.fields.onChange}
                sx={{ width: '300px', mr: 1, backgroundColor: 'white', color: 'black' }}
              />
              <OutlinedInput
                placeholder="Last Name"
                type={lastName.fields.type}
                value={lastName.fields.value}
                onChange={lastName.fields.onChange}
                sx={{ width: '300px', ml: 1, backgroundColor: 'white', color: 'black' }}
              />
            </Box>
          </Box>
          <Box>
            <Typography mb={1} mt={1} variant="subtitle2" color="white">
              Phone
            </Typography>
            <OutlinedInput
              placeholder="Phone Number"
              fullWidth
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
              type={phone.fields.type}
              value={phone.fields.value}
              onChange={phone.fields.onChange}
            />
          </Box>
          <Box>
            <Typography mb={1} mt={1} variant="subtitle2" color="white">
              Email
            </Typography>
            <OutlinedInput
              placeholder="Email"
              fullWidth
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
              type={email.fields.type}
              value={email.fields.value}
              onChange={email.fields.onChange}
            />
          </Box>
          <Box>
            <Typography mb={1} mt={1} variant="subtitle2" color="white">
              Password
            </Typography>
            <OutlinedInput
              placeholder="Password"
              fullWidth
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
              type={password.fields.type}
              value={password.fields.value}
              onChange={password.fields.onChange}
            />
          </Box>
          <Box display="flex" justifyContent="center" py={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ bgcolor: 'secondary.light' }}
            >
              <Typography variant="button" color="black">
                Submit
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ bgcolor: 'secondary.light', mx: 1 }}
              onClick={handleReset}
            >
              <Typography variant="button" color="black">
                Reset
              </Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SignupForm;
